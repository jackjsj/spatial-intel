<template>
  <div class="device-info-input vh100 flex-col">
    <!-- 设备信息编辑 -->
    <van-nav-bar
      class="flex-none"
      style="border-bottom:1px solid #EBEDFF"
      title="快速添加"
      left-text="返回"
      left-arrow
      :border="false"
      @click-left="$router.back()" />
    <div class="flex-auto blue-bg">
      <div class="wifi-box flex-col jcc">
        <!-- 图示 -->
        <div class="flex aic jcc mb30">
          <div class="img-wrapper">
            <img src="@/assets/images/device-link.png" />
          </div>
        </div>
        <!-- 信息表单 -->
        <div>
          <van-cell-group class="mb15" :border="false">
            <van-field
              :border="false"
              v-model="deviceName"
              label="设备名称："
              :placeholder="addingDeviceInfo.deviceid" />
            <van-field :border="false" v-model="location" label="设备位置："
              right-icon="more-o"
              @click-right-icon="showLocations" />
            <van-field :border="false" v-model="group" label="设备分组："
              right-icon="more-o"
              @click-right-icon="showGroups" />
            <van-field :border="false" v-model="addingDeviceInfo.deviceid" label="设备号：" readonly />
          </van-cell-group>
        </div>
      </div>
      <div class="flex jcc">
        <van-button class="cancel-btn"
          style="border-width:1px;"
          :loading="isLoading"
          loading-text="正在添加"
          @click="addDevice">完成添加</van-button>
      </div>
    </div>
    <!-- 添加结果弹框 -->
    <van-popup
      class="result-popup"
      :close-on-click-overlay="false"
      v-model="resultPopupVisible">
      <div class="flex-col aic pt30 pb30">
        <div class="flex-col aic mb35">
          <img
            src="@/assets/images/success.png"
            class="popup-icon mb15" />
          <p class="f14 c32 fw400 mb20">添加成功</p>
          <p class="f12 c32 fw400 mb40">设备正在连接WIFI，请稍等...</p>
        </div>
        <div class="flex-col">
          <div class="mb10">
            <van-button size="small"
              style="border-width:1px;color:#205BFF; border-color:#205BFF"
              class="popup-btn"
              @click="onConfirm">确定</van-button>
          </div>
          <div>
            <van-button size="small"
              style="border-width:1px;color:#205BFF; border-color:#205BFF"
              class="popup-btn"
              @click="addAgain">继续添加</van-button>
          </div>

        </div>
      </div>
    </van-popup>
    <van-popup
      :close-on-click-overlay="false"
      v-model="pickPopupVisible"
      position="bottom"
      :style="{ height: '30%' }">
      <van-picker
        show-toolbar
        :title="`选择${pickType === 'loc'?'位置':'分组'}`"
        :columns="pickType === 'loc' ? locations:groups"
        @cancel="onPickerCancel"
        @confirm="onPickerConfirm" />
    </van-popup>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { addDevice } from '@/api/';

function getTs() {
  return Math.round(new Date().getTime() / 1000);
}

export default {
  data() {
    return {
      deviceName: '',
      location: '',
      group: '',
      resultPopupVisible: false,
      isLoading: false,
      pickPopupVisible: false,
      locations: ['家', '公司'],
      groups: ['默认分组'],
      pickType: '',
    };
  },
  mounted() {
    // 获取分组列表和位置列表
    Toast.loading({
      duration: 0,
      forbidClick: true,
      message: '加载中...',
    });
    this.deviceName = this.addingDeviceInfo.deviceid;
  },
  computed: {
    ...mapState(['addingDeviceInfo']),
  },
  methods: {
    onPickerCancel() {
      this.pickPopupVisible = false;
    },
    onPickerConfirm(name) {
      if (this.pickType === 'loc') {
        this.location = name;
      } else {
        this.group = name;
      }
      this.pickPopupVisible = false;
    },
    showLocations() {
      this.pickType = 'loc';
      this.pickPopupVisible = true;
    },
    showGroups() {
      this.pickType = 'group';
      this.pickPopupVisible = true;
    },
    async addDevice() {
      this.isLoading = true;
      // 调添加设备接口
      addDevice({
        ...this.addingDeviceInfo,
        name: this.deviceName,
        deviceLocation: this.location,
        deviceGroup: this.group,
      }).then(resp => {
        console.log(resp);
        if (resp.code === '1') {
          // 添加设备后再调ap
          androidInterface.post_ap();
          this.resultPopupVisible = true;
        } else {
          Toast(resp.msg);
        }
        this.isLoading = false;
      });
    },
    onConfirm() {
      // 确定后返回首页
      this.$router.replace('/');
    },
    addAgain() {
      // 继续添加
      this.$router.push('/by-wifi');
    },
  },
};
</script>

<style lang="scss" scoped>
.popup-icon {
  width: 44px;
  height: 44px;
}
.popup-btn {
  border: 1px solid rgba(72, 10, 197, 1);
  opacity: 1;
  border-radius: 5px;
  color: rgba(72, 10, 197, 1);
  width: 156px;
}
.result-popup {
  width: 220px;
  box-shadow: 0px 5px 20px rgba(225, 227, 233, 0.6);
  border-radius: 5px;
}
.wifi-box {
  height: 299px;
  background: rgba(249, 252, 255, 1);
  border-radius: 10px;
  margin: 32.5px 30px 20px;
  padding: 0 30px;
}
.img-wrapper {
  width: 64px;
  height: 64px;
  // border: 1px solid rgba(112, 112, 112, 1);
  img {
    width: 100%;
    height: 100%;
  }
}
.dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  &.dot1 {
    background: rgba(137, 170, 254, 1);
  }
  &.dot2 {
    background: rgba(86, 126, 239, 1);
  }
  &.dot3 {
    background: rgba(32, 91, 255, 1);
  }
}
.mb50 {
  margin-bottom: 50px;
}
.mb38 {
  margin-bottom: 38px;
}
.cancel-btn {
  width: 312px;
  height: 44px;
  background: rgba(255, 255, 255, 0.1);
  color: #f2f2f2;
  border: 1px solid rgba(249, 252, 255, 1);
  opacity: 1;
  font-weight: bold;
  font-size: 13px;
  border-radius: 10px;
}
.c7c {
  color: #7c7c7c;
}
.van-cell-group,
.van-cell {
  background: transparent;
}
.van-cell {
  border-bottom: 1px solid rgb(203, 210, 220);
  padding: 7px 0;
  font-weight: bold;
  color: #323232;
  font-size: 13px;
}
</style>
<style lang='scss'>
.device-info-input {
  .van-field__label {
    width: 70px;
  }
}
</style>
