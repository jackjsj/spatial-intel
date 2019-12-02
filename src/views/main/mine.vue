<template>
  <!-- 我的 -->
  <div class="vh100 flex-col">
    <van-nav-bar
      class="flex-none"
      style="border-bottom:1px solid #EBEDFF"
      title="个人中心"
      :border="false" />
    <div class="flex-auto ln-bg pt10">
      <div
        class="item aic jcb f14 cf2 b"
        :class="{clickable:!item.showToggle}"
        v-for="item in items"
        :key="item.name"
        @click="onItemClick(item)">
        <p>{{item.name}}</p>
        <van-switch v-if="item.showToggle" v-model="item.checked"
          size="22" active-color="#22DEB1" inactive-color="#EFEFEF" />
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';

const items = [
  {
    name: '按键遥控振动',
    showToggle: true,
    checked: false,
    onClick() {
      if (this.checked) {
        navigator.vibrate =
          navigator.vibrate ||
          navigator.webkitVibrate ||
          navigator.mozVibrate ||
          navigator.msVibrate;
        const isSupportVib = navigator.vibrate([80]);
        if (!isSupportVib) Toast('当前设备不支持震动');
      }
    },
  },
  {
    name: '充值',
    to: '/add-credit',
  },
  {
    name: '修改密码',
    to: '/change-pwd',
  },
  {
    name: '使用说明',
    to: '',
  },
  {
    name: '分享',
    to: '',
  },
  {
    name: '用户反馈',
    to: '/feedback',
  },
  {
    name: '关于我们',
    to: '',
  },
  {
    name: '设备更新',
    to: '',
  },
  {
    name: '退出登录',
    to: '',
  },
];
export default {
  data() {
    return {
      items,
    };
  },
  mounted() {},
  methods: {
    onItemClick(item) {
      item.to && this.$router.push(item.to);
      item.onClick && item.onClick();
    },
  },
};
</script>

<style lang="scss" scoped>
.van-nav-bar {
  background: #4f77f3;
}
.ln-bg {
  background: url('~@/assets/images/ln-bg.png');
  background-size: cover;
}
.item {
  display: flex;
  margin: 10px 15px;
  padding: 0 15px;
  height: 53px;
  background: rgba(249, 252, 255, 0.2);
  border: 1px solid rgba(249, 252, 255, 1);
  border-radius: 8px;
  &.clickable:active {
    border-style: inset;
    opacity: 0.8;
  }
}
</style>
