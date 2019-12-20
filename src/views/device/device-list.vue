<template>
  <div class="device-list">
    <!-- 设备列表 -->
    <van-nav-bar
      class="flex-none"
      style="border-bottom:1px solid #EBEDFF"
      :title="group"
      left-text="返回"
      left-arrow
      :border="false"
      @click-left="$router.back()" />
    <div>
      <div
        class="device-item"
        v-for="item in deviceList"
        :key="item.deviceid">
        <!-- 列表项头部 -->
        <div class="device-item-header flex jcb mb10">
          <div class="header-title f16 b c32">{{item.name}}</div>
          <div class="flex aic header-icon" v-if="authType!=='2'">
            <van-icon class="mr10" name="wap-nav"
              @click="$router.push(`/device-edit?deviceid=${item.deviceid}&deviceName=${item.name}&loc=${item.deviceLocation}&group=${item.deviceGroup}`)" />
            <van-icon name="delete"
              @click="deleteDevice(item.deviceid)" />
          </div>
        </div>
        <div class="rel pt10">
          <!-- 控制按钮 -->
          <div class="flex jca mb15">
            <div
              class="btn-item flex-col aic"
              v-for="btn in controls"
              :key="btn.name">
              <div class="btn flex aic jcc mb5"
                :style="`background:${getBtnBackground(btn, item)}`">
                <img :src="btn.icon" @click="onBtnClick(item, btn)" />
              </div>
              <span class="c32 b">{{btn.name}}</span>
            </div>
          </div>
          <!-- 温湿控制 -->
          <div v-if="item.ui === '恒温恒湿改装件'">
            <!-- 当前状态 -->
            <div class="ctrl-item">
              <p class="c32 b f14 sub-title">当前状态</p>
              <div class=" flex jcc cf2">
                <div class="current-state warm mr20">
                  <p class="f24">{{parseInt(item.temperature)}}°</p>
                  <p>当前温度</p>
                </div>
                <div class="current-state cold">
                  <p class="f24">{{parseInt(item.humidity)}}%</p>
                  <p>当前湿度</p>
                </div>
              </div>
            </div>
            <div class="ctrl-item">
              <p class="c32 b f14 sub-title" :class="{active:item.targetIndex==='temperature'}">自定义温度</p>
              <p class="c7c ml26">推荐温度为：36度。</p>
              <div class="cf2 slider-bar flex-col jcc">
                <van-slider
                  class="temp-slider"
                  v-model="item.targetTemperature"
                  active-color="#ee0a24"
                  :min="-20"
                  :max="180"
                  @change="(value)=>onSlideChange(item,value,'temperature')">
                  <div
                    slot="button"
                    class="slider-button temp-button">
                    {{ item.targetTemperature }}°
                  </div>
                </van-slider>
              </div>
            </div>
            <div class="ctrl-item">
              <p class="c32 b f14 sub-title" :class="{active:item.targetIndex==='humidity'}">自定义湿度</p>
              <div class=" cf2 slider-bar flex-col jcc">
                <van-slider
                  class="humidity-slider"
                  v-model="item.targetHumidity"
                  active-color="#ee0a24"
                  @change="(value)=>onSlideChange(item,value,'humidity')">
                  <div
                    slot="button"
                    class="slider-button humidity-button">
                    {{ item.targetHumidity }}%
                  </div>
                </van-slider>
              </div>
            </div>
          </div>
          <!-- 离线遮罩 -->
          <div class="overlay flex aic jcc f24 b wh"
            v-show="!item.online">
            离线
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { Toast, Dialog } from 'vant';
import { deleteOne, webSocketAp, getOneByDeviceid, deviceList } from '@/api';

