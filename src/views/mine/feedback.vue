<template>
  <!-- 用户反馈 -->
  <div class="feedback flex-col vh100">
    <van-nav-bar
      class="flex-none"
      style="border-bottom:1px solid #EBEDFF"
      title="用户反馈"
      left-text="返回"
      left-arrow
      :border="false"
      @click-left="$router.back()" />
    <div class="flex-auto blue-bg">
      <div class="form">
        <van-field :border="false" v-model="type" label="电器品类" />
        <van-field :border="false" v-model="brand" label="电器品牌" />
        <van-field :border="false" v-model="model" label="电器型号" />
        <van-field :border="false" type="textarea"
          rows="4"
          maxlength="200"
          show-word-limit
          v-model="problem" label="问题描述" />
        <van-field :border="false" v-model="phone" label="手机号" />
        <van-field :border="false" v-model="email" label="邮箱" />
        <van-button class="submit-btn"
          @click="onSubmit">
          提交
        </van-button>
      </div>

    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';

export default {
  data() {
    return {
      type: '',
      brand: '',
      model: '',
      problem: '',
      phone: '',
      email: '',
    };
  },
  methods: {
    onSubmit() {
      Toast.success({
        message: '提交成功，感谢您的参与！',
        forbidClick: true,
        duration: 1000,
        onClose: () => {
          this.$router.back();
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  margin: 5px 20px;
  .van-field {
    margin: 15px 0;
    background: transparent;
    border: 1px solid #f9fcff;
    border-radius: 5px;
  }
}
.submit-btn {
  height: 53px;
  width: 100%;
  font-size: 17px;
  font-weight: 400;
  line-height: 24px;
  color: rgba(249, 252, 255, 1);
  opacity: 1;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid #f9fcff;
  border-radius: 10px;
}
</style>
<style lang='scss'>
.feedback {
  .van-field__label {
    color: #d8d8d8;
  }
  .van-field__word-limit {
    color: #d8d8d8;
  }
  .van-field__control {
    color: #fff;
  }
}
</style>
