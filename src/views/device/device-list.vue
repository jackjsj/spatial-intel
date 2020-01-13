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
              @click="$router.push(`/device-edit?deviceid=${item.deviceid}&deviceName=${item.name}&loc=${item.deviceLocation}&group=${item.deviceGroup}&ui=${item.ui}`)" />
            <van-icon name="delete"
              @click="deleteDevice(item.deviceid)" />
          </div>
        </div>
        <div class="rel pt10">
          <!-- 控制按钮 -->
          <div class="flex jca mb15" v-if="item.ui !== '智能卷帘门'">
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
              <p class="c32 b f14 sub-title active">当前状态</p>
              <div class="mt15 flex jcc cf2">
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
            <div class="ctrl-item" :class="{invalid:item.targetIndex!=='temperature'}">
              <div class="flex aic jcb f14">
                <p class="c32 b sub-title flex aic"
                  :class="{active:item.targetIndex==='temperature'}">
                  自定义温度
                </p>
                <div class="edit-btn-wrapper" :class="{active:autoMode}">
                  <van-icon name="edit" @click="editTarget('temperature',item)" />
                  <p class="mode-tag abs f12 b g3 mode-tag-auto"
                    :class="{opa0:!autoMode || item.targetIndex !=='temperature'}">自动模式</p>
                </div>
              </div>
              <p class="mt15 c7c ml26">推荐温度为：36度。</p>
              <div class="cf2 slider-bar flex-col jcc"
                :class="{invalid:autoMode}">
                <van-slider
                  class="temp-slider"
                  v-model="item.targetHighTemperature"
                  active-color="#ee0a24"
                  :min="-30"
                  :max="130"
                  @change="(value)=>onSlideChange(item,[value,undefined],'temperature')">
                  <div
                    slot="button"
                    class="slider-button temp-button">
                    {{ item.targetHighTemperature || 0 }}°
                  </div>
                </van-slider>
              </div>
              <p class="f12 b g3 tc mode-tag" :class="{opa0:autoMode || item.targetIndex !== 'temperature'}">手动模式</p>
            </div>
            <div class="ctrl-item" :class="{invalid:item.targetIndex!=='humidity'}">
              <div class="flex aic jcb f14">
                <p class="c32 b sub-title flex aic" :class="{active:item.targetIndex==='humidity'}">
                  自定义湿度
                </p>
                <div class="edit-btn-wrapper" :class="{active:autoMode}">
                  <van-icon name="edit" @click="editTarget('humidity',item)" />
                  <p class="mode-tag abs f12 b g3 mode-tag-auto"
                    :class="{opa0:!autoMode || item.targetIndex !=='humidity'}">自动模式</p>
                </div>
              </div>
              <div class="mt15 cf2 slider-bar flex-col jcc"
                :class="{invalid:autoMode}">
                <van-slider
                  class="humidity-slider"
                  v-model="item.targetHighHumidity"
                  active-color="#ee0a24"
                  @change="(value)=>onSlideChange(item,[value,undefined],'humidity')">
                  <div
                    slot="button"
                    class="slider-button humidity-button">
                    {{ item.targetHighHumidity || 0 }}%
                  </div>
                </van-slider>
              </div>
              <p class="f12 b g3 tc mode-tag" :class="{opa0:autoMode || item.targetIndex !== 'humidity'}">手动模式</p>
            </div>
          </div>
          <!-- 智能卷帘门 -->
          <div class="flex jca mb15" v-if="item.ui === '智能卷帘门'">
            <div
              class="btn-item flex-col aic"
              v-for="btn in rollingDoorCtrls"
              :key="btn.name"
              @click="onBtnClick(item, btn)">
              <div class="btn flex aic jcc mb5 f24 b wh"
                :style="`background:${item.op === btn.value ? btn.background : grayBg}`">
                <van-icon :name="btn.icon" />
              </div>
              <span class="c32 b">{{btn.name}}</span>
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
    <van-dialog
      v-model="paramSetterVisible"
      :title="`请设置${targetParam}上下限`"
      show-cancel-button
      :before-close="(action,done)=>done(false)"
      @confirm="onSetterConfirm"
      @cancel="paramSetterVisible = false;">
      <div class="p20">
        <van-cell-group :border="false">
          <van-field v-model="targetParamHighValue"
            label="高于"
            type="number">
            <template #right-icon>
              <span>{{targetParam==='温度'?'℃':'%'}} 时关闭</span>
            </template>
          </van-field>
          <van-field v-model="targetParamLowValue"
            label="低于"
            type="number"
            :error-message="targetParamValueError">
            <template #right-icon>
              <span>{{targetParam==='温度'?'℃':'%'}} 时开启</span>
            </template>
          </van-field>
        </van-cell-group>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { Toast, Dialog } from 'vant';