const controls = [
  {
    name: '开启',
    icon: require('@/assets/images/switch.png'),
    background:
      'linear-gradient(132deg,rgba(207,255,209,1) 0%,rgba(24,185,13,1) 100%);',
    params: {
      switch: 'on',
    },
  },
  {
    name: '关闭',
    icon: require('@/assets/images/switch.png'),
    background:
      'linear-gradient(136deg,rgba(255,199,174,1) 0%,rgba(255,97,28,1) 100%);',
    params: {
      switch: 'off',
    },
  },
  // {
  //   name: '锁定',
  //   icon: '',
  // },
  // {
  //   name: '暂停',
  //   icon: '',
  // },
];
export default {
  data() {
    return {
      controls,
      linking: false,
      group: '',
      deviceList: [],
      temperature: 36,
      humidity: 50,
      authType: '',
    };
  },
  computed: {
    getBtnBackground(btn, item) {
      return (btn, item) => {
        if (btn.name === '开启') {
          return item.switchStatus === 'on'
            ? btn.background
            : 'linear-gradient(136deg,rgba(255,255,255,1) 0%,gray 100%);';
        }
        return item.switchStatus === 'on'
          ? 'linear-gradient(136deg,rgba(255,255,255,1) 0%,gray 100%);'
          : btn.background;
      };
    },
  },
  async mounted() {
    // 获取分组，位置和授权类型
    await this.getDeviceList();
    // 获取分配服务
    webSocketAp().then(resp => {
      const { apikey, appid, at, device } = resp.result;
      const { domain, port } = device;
      this.wsOptions = {
        domain,
        port,
        at,
        apikey,
        appid,
      };
      this.connectWebsocket(this.wsOptions);
    });
  },
  methods: {
    // 温度控制值变化
    onSlideChange(item, value, deviceType) {
      console.log(item, value);
      if (this.linking) {
        this.ws.send(
          JSON.stringify({
            action: 'update',
            deviceid: item.deviceid,
            apikey: this.apikey, // 用户的apikey
            sequence: +new Date(),
            params: {
              deviceType,
              mainSwitch: 'on',
              targets: [
                {
                  targetHigh: String(value),
                  reaction: {
                    switch: 'off',
                  },
                },
                {
                  targetLow: String(value - 1),
                  reaction: {
                    switch: 'on',
                  },
                },
              ],
            },
            ts: 0,
            from: 'app',
            userAgent: 'app',
          }),
        );
      } else {
        Toast('正在连接设备，请稍候...');
      }
    },

    // 获取设备列表
    async getDeviceList() {
      Toast.loading({
        duration: 0,
        forbidClick: true,
        message: '加载中...',
      });
      const { group, loc, authType } = this.$route.query;
      this.group = group;
      this.authType = authType;
      const resp = await deviceList({
        deviceGroup: group,
        deviceLocation: loc,
        deviceType: authType,
      });
      if (resp.code === '1') {
        this.deviceList = resp.result;
        Toast.clear();
      } else {
        Toast(resp.msg);
      }
    },
    // 删除设备
    deleteDevice(deviceid) {
      // 提示
      Dialog.confirm({
        message: '确定要删除设备吗？',
      }).then(() => {
        Toast.loading({
          loadingType: 'spinner',
          duration: 0,
        });
        deleteOne({
          deviceid,
        }).then(resp => {
          Toast.clear();
          if (resp.code === '1') {
            Toast('删除成功');
            this.$router.push('/');
          } else {
            Toast(resp.msg);
          }
        });
      });
    },
    // 连接ws
    connectWebsocket(options) {
      const { domain, port, at, apikey, appid } = options;
      this.apikey = apikey;
      const ws = new WebSocket(`wss://${domain}:${port}/api/ws`);
      this.ws = ws;
      // 监听连接成功
      ws.onopen = () => {
        console.log('连接服务端WebSocket成功');
        this.linking = true;
        // 握手
        ws.send(
          JSON.stringify({
            action: 'userOnline',
            at,
            apikey,
            appid,
            nonce: 'absfefds',
            ts: Math.round(new Date().getTime() / 1000),
            userAgent: 'app',
            sequence: +new Date(),
            version: 8,
          }),
        );
        // 遍历查询设备状态
        this.deviceList.forEach(dev => {
          getOneByDeviceid({
            deviceid: dev.deviceid,
            deviceType: this.authType,
          }).then(resp => {
            // 获取在线状态
            console.log(resp.result);
            this.$set(dev, 'online', resp.result.online);
          });
          this.getDeviceStatus(dev.deviceid);
        });
      };
      // 监听服务端消息(接收消息)
      ws.onmessage = msg => {
        const message = JSON.parse(msg.data);
        // TODO: 这里用http请求设备当前状态，这样就不会触发onmessage了
        if (message.params === undefined) {
          this.getDeviceStatus(message.deviceid);
        }
        // 监听系统消息
        if (message.action === 'sysmsg') {
          // 说明设备在线离线发生变化
          const { deviceid, params } = message;
          const { online } = params;
          const targetDevice = this.deviceList.filter(
            dev => dev.deviceid === deviceid,
          )[0];
          if (targetDevice) {
            this.$set(targetDevice, 'online', online);
          }
        }
        // 监听状态更新
        if (message.action === 'update') {
          // 说明设备状态更新
          const { deviceid, params } = message;
          // const switchStatus = params.switch === 'on';
          const {
            currentHumidity,
            currentTemperature,
            targets,
            deviceType,
            switch: switchStatus,
          } = params;
          const targetDevice = this.deviceList.filter(
            dev => dev.deviceid === deviceid,
          )[0];
          if (targetDevice) {
            switchStatus &&
              this.$set(targetDevice, 'switchStatus', switchStatus);
            currentTemperature &&
              this.$set(targetDevice, 'temperature', currentTemperature);
            currentHumidity &&
              this.$set(targetDevice, 'humidity', currentHumidity);
            if (targets) {
              const value = targets.filter(item => item.targetHigh)[0];
              this.$set(targetDevice, 'targetIndex', deviceType);
              if (deviceType === 'temperature') {
                value &&
                  this.$set(
                    targetDevice,
                    'targetTemperature',
                    parseInt(value.targetHigh),
                  );
              } else if (deviceType === 'humidity') {
                value &&
                  this.$set(
                    targetDevice,
                    'targetHumidity',
                    parseInt(value.targetHigh),
                  );
              }
            }
          }
        }
        // 初始查询返回
        if (message.params) {
          const { deviceid, params } = message;
          // const switchStatus = params.switch === 'on';
          const {
            currentHumidity,
            currentTemperature,
            targets,
            deviceType,
            switch: switchStatus,
          } = params;
          const targetDevice = this.deviceList.filter(
            dev => dev.deviceid === deviceid,
          )[0];
          if (targetDevice) {
            switchStatus &&
              this.$set(targetDevice, 'switchStatus', switchStatus);
            currentTemperature &&
              this.$set(targetDevice, 'temperature', currentTemperature);
            currentHumidity &&
              this.$set(targetDevice, 'humidity', currentHumidity);
            if (targets) {
              const value = targets.filter(item => item.targetHigh)[0];
              this.$set(targetDevice, 'targetIndex', deviceType);
              if (deviceType === 'temperature') {
                value &&
                  this.$set(
                    targetDevice,
                    'targetTemperature',
                    parseInt(value.targetHigh),
                  );
              } else if (deviceType === 'humidity') {
                value &&
                  this.$set(
                    targetDevice,
                    'targetHumidity',
                    parseInt(value.targetHigh),
                  );
              }
            }
          }
        }
        console.log('收到的消息：', message);
      };
      // 监听连接失败
      ws.onerror = () => {
        console.log('连接失败，正在重连...');
        this.connectWebsocket(this.wsOptions);
      };
      // 监听连接关闭
      ws.onclose = () => {
        console.log('连接关闭');
      };
    },
    onBtnClick(item, btn) {
      // 控制设备，即更新设备状态
      if (this.linking) {
        this.ws.send(
          JSON.stringify({
            action: 'update',
            deviceid: item.deviceid,
            apikey: this.apikey, // 用户的apikey
            sequence: +new Date(),
            params: btn.params,
            ts: 0,
            from: 'app',
            userAgent: 'app',
          }),
        );
      } else {
        Toast('正在连接设备，请稍候...');
      }
    },
    getDeviceStatus(deviceid) {
      if (this.linking) {
        this.ws.send(
          JSON.stringify({
            action: 'query',
            deviceid,
            apikey: this.apikey, // 用户的apikey
            sequence: +new Date(),
            ts: 0,
            from: 'app',
            userAgent: 'app',
          }),
        );
      } else {
        Toast('正在连接设备，请稍候...');
      }
    },
  },
  beforeDestroy() {
    this.ws.close();
  },
};
</script>

