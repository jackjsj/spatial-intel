<template>
  <div>
    <!-- 设备列表 -->
    <van-nav-bar
      class="flex-none"
      style="border-bottom:1px solid #EBEDFF"
      :title="'设备名称'"
      left-text="返回"
      left-arrow
      :border="false"
      @click-left="$router.push('/')" />
    <div>
      <div
        class="device-item"
        v-for="item in deviceList"
        :key="item.deviceid">
        <!-- 列表项头部 -->
        <div class="device-item-header flex jcb mb20">
          <div class="header-title f16 b c32">{{item.name}}--{{item.online?'在线':'离线'}}--{{item.switchStatus}}</div>
          <div class="flex aic header-icon">
            <van-icon class="mr10" name="wap-nav"
              @click="$router.push(`/device-edit?deviceid=${item.deviceid}&deviceName=${item.name}`)" />
            <van-icon name="delete"
              @click="deleteDevice(item.deviceid)" />
          </div>
        </div>
        <!-- 控制按钮 -->
        <div class="flex jca">
          <div
            class="btn-item flex-col aic"
            v-for="btn in controls"
            :key="btn.name">
            <div class="btn flex aic jcc mb5"
              :style="`background:${btn.background}`">
              <img :src="btn.icon" @click="onBtnClick(item, btn)" />
            </div>
            <span class="c32 b">{{btn.name}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { Toast, Dialog } from 'vant';
import { deleteOne, webSocketAp, getOneByDeviceid } from '@/api/';

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
    };
  },
  computed: {
    ...mapState(['deviceList']),
  },
  mounted() {
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
    deleteDevice(deviceid) {
      // 提示
      Dialog.confirm({
        message: '确定要删除设备吗？',
      }).then(() => {
        deleteOne({
          deviceid,
        }).then(resp => {
          if (resp.code === '1') {
            Toast('删除成功');
            this.$router.push('/');
          } else {
            Toast(resp.msg);
          }
        });
      });
    },
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
          getOneByDeviceid(dev.deviceid).then(resp => {
            dev.online = resp.result.online;
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
        if (message.action === 'sysmsg') {
          // 说明设备在线离线发生变化
          const { deviceid, params } = message;
          const { online } = params;
          const targetDevice = this.deviceList.filter(
            dev => dev.deviceid === deviceid,
          )[0];
          if (targetDevice) {
            targetDevice.online = online;
          }
        }
        if (message.action === 'update') {
          // 说明设备状态更新
          const { deviceid, params } = message;
          const switchStatus = params.switch === 'on' ? '已开启' : '已关闭';
          const targetDevice = this.deviceList.filter(
            dev => dev.deviceid === deviceid,
          )[0];
          if (targetDevice) {
            targetDevice.switchStatus = switchStatus;
          }
        }
        if (message.params && message.params.switch) {
          const { deviceid, params } = message;
          const switchStatus = params.switch === 'on' ? '已开启' : '已关闭';
          const targetDevice = this.deviceList.filter(
            dev => dev.deviceid === deviceid,
          )[0];
          if (targetDevice) {
            targetDevice.switchStatus = switchStatus;
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
</style>
