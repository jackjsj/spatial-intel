<template>
  <!-- 快速添加 -->
  <div class="by-wifi vh100 flex-col">
    <van-nav-bar
      class="flex-none"
      style="border-bottom:1px solid #EBEDFF"
      title="快速添加"
      left-text="返回"
      left-arrow
      :border="false"
      @click-left="$router.back()" />
    <div class="flex-auto blue-bg">
      <!-- 输入wifi名称和密码 -->
      <div class="wifi-box flex-col jcc">
        <!-- logo -->
        <div class="flex jcc">
          <img class="logo"
            src="@/assets/images/wifi.png" />
        </div>
        <!-- form -->
        <div>
          <van-cell-group class="mb15" :border="false">
            <van-field
              :border="false"
              v-model="wifiName"
              label="WiFi名称："
              readonly
              @click="popupVisible = true" />
            <van-field :border="false" v-model="wifiPwd" label="WiFi密码：" />
          </van-cell-group>
          <van-checkbox v-model="remember" class="f8">记住密码</van-checkbox>
        </div>
      </div>
      <div class="flex jcc">
        <van-button class="next-btn"
          style="border-width:1px;"
          @click="next">下一步</van-button>
      </div>
    </div>
    <!-- <van-popup
      v-model="popupVisible"
      position="bottom"
      :style="{ height: '30%' }">
      <van-picker
        :swipe-duration="100"
        :columns="columns" @change="onChange" />
    </van-popup> -->
  </div>
</template>

<script>
import { Toast } from 'vant';

export default {
  data() {
    return {
      remember: false,
      // popupVisible: false,
      // columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      wifiName: '',
      wifiPwd: '',
    };
  },
  mounted() {
    // 1. 判断是否连接WIFI
    // 2. 判断WIFI是否为2.4G
    // 3. 获取当前WIFI名称
    try {
      this.wifiName = androidInterface.getSSID();
    } catch (e) {
      Toast(e.message);
    }
    // 4.
  },
  watch: {
    wifiName(newValue, oldValue) {
      // 在localstorage中的rememberMap中找newValue对应的值
      const rememberMap =
        JSON.parse(window.localStorage.getItem('rememberMap')) || {};
      this.wifiPwd = rememberMap[newValue] || '';
      if (rememberMap[newValue]) {
        this.remember = true;
      }
    },
  },
  methods: {
    showWifis() {},
    onChange(e, val) {
      this.wifiName = val;
    },
    next() {
      // 判断wifi名称是否为空
      if (!this.wifiName.trim()) {
        Toast('未获取到WIFI信息');
      }
      // 判断是否记住密码
      if (this.remember) {
        const rememberMap =
          JSON.parse(window.localStorage.getItem('rememberMap')) || {};
        rememberMap[this.wifiName] = this.wifiPwd;
        window.localStorage.setItem('rememberMap', JSON.stringify(rememberMap));
      }
      try {
        // Toast(this.wifiPwd);
        androidInterface.connect(this.wifiPwd);
      } catch (e) {
        Toast(e.message);
      }
      this.$router.push('/wifi-link');
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
.next-btn {
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
.logo {
  width: 66px;
  height: 66px;
  margin-bottom: 50px;
}
.van-cell-group,
.van-cell {
  background: transparent;
}
.van-cell {
  border-bottom: 1px solid rgb(203, 210, 220);
  padding: 7px 0;
  font-weight: bold;
  color: #323232;
  font-size: 13px;
}
</style>
<style lang="scss">
.by-wifi {
  .van-field__control {
    color: #585858;
    font-weight: 400;
  }
  .van-checkbox__icon .van-icon {
    border-radius: 50%;
    border-color: #5243ff;
  }
  .van-checkbox__icon--checked .van-icon {
    background-color: #5243ff;
  }
}
</style>
