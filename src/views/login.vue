<template>
  <!-- 登录与注册 -->
  <div class="login vh100 flex-col">
    <!-- logo -->
    <div class="flex1 flex-col aic header jcc">
      <div class="logo-wrapper mb10">
        <img />
      </div>
      <p class="wh f14">开启智能生活</p>
    </div>
    <!-- tabs -->
    <div class="flex1">
      <van-tabs class="van-tabs"
        title-active-color="#fff"
        title-inactive-color="#fff"
        :border="false">
        <van-tab title="登录">
          <div>登录</div>
        </van-tab>
        <van-tab title="注册">
          <div>注册</div>
        </van-tab>
      </van-tabs>
    </div>

  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.logo-wrapper {
  width: 100px;
  height: 100px;
  background: #fff;
}
.header {
  height: 406px;
  background: #5169e9;
}
.van-tabs {
  background: transparent;
  margin-top: -65px;
}
</style>
<style lang="scss">
.login {
  .van-tabs__nav {
    background: transparent;
  }
  .van-tab {
    font-size: 17px;
    line-height: 65px;
  }
  .van-tabs--line .van-tabs__wrap {
    height: 65px;
  }
  .van-tabs__line {
    width: 0 !important;
    height: 0 !important;
    background: transparent;
    border-right: 8px solid transparent;
    border-left: 8px solid transparent;
    border-bottom: 8px solid #fff;
    bottom: 14px;
  }
}
</style>
