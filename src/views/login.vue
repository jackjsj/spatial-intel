<template>
  <!-- 登录与注册 -->
  <div class="login vh100 flex-col ova">
    <!-- logo -->
    <div class="flex1 flex-none flex-col aic header jcc">
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
        :border="false"
        @change="mode = 'loginByPwd'">
        <van-tab title="登录">
          <div class="field-box">
            <van-field
              style="border-width:1px;"
              v-model="phoneNum"
              :border="false"
              placeholder="请输入手机号" />
            <van-field
              v-if="mode === 'loginByPwd'"
              style="border-width:1px;"
              v-model="password"
              :border="false"
              type="password"
              placeholder="请输入5-18位密码" />
            <van-field
              v-else
              style="border-width:1px;"
              v-model="vCode"
              :border="false"
              placeholder="请输入验证码">
              <van-button
                class="vc-btn"
                slot="button"
                size="small"
                type="primary">发送验证码</van-button>
            </van-field>
            <div v-show="mode === 'forgot'">
              <van-field
                style="border-width:1px;"
                v-model="newPassword"
                :border="false"
                type="password"
                placeholder="请输入8-15位新密码">
              </van-field>
              <van-field
                style="border-width:1px;"
                v-model="newPasswordConfirm"
                :border="false"
                type="password"
                placeholder="再次输入新密码">
              </van-field>
            </div>
            <van-button class="login-btn">
              {{mode === 'forgot' ? '完成并':''}}登录
            </van-button>
            <p class="flex aic jcb mt10 fw400 f12"
              v-show="mode!=='forgot'">
              <span style="color:#5169E9"
                @click="mode = 'forgot'">忘记密码？</span>
              <span style="color:#585858"
                @click="toggleLoginWay">
                {{mode === 'loginByPwd' ? '快速登录':'帐号登录'}}
              </span>
            </p>
          </div>
        </van-tab>
        <van-tab title="注册">
          <div class="field-box">
            <van-field
              style="border-width:1px;"
              v-model="registerPhoneNum"
              :border="false"
              placeholder="请输入手机号" />
            <van-field
              style="border-width:1px;"
              v-model="registerVCode"
              :border="false"
              placeholder="请输入验证码">
              <van-button
                class="vc-btn"
                slot="button"
                size="small"
                type="primary">发送验证码</van-button>
            </van-field>
            <van-button class="login-btn">
              注册并登录
            </van-button>
            <!-- 其它方式注册 -->
            <div class="flex aic jcb other-register mb15">
              <p class="line"
                style="border-width:1px;"></p>
              <p class="flex-none ml30 mr30"
                style="color:#8C9198;">其它方式注册</p>
              <p class="line"
                style="border-width:1px;"></p>
            </div>
            <div class="flex aic jcc">
              <div class="flex-col aic mr64">
                <img class="register-logo mb5"
                  src="@/assets/images/QQ.png" />
                <p class="f14 logo-name">QQ</p>
              </div>
              <div class="flex-col aic">
                <img class="register-logo mb5"
                  src="@/assets/images/wechat.png" />
                <p class="f14 logo-name">微信</p>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mode: 'loginByPwd', // 默认密码登录
      /**
       * mode 可选值：
       * loginByPwd  帐号登录
       * loginByVc 验证码登录
       * forgot 忘记密码
       */
      phoneNum: '',
      password: '',
      vCode: '',
      newPassword: '',
      newPasswordConfirm: '',
    };
  },
  methods: {
    toggleLoginWay() {
      this.mode = this.mode === 'loginByPwd' ? 'loginByVc' : 'loginByPwd';
    },
  },
};
</script>

<style lang="scss" scoped>
.login{
  background:#fff;
}
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
.field-box {
  margin: 17px 35px;
}
.van-field {
  border-bottom: 1px solid #e7ecf2;
  padding: 13px 0;
}
.login-btn {
  display: block;
  width: 100%;
  background: linear-gradient(
    90deg,
    rgba(89, 133, 254, 1) 0%,
    rgba(32, 91, 255, 1) 100%
  );
  font-size: 17px;
  font-weight: 400;
  line-height: 24px;
  color: rgba(249, 252, 255, 1);
  margin-top: 48px;
  height: 53px;
  border-radius: 6px;
}
.fw400 {
  font-weight: 400;
}
.vc-btn {
  background: linear-gradient(
    90deg,
    rgba(89, 133, 254, 1) 0%,
    rgba(32, 91, 255, 1) 100%
  );
  border: none;
}
.line {
  flex: auto;
  border-bottom: 1px solid #8c9198;
}
.other-register {
  margin-top: 64px;
}
.register-logo {
  width: 32px;
  height: 32px;
}
.logo-name {
  font-weight: 400;
  line-height: 20px;
  color: rgba(6, 18, 30, 1);
}
.mr64 {
  margin-right: 64px;
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
