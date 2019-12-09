<template>
  <!-- 修改密码 -->
  <div class="change-pwd flex-col vh100">
    <van-nav-bar
      class="flex-none"
      style="border-bottom:1px solid #EBEDFF"
      title="修改密码"
      left-text="返回"
      right-text="完成"
      left-arrow
      :border="false"
      @click-left="$router.back()"
      @click-right="changePwd" />
    <div class="flex-auto blue-bg">
      <div class="form">
        <van-field
          v-model="password"
          :border="false"
          style="border-width:1px;"
          placeholder="输入当前密码" />
        <van-field
          v-model="newPassword"
          :border="false"
          style="border-width:1px;"
          placeholder="输入8-15位新密码" />
        <van-field
          v-model="newPasswordConfirm"
          :border="false"
          style="border-width:1px;"
          placeholder="再次输入新密码" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: '',
      newPassword: '',
      newPasswordConfirm: '',
    };
  },
  methods: {
    changePwd() {},
  },
};
</script>

<style lang="scss" scoped>
.form {
  margin: 10px 35px;
}
.van-field {
  padding: 12px 0;
  background: transparent;
  border-bottom: 1px solid #e7ecf2;
}
</style>
<style lang="scss">
.change-pwd {
  input::-webkit-input-placeholder {
    color: #e7ecf2 !important;
  }
  .van-field__control {
    color: #e7ecf2;
  }
}
</style>