import { deleteOne, webSocketAp, getOneByDeviceid, deviceList } from '@/api';
import { rollingDoorCtrls } from '@/assets/js/protocol';

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
let hbIntervalId;
export default {
  data() {
    return {
      controls,
      rollingDoorCtrls, // 智能卷帘门控制
      linking: false,
      group: '',
      deviceList: [],
      authType: '',
      targetParam: '', // 目标参数名
      targetParamHighValue: '', // 目标参数值，高值
      targetParamLowValue: '', // 目标参数值，低值
      paramSetterVisible: false,
      targetParamValueError: '', // 输入错误提示
      editingItem: null, // 当前编辑的对象
      grayBg: 'linear-gradient(136deg,rgba(255,255,255,1) 0%,gray 100%);',
      autoMode: false,
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
      this.connectWebsocket();
    });
  },
  methods: {
    // 参数设置器确认回调
    onSetterConfirm() {
      // 判断参数是否输入正确
      if (
        this.targetParamHighValue === undefined ||
        !this.targetParamHighValue === undefined
      ) {
        this.targetParamValueError = '值不能为空';
        return;
      }
      const highValue = Number(this.targetParamHighValue);
      const lowValue = Number(this.targetParamLowValue);
      if (highValue <= lowValue) {
        this.targetParamValueError = '值上限必须高于值下限';
        return;
      }
      let deviceType;
      if (this.targetParam === '温度') {
        deviceType = 'temperature';
        // 最大值是130，最小值是-30
        if (
          highValue > 130 ||
          highValue < -30 ||
          lowValue > 130 ||
          lowValue < -30
        ) {
          this.targetParamValueError = '温度范围必须为-30°至130°之间';
          return;
        }
        this.editingItem.targetHighTemperature = highValue;
        this.editingItem.targetLowTemperature = lowValue;
      } else if (this.targetParam === '湿度') {
        deviceType = 'humidity';
        if (
          highValue < 0 ||
          highValue > 100 ||
          lowValue < 0 ||
          lowValue > 100
        ) {
          this.targetParamValueError = '湿度范围必须为0%至100%之间';
          return;
        }
        this.editingItem.targetHighHumidity = highValue;
        this.editingItem.targetLowHumidity = lowValue;
      }
      this.onSlideChange(this.editingItem, [highValue, lowValue], deviceType);
      this.autoMode = true;
      this.paramSetterVisible = false;
    },
    // 手动编辑目标值
    editTarget(targetParam, item) {
      this.editingItem = item;
      if (targetParam === 'temperature') {
        this.targetParam = '温度';
        this.targetParamHighValue = item.targetHighTemperature;
        this.targetParamLowValue = item.targetLowTemperature;
      } else if (targetParam === 'humidity') {
        this.targetParam = '湿度';
        this.targetParamHighValue = item.targetHighHumidity;
        this.targetParamLowValue = item.targetLowHumidity;
      }
      this.targetParamValueError = '';
      this.paramSetterVisible = true;
    },
    // 温度控制值变化
    onSlideChange(item, values, deviceType) {
      if (this.linking) {
        this.autoMode = false;
        // 判断是否设置了下限目标
        let targetLow =
          item[
            deviceType === 'temperature'
              ? 'targetLowTemperature'
              : 'targetLowHumidity'
          ];
        if (values[1] !== undefined) {
          targetLow = String(values[1]);
        } else {
          targetLow = String(values[0] - 1);
        }
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
                  targetHigh: String(values[0]),
                  reaction: {
                    switch: 'off',
                  },
                },
                {
                  targetLow,
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

    // 握手
    shakeHands() {
      const { at, appid, apikey } = this.wsOptions;
      // 握手
      this.ws.send(
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
    },

    // ws连接成功回调
    onWsOpen() {
      console.log('连接服务端WebSocket成功');
      this.linking = true;
      // 握手
      this.shakeHands();
      // 遍历查询设备在线状态
      this.deviceList.forEach(dev => {
        getOneByDeviceid({
          deviceid: dev.deviceid,
          deviceType: this.authType,
        }).then(resp => {
          if (resp.code === '1') {
            // 获取在线状态
            this.$set(
              dev,
              'online',
              (resp.result && resp.result.online) || false,
            );
            dev.ui = resp.result.extra.extra.ui;
            if (dev.online) {
              this.getDeviceStatus(dev.deviceid);
            }
          } else {
            Toast(resp.msg);
          }
        });
      });
    },
    // ws信息接收回调
    onWsMessage(msg) {
      const message = JSON.parse(msg.data);
      const { deviceid, params, error, config, action } = message;
      if (error === 403) {
        const deviceName = this.deviceList.filter(
          item => item.deviceid === deviceid,
        )[0].name;
        Dialog.alert({
          title: '异常告警',
          message: `您没有权限控制【${deviceName}】(${deviceid})设备，请尝试重新添加该设备，连接将会断开。`,
        });
        return;
      }
      // TODO: 这里用http请求设备当前状态，这样就不会触发onmessage了
      if (params === undefined) {
        this.getDeviceStatus(message.deviceid);
      }
      // 监听系统消息
      if (action === 'sysmsg') {
        // 说明设备在线离线发生变化
        const { online } = params;
        const targetDevice = this.deviceList.find(
          dev => dev.deviceid === deviceid,
        );
        if (targetDevice) {
          this.$set(targetDevice, 'online', online);
        }
      }
      // 监听状态更新
      if (action === 'update') {
        // 说明设备状态更新
        const {
          currentHumidity,
          currentTemperature,
          targets,
          deviceType,
          switch: switchStatus,
          op,
          pulse, // 开关点动状态
          pulseWidth, // 点动时间长短
        } = params;
        const targetDevice = this.deviceList.find(
          dev => dev.deviceid === deviceid,
        );
        if (targetDevice) {
          switchStatus && this.$set(targetDevice, 'switchStatus', switchStatus);
          pulse && this.$set(targetDevice, 'pulse', pulse);
          pulseWidth && this.$set(targetDevice, 'pulseWidth', pulseWidth);
          currentTemperature &&
            this.$set(targetDevice, 'temperature', currentTemperature);
          currentHumidity &&
            this.$set(targetDevice, 'humidity', currentHumidity);
          if (targets) {
            // 有targets说明是温湿器
            const highValue = targets.find(
              item => item.targetHigh !== undefined,
            );
            const lowValue = targets.find(item => item.lowValue !== undefined);
            this.$set(targetDevice, 'targetIndex', deviceType);
            if (deviceType === 'temperature') {
              if (highValue) {
                this.$set(
                  targetDevice,
                  'targetHighTemperature',
                  parseInt(highValue.targetHigh),
                );
              }
              if (lowValue) {
                this.$set(
                  targetDevice,
                  'targetLowTemperature',
                  parseInt(lowValue.targetLow),
                );
              }
            } else if (deviceType === 'humidity') {
              if (highValue) {
                this.$set(
                  targetDevice,
                  'targetHighHumidity',
                  parseInt(highValue.targetHigh),
                );
              }
              if (lowValue) {
                this.$set(
                  targetDevice,
                  'targetLowHumidity',
                  parseInt(lowValue.targetLow),
                );
              }
            }
          }
          // 如果有op，说明是智能卷帘门
          op && this.$set(targetDevice, 'op', op);
        }
      }
      // 初始查询返回
      if (params) {
        const {
          currentHumidity, // 当前湿度
          currentTemperature, // 当前温度
          targets, // 目标值
          deviceType, // 目标参数（温度或湿度）
          switch: switchStatus, // 开启状态
          op, // 智能卷帘门 状态参数
          pulse, // 开关点动状态
          pulseWidth, // 点动时间长短
        } = params;
        // 获取目标设备
        const targetDevice = this.deviceList.find(
          dev => dev.deviceid === deviceid,
        );
        if (targetDevice) {
          targetDevice.requestCount = targetDevice.requestCount
            ? targetDevice.requestCount + 1
            : 1;
          switchStatus && this.$set(targetDevice, 'switchStatus', switchStatus);
          pulse && this.$set(targetDevice, 'pulse', pulse);
          pulseWidth && this.$set(targetDevice, 'pulseWidth', pulseWidth);
          currentTemperature &&
            this.$set(targetDevice, 'temperature', currentTemperature);
          currentHumidity &&
            this.$set(targetDevice, 'humidity', currentHumidity);
          if (targets) {
            const highValue = targets.find(
              item => item.targetHigh !== undefined,
            );
            // 如果是第一次请求温湿器参数
            if (deviceType && highValue && targetDevice.requestCount === 1) {
              // 设置参数
              this.onSlideChange(
                targetDevice,
                [parseInt(highValue.targetHigh), undefined],
                deviceType,
              );
            }
            const lowValue = targets.find(item => item.targetLow !== undefined);
            this.$set(targetDevice, 'targetIndex', deviceType);
            if (deviceType === 'temperature') {
              if (highValue) {
                this.$set(
                  targetDevice,
                  'targetHighTemperature',
                  parseInt(highValue.targetHigh),
                );
              }
              if (lowValue) {
                this.$set(
                  targetDevice,
                  'targetLowTemperature',
                  parseInt(lowValue.targetLow),
                );
              }
            } else if (deviceType === 'humidity') {
              if (highValue) {
                this.$set(
                  targetDevice,
                  'targetHighHumidity',
                  parseInt(highValue.targetHigh),
                );
              }
              if (lowValue) {
                this.$set(
                  targetDevice,
                  'targetLowHumidity',
                  parseInt(lowValue.targetLow),
                );
              }
            }
          }
          // 如果有op，说明是智能卷帘门
          op && this.$set(targetDevice, 'op', op);
        }
      }

      // config参数
      if (config) {
        const { hb, hbInterval } = config;
        if (hb) {
          // 说明需要发送心跳
          this.sendHb(hbInterval || 90);
        }
      }
      console.log('收到的消息：', message);
    },
    // 发送心跳
    sendHb(interval) {
      hbIntervalId && clearInterval(hbIntervalId);
      hbIntervalId = setInterval(() => {
        this.ws.send('ping');
      }, interval * 1000);
    },
    // 连接ws
    connectWebsocket() {
      const { domain, port, apikey } = this.wsOptions;
      this.apikey = apikey;
      const ws = new WebSocket(`wss://${domain}:${port}/api/ws`);
      this.ws = ws;
      // 监听连接成功
      ws.onopen = this.onWsOpen;
      // 监听服务端消息(接收消息)
      ws.onmessage = this.onWsMessage;
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
    // 控制按钮点击事件
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
    // 获取设备基本状态
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
    hbIntervalId && clearInterval(hbIntervalId);
    hbIntervalId = null;
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
  transition: all 1s;
  &.invalid {
    filter: grayscale(100%);
  }
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
  transition: all 0.3s;
  &.invalid {
    filter: grayscale(100%);
  }
}
.slider-button {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  box-sizing: border-box;
  color: #f2f2f2;
  font-size: 22px;
  font-weight: 400;
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
.edit-btn-wrapper {
  position: relative;
  background: linear-gradient(136deg, rgba(255, 255, 255, 1) 0%, gray 100%);
  height: 30px;
  width: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  transition: all 0.3s;
  &.active {
    background: linear-gradient(
      132deg,
      rgba(207, 255, 209, 1) 0%,
      rgba(24, 185, 13, 1) 100%
    );
  }
}
.mode-tag {
  transition: all 0.3s;
  &.mode-tag-auto {
    top: 110%;
    width: 50px;
    text-align: center;
  }
}
</style>
<style lang="scss">
.device-list {
  .van-slider__bar {
    height: 10px !important;
    background: transparent !important;
  }
  .van-field__label {
    width: 50px;
  }
  .van-field__right-icon {
    color: #323233;
  }
}
</style>
