<template>
  <!-- 主页 -->
  <div class="vh100 flex-col">
    <router-view class="view flex-auto" />
    <div class="flex-none">
      <van-tabbar v-model="active"
        active-color="#3D48FF"
        inactive-color="#323232"
        :fixed="false">
        <van-tabbar-item v-for="(item,index) in tabbarItems"
          :key="item.name"
          :to="item.to"
          replace>
          <template #icon>
            <img :src="active === index ? item.checkedIcon : item.icon" />
          </template>
          {{item.name}}
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
const tabbarItems = [
  {
    name: '家',
    icon: require('@/assets/images/home.png'),
    checkedIcon: require('@/assets/images/home-checked.png'),
    to: '/index/home',
  },
  {
    name: '我的',
    icon: require('@/assets/images/mine.png'),
    checkedIcon: require('@/assets/images/mine-checked.png'),
    to: '/index/mine',
  },
];

export default {
  data() {
    return {
      active: 0,
      tabbarItems,
    };
  },
};
</script>

<style lang="scss" scoped>
.view {
  // padding-bottom: 50px;
  overflow: auto;
}
</style>
