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
        v-for="item in 3"
        :key="item">
        <!-- 列表项头部 -->
        <div class="device-item-header flex jcb mb20">
          <div class="header-title f16 b c32">窗帘{{item}}</div>
          <div class="flex aic header-icon">
            <van-icon class="mr10" name="wap-nav" />
            <van-icon name="delete" />
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
              <img :src="btn.icon" />
            </div>
            <span class="c32 b">{{btn.name}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const controls = [
  {
    name: '开启',
    icon: require('@/assets/images/switch.png'),
    background:
      'linear-gradient(132deg,rgba(207,255,209,1) 0%,rgba(24,185,13,1) 100%);',
  },
  {
    name: '关闭',
    icon: require('@/assets/images/switch.png'),
    background:
      'linear-gradient(136deg,rgba(255,199,174,1) 0%,rgba(255,97,28,1) 100%);',
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
    };
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
