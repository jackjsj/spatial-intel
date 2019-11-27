<template>
  <!-- 首页 -->
  <div class="home">
    <header class="header flex aic pl40">
      <!-- logo -->
      <div class="logo-wrapper mr10">
      </div>
      <!-- slogan -->
      <div class="lh1 wh b f14 flex-col jcc">
        <p class="mb5">Starting the intelligent life</p>
        <p class="f13">开启智能生活</p>
      </div>
    </header>
    <!-- swiper -->
    <div class="card">
    </div>
    <!-- 新人推荐 -->
    <div class="card">
      <div class="card-content">
        <p class="f14 b mb10">新人推荐</p>
        <div class="freshman-recommands flex aic ova">
          <div class="mr18">
            <img src="https://lanhu.oss-cn-beijing.aliyuncs.com/xd67359853-b16b-40ce-aef6-dce867412c6f" />
          </div>
          <div>
            <img src="https://lanhu.oss-cn-beijing.aliyuncs.com/xd90d6aba8-f211-4772-a92f-f943822fa30c" />
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
    <!-- 我的设备 -->
    <div class="card">
      <div class="card-content">
        <div class="my-device-title flex aic jcc mb10">
          <span class="f14 c32 b">我的设备</span>
        </div>
        <!-- 根据位置分 -->
        <div>
          <div class="flex aic mb10">
            <img class="loc-img mr10" src="@/assets/images/loc-1.png" />
            <p class="c32 b f16">公司</p>
          </div>
          <div class="flex flex-wrap">
            <!-- 根据设备类型分 -->
            <div
              class="device-type-item aic jcc"
              style="border-width:1px;"
              v-for="item in myDevices"
              :key="item.type">
              <div class="icon-wrapper mr10">
              </div>
              <div class="tc fw600">
                <p class="f13" style="color:#06121F">{{item.type}}</p>
                <p class="f10" style="color:#8C9198">{{item.num}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      myDevices,
    };
  },
};
</script>

<style lang="scss" scoped>
.header {
  height: 70px;
  background: #5169e9;
}
.logo-wrapper {
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(112, 112, 112, 1);
  border-radius: 50%;
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
  width: 80px;
  height: 32px;
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
  border: 1px dashed #ccc;
  box-sizing: border-box;
}
</style>
