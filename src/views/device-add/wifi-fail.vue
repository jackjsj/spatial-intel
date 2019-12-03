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
        <div class="flex aic jcc mb30">
          <div class="img-wrapper">
            <img src="@/assets/images/wifi-fail.png" />
          </div>
        </div>
        <p class="tc c32 b f13">无法连接到设备，请检查配置</p>
        <p class="tc c32 b f13 mb30">是否存在以下问题</p>
        <div class="c32 lh1">
          <p class="mb5">1.设备未进入配对模式</p>
          <p class="mb5">2.WIFI密码不正确</p>
          <p class="mb5">3.距离WIFI路由器太远</p>
        </div>
      </div>
      <div class="flex jcc">
        <van-button class="cancel-btn"
          style="border-width:1px;"
          @click="retry">重试</van-button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  methods: {
    retry() {
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
  padding: 0 50px;
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
  &.dot1 {
    background: rgba(137, 170, 254, 1);
  }
  &.dot2 {
    background: rgba(86, 126, 239, 1);
  }
  &.dot3 {
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
