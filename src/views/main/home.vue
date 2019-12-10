<template>
  <!-- 首页 -->
  <div class="home">
    <!-- <header class="header flex aic pl40">
      <div class="logo-wrapper mr10">
      </div>
      <div class="lh1 wh b f14 flex-col jcc">
        <p class="mb5">Starting the intelligent life</p>
        <p class="f13">开启智能生活</p>
      </div>
    </header> -->
    <header class="header flex aic jcb pl15 pr15">
      <div class="flex aic">
        <div class="logo-wrapper mr10 flex aic jcc">
          <van-icon name="contact" color="#4958D9" />
          <!-- <van-icon name="smile" color="#4958D9"/> -->
        </div>
        <p class="f15 b cf2">空间智能</p>
      </div>
      <div class="header-icon">
        <van-icon color="#fff" name="shopping-cart" />
      </div>
    </header>
    <!-- swiper -->
    <div class="card">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in 3"
          :key="item">
          <div class="flex aic jcc">
            <img class="swiper-img" :src="sample3" />
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 新人推荐 -->
    <div class="card">
      <div class="card-content">
        <p class="f14 b mb10">新人推荐</p>
        <div class="freshman-recommands flex aic ova">
          <div class="mr18">
            <img :src="sample1" />
          </div>
          <div>
            <img :src="sample2" />
          </div>
        </div>
      </div>
    </div>
    <!-- 添加设备\授权 -->
    <div class="card">
      <div class="card-content flex">
        <div class="flex1 tc flex aic jcc"
          style="border-right:1px solid #dde3f2"
          @click="$router.push('/add-way')">
          <div class="add-img add-device-img flex aic jcc">
            <img src="@/assets/images/add-device.png" />
          </div>
          <span>添加设备</span>
        </div>
        <div class="flex1 tc flex aic jcc"
          @click="$router.push('/auth')">
          <div class="add-img add-auth-img flex aic jcc">
            <img src="@/assets/images/add-auth.png" />
          </div>
          <span>添加授权</span>
        </div>
      </div>
    </div>
    <!-- 设备 -->
    <div class="card"
      v-for="item in items"
      :key="item.name">
      <div class="card-content">
        <div class="my-device-title flex aic jcc mb10"
          :style="`background:${item.background}`">
          <span class="f14 c32 b">{{item.name}}</span>
        </div>
        <!-- 根据位置分 -->
        <div>
          <!-- <div class="flex aic mb10">
            <img class="loc-img mr10" src="@/assets/images/loc-1.png" />
            <p class="c32 b f16">公司</p>
          </div> -->
          <div class="flex flex-wrap">
            <!-- 根据设备类型分 -->
            <div
              class="device-type-item aic jcc poi"
              style="border-width:1px;"
              v-for="device in myDevices"
              :key="device.type"
              @click="onTypeClick(device)">
              <!-- <div class="icon-wrapper mr10">
              </div> -->
              <div class="tc fw600">
                <p class="f13" style="color:#06121F">{{device.type}}</p>
                <p class="f10" style="color:#8C9198">{{device.num}}</p>
              </div>
            </div>
            <div v-if="myDevices.length % 2 === 1" class="item-padding"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapMutations } from 'vuex';
import sample1 from '@/assets/images/sample1.png';
import sample2 from '@/assets/images/sample2.png';
import sample3 from '@/assets/images/sample3.png';
import { deviceList } from '@/api/';

const items = [
  {
    name: '我的设备',
    background:
      'linear-gradient(133deg,rgba(27, 223, 86, 0.77) 0%,rgba(222, 255, 236, 0.2) 100%)',
  },
  // {
  //   name: '接收授权的设备',
  //   background:
  //     'linear-gradient(127deg,rgba(58,230,189,0.88) 0%,rgba(223,255,248,0.2) 100%)',
  // },
  // {
  //   name: '已授权的设备',
  //   background:
  //     'linear-gradient(139deg,rgba(99,123,255,0.56) 0%,rgba(239,241,255,0.38) 100%)',
  // },
];

const myDevices = [
  {
    type: '窗帘',
    num: 2,
  },
  {
    type: '卷帘门',
    num: 2,
  },
  {
    type: '起降杆',
    num: 2,
  },
  {
    type: '取暖器',
    num: 2,
  },
];
export default {
  data() {
    return {
      myDevices: [],
      items,
      sample1,
      sample2,
      sample3,
    };
  },
  mounted() {
    // 获取设备列表
    Toast.loading({
      // loadingType: 'spinner',
      during: 0,
      message: '加载中...',
    });
    deviceList().then(resp => {
      Toast.clear();
      if (resp.result) {
        const devices = resp.result.map(dev => ({
          type: dev.extra.extra.ui,
          deviceid: dev.deviceid,
          name: dev.name,
          online: dev.online,
          switchStatus: false,
        }));
        const devsGroupByType = _.groupBy(devices, 'type');
        for (const item in devsGroupByType) {
          this.myDevices.push({
            type: item,
            num: devsGroupByType[item].length,
            children: devsGroupByType[item],
          });
        }
      }
    });
  },
  methods: {
    ...mapMutations(['setDeviceList']),
    onTypeClick(device) {
      const devices = device.children;
      this.setDeviceList(devices);
      this.$router.push(`/device-list?type=${device.type}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.header-icon {
  .van-icon {
    font-size: 20px;
  }
}
.header {
  height: 56px;
  background: #5169e9;
}
.logo-wrapper {
  width: 28px;
  height: 28px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(112, 112, 112, 1);
  border-radius: 50%;
  .van-icon {
    font-size: 20px;
  }
}

.freshman-recommands {
  img {
    width: 144px;
    height: 72px;
    border-radius: 10px;
  }
}
.add-img {
  border-radius: 50%;
  width: 28px;
  height: 28px;
  margin-right: 9.5px;
  img {
    width: 100%;
    height: 100%;
    margin-top: 5px;
  }
}
.add-device-img {
  background: #09ac2a;
  box-shadow: 0px 3px 10px rgba(9, 172, 42, 0.5);
}
.add-auth-img {
  background: rgba(255, 108, 0, 1);
  box-shadow: 0px 3px 10px rgba(252, 180, 128, 0.5);
}
.my-device-title {
  display: inline-block;
  height: 32px;
  line-height: 32px;
  padding: 0 10px;
  background: linear-gradient(
    133deg,
    rgba(27, 223, 86, 0.77) 0%,
    rgba(222, 255, 236, 0.2) 100%
  );
  opacity: 1;
  border-radius: 0px 13px 5px 13px;
}
.loc-img {
  width: 15px;
  height: 22px;
}
.icon-wrapper {
  width: 32px;
  height: 32px;
  background: linear-gradient(
    133deg,
    rgba(245, 234, 218, 1) 0%,
    rgba(233, 200, 146, 1) 100%
  );
  border-radius: 50%;
}
.device-type-item {
  width: 50%;
  height: 80px;
  display: flex;
  flex: none;
  border-bottom: 1px solid rgb(221, 227, 242);
  border-right: 1px solid rgb(221, 227, 242);
  box-sizing: border-box;
  &:nth-child(2n) {
    border-right: none;
  }
  &:nth-last-child(1),
  &:nth-last-child(2) {
    border-bottom: none;
  }
}
.item-padding {
  width: 50%;
  border: none;
}
.swiper-img {
  height: 180px;
  width: 100%;
}
</style>
