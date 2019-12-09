<template>
  <div class="vh100 flex-col">
    <van-nav-bar
      class="flex-none"
      style="border-bottom:1px solid #EBEDFF"
      title="快速添加"
      left-text="返回"
      left-arrow
      :border="false"
      @click-left="$router.back()" />
    <div class="flex-auto blue-bg">
      <div class="wifi-box flex-col jcc">
        <!-- 图示 -->
        <div class="flex aic jcc mb50">
          <div class="img-wrapper mr20">
            <img src="@/assets/images/device-link.png" />
          </div>
          <div class="dot dot1 mr10"></div>
          <div class="dot dot2 mr10"></div>
          <div class="dot dot3 mr20"></div>
          <div class="img-wrapper">
            <img src="@/assets/images/wifi-link.png" />
          </div>
        </div>
        <p class="tc mb38">请保证手机尽可能地贴近WIFI路由器</p>
        <p class="tc f13 mb5">正在连接，请稍候...</p>
        <p class="tc c7c" v-show="isDetected">检测到二代设备</p>
        <p class="tc c7c" v-show="isAdding">注册设备中...:{{deviceInfo.deviceid}}</p>
      </div>
      <div class="flex jcc">
        <van-button class="cancel-btn"
          style="border-width:1px;"
          @click="cancel">取消</van-button>
      </div>
    </div>

  </div>
</template>

<script>
import Vue from 'vue';
import { Toast } from 'vant';
import { mapMutations } from 'vuex';

export default {
  name: 'wifi-link',
  data() {
    return {
      isDetected: false,
      isAdding: false,
      deviceInfo: {},
      finished: false,
      isFailed: false,
      msg: '',
    };
  },
  watch: {
    finished(newValue, oldValue) {
      this.$router.push('/device-info-input');
    },
    deviceInfo(newValue, oldValue) {
      this.setAddingDeviceInfo(newValue);
    },
    isFailed(newValue) {
      if (newValue) {
        this.$router.push('/wifi-fail');
      }
    },
    msg(newValue, oldValue) {
      if (newValue) {
        Toast(newValue);
        this.$router.push('/by-wifi');
      }
    },
  },
  mounted() {
    Vue.prototype.router = this.$router;
    Vue.prototype.wifiLinkComp = this;
  },
  methods: {
    ...mapMutations(['setAddingDeviceInfo']),
    cancel() {
      this.$router.push('/by-wifi');
    },
  },
};
</script>

<style lang="scss" scoped>
.wifi-box {
  height: 299px;
  background: rgba(249, 252, 255, 1);
  border-radius: 10px;
  margin: 32.5px 30px 20px;
  padding: 0 30px;
}
.img-wrapper {
  width: 64px;
  height: 64px;
  // border: 1px solid rgba(112, 112, 112, 1);
  img {
    width: 100%;
    height: 100%;
  }
}
.dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  flex: none;
  transition: all 0.3s;
  &.dot1 {
    background: rgba(137, 170, 254, 1);
    animation: colorChange 0.6s ease 1s infinite;
  }
  &.dot2 {
    background: rgba(86, 126, 239, 1);
    animation: colorChange 0.6s ease 1.2s infinite;
  }
  &.dot3 {
    background: rgba(32, 91, 255, 1);
    animation: colorChange 0.6s ease 1.4s infinite;
  }
}

@keyframes colorChange {
  0% {
    background: rgba(137, 170, 254, 1);
  }
  50% {
    background: rgba(86, 126, 239, 1);
  }
  100% {
    background: rgba(32, 91, 255, 1);
  }
}

.mb50 {
  margin-bottom: 50px;
}
.mb38 {
  margin-bottom: 38px;
}
.cancel-btn {
  width: 312px;
  height: 44px;
  background: rgba(255, 255, 255, 0.1);
  color: #f2f2f2;
  border: 1px solid rgba(249, 252, 255, 1);
  opacity: 1;
  font-weight: bold;
  font-size: 13px;
  border-radius: 10px;
}
.c7c {
  color: #7c7c7c;
}
</style>