<style lang="scss" scoped>
.btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  img {
    width: 18px;
    height: 18px;
  }
}
.header-title {
  padding-left: 6px;
  border-left: 5px solid #ff7731;
}
.device-item {
  margin: 18px 15px;
  background: #fff;
  border-radius: 10px;
  padding: 24px 20px;
}
.header-icon {
  .van-icon {
    font-size: 20px;
    color: rgb(76, 76, 76);
  }
}
.overlay {
  position: absolute;
  bottom: 0;
  top: 0;
  width: 100%;
  margin-bottom: -10px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 6px;
}
.current-state {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &.warm {
    background: linear-gradient(
      321deg,
      rgba(252, 128, 37, 1) 0%,
      rgba(254, 211, 182, 1) 100%
    );
  }
  &.cold {
    background: linear-gradient(
      142deg,
      rgba(137, 170, 254, 1) 0%,
      rgba(40, 98, 249, 1) 100%
    );
  }
}
.sub-title {
  display: flex;
  margin-bottom: 15px;
  margin-left: 10px;
  align-items: center;
  &::before {
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    background: #c0cdef;
    border-radius: 50%;
    margin-right: 10px;
    box-sizing: border-box;
    border: 4px solid #c0cdef;
  }
  &.active::before {
    border: 4px solid #c0cdef;
    background: rgb(45, 96, 238);
  }
}
.ctrl-item {
  padding: 16px 0;
  border-top: 1px solid #ebedff;
}

.temp-slider {
  background: linear-gradient(
    90deg,
    rgba(255, 243, 228, 1) 0%,
    rgba(255, 79, 0, 1) 100%
  );
  margin: 0 28px;
}
.humidity-slider {
  background: linear-gradient(
    90deg,
    rgb(189, 207, 255) 0%,
    rgba(40, 98, 249, 1) 100%
  );
  margin: 0 28px;
}
.slider-bar {
  height: 56px;
  margin-top: 15px;
}
.slider-button {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  box-sizing: border-box;
  color: #f2f2f2;
  font-size: 22px;
  font-weight: 400px;
  line-height: 56px;
  text-align: center;
}
.temp-button {
  background: linear-gradient(
    270deg,
    rgba(255, 176, 130, 1) 0%,
    rgba(252, 233, 208, 1) 100%
  );
}
.humidity-button {
  background: linear-gradient(
    142deg,
    rgba(137, 170, 254, 1) 0%,
    rgba(40, 98, 249, 1) 100%
  );
}
</style>
<style lang="scss">
.device-list {
  .van-slider__bar {
    height: 10px !important;
    background: transparent !important;
  }
}
</style>
