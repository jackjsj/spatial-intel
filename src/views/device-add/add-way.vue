<template>
  <!-- 添加设备 -->
  <div class="flex-col vh100">
    <van-nav-bar
      class="flex-none"
      style="border-bottom:1px solid #EBEDFF"
      title="添加设备"
      left-text="返回"
      left-arrow
      :border="false"
      @click-left="$router.back()" />
    <div class="flex-auto blue-bg">
      <div>
        <div
          class="flex aic jcb item"
          style="border-width:1px;"
          v-for="item in addWays"
          :key="item.name"
          @click="$router.push(item.to)">
          <div class="flex aic">
            <div class="item-img-wrapper mr10">
              <img :src="item.icon" />
            </div>
            <div>
              <p class="f14 cf2">{{item.name}}</p>
              <p class="f12 cd8">{{item.desc}}</p>
            </div>
          </div>
          <van-icon class="arrow-right" name="arrow" color="#f2f2f2" />
        </div>
      </div>
      <p class="cf2 f12 pl20 pr20">* 注：设备实际的添加方式，请以产品说明书为准</p>
    </div>
  </div>

</template>

<script>
const addWays = [
  {
    name: '快速添加',
    desc: '适用于WIFI类设备',
    icon: require('@/assets/images/by-wifi.png'),
    to: '/by-wifi',
  },
  // {
  //   name: '扫码添加',
  //   desc: '适用于GSM类设备和附带二维码设备',
  //   icon: require('@/assets/images/by-scan.png'),
  //   to: '',
  // },
  // {
  //   name: '声波添加',
  //   desc: '适用于声波配对类设备',
  //   icon: require('@/assets/images/by-wave.png'),
  //   to: '',
  // },
];

export default {
  data() {
    return {
      addWays,
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.item-img-wrapper {
  width: 32px;
  height: 32px;
  background: #fff;
  img {
    width: 100%;
    height: 100%;
  }
}
.item {
  height: 90px;
  background: rgba(138, 175, 255, 0.8);
  border: 1px solid rgba(242, 242, 242, 1);
  border-radius: 10px;
  margin: 15px 20px;
  padding: 0 20px;
}
.arrow-right {
  font-size: 16px;
}
</style>
