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
      @click-left="$router.back()" />
    <div>
      <div
        class="device-item"
        v-for="item in deviceList"
        :key="item.deviceid">
        <!-- 列表项头部 -->
        <div class="device-item-header flex jcb mb20">
          <div class="header-title f16 b c32">{{item.name}}</div>
          <div class="flex aic header-icon">
            <van-icon class="mr10" name="wap-nav"
              @click="$router.push('/device-edit')" />
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
import { deleteOne, webSocketAp } from '@/api/';

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
      console.log(resp);
      const { apikey, appid, at, device } = resp.result;
      const { domain, port } = device;
      this.wsOptions = {
        domain,
        port,
        at,
        apikey,
        appid,
      };
      // this.connectWebsocket({
      //   domain: 'cn-pconnect2.coolkit.cc',
      //   port: 8080,
      //   at: '701cf2909afb848a344b9d662bf970b55a9b6b76',
      //   apikey: '8b501a9c8b0387bb68dfb36ea766dce62a3219a1',
      //   appid: 'Jz40dL2jj4GCaqorkleliPvgT2wDyInZ',
      // });
      this.connectWebsocket(this.wsOptions);
    });
  },
  methods: {
    deleteDevice(deviceid) {
      deleteOne(deviceid).then(resp => {
        Toast('删除成功');
      });
    },
    connectWebsocket(options) {
      const { domain, port, at, apikey, appid } = options;
      this.apikey = apikey;
      const ws = new WebSocket(`wss://${domain}:${port}/api/ws`);
      this.ws = ws;
      // !wss://cn-pconnect2.coolkit.cc:8080/api/ws
      // 监听连接成功
      ws.onopen = () => {
        console.log('连接服务端WebSocket成功');
        this.linking = true;
        console.log(
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
      };
      // 监听服务端消息(接收消息)
      ws.onmessage = msg => {
        let message = JSON.parse(msg.data);
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
        this.connectWebsocket(this.wsOptions);
      };
    },
    onBtnClick(item, btn) {
      // 控制设备，即更新设备状态
      if (this.linking) {
        console.log(
          JSON.stringify({
            action: 'query',
            deviceid: item.deviceid,
            apikey: this.apikey, // 用户的apikey
            sequence: +new Date(),
            // params: btn.params,
            params: ['switch'],
            ts: 0,
            from: 'app',
            userAgent: 'app',
          }),
        );
        this.ws.send(
          JSON.stringify({
            action: 'update',
            deviceid: item.deviceid,
            apikey: this.apikey, // 用户的apikey
            sequence: +new Date(),
            params: btn.params,
            // params: ['switch'],
            ts: 0,
            from: 'app',
            userAgent: 'app',
          }),
        );
      }
    },
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
