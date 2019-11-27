<template>
  <!-- 添加授权 -->
  <div class="auth">
    <van-nav-bar
      class="flex-none"
      style="border-bottom:1px solid #EBEDFF"
      title="添加授权"
      left-text="返回"
      right-text="完成"
      left-arrow
      :border="false"
      @click-right="auth"
      @click-left="$router.back()" />
    <div class="mt10">
      <van-field
        v-model="authTo"
        label="待授权用户："
        placeholder="请输入待授权用户手机号" />
      <van-field
        v-model="authDevice"
        label="授权设备："
        @click="devicePickerVisible = true"
        readonly
        placeholder="请选择将要授权的设备" />
      <van-field
        v-model="authPeriod"
        label="授权期限："
        @click="periodPickerVisible = true"
        readonly
        placeholder="请选择" />
    </div>
    <van-popup
      v-model="devicePickerVisible"
      position="bottom"
      :style="{ height: '30%' }">
      <van-picker
        :swipe-duration="100"
        show-toolbar
        :columns="devices"
        @cancel="devicePickerVisible = false;"
        @confirm="onDeviceConfirm" />
    </van-popup>
    <van-popup
      v-model="periodPickerVisible"
      position="bottom"
      :style="{ height: '30%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="periodPickerVisible = false;"
        @confirm="onPeriodConfirm" />
    </van-popup>
    <!-- 授权结果弹框 -->
    <van-popup
      class="result-popup"
      :close-on-click-overlay="false"
      v-model="resultPopupVisible">
      <div class="flex-col aic pt30 pb30">
        <div class="flex-col aic mb35">
          <img
            v-if="isSuccess"
            src="@/assets/images/success.png"
            class="popup-icon mb15" />
          <img
            v-else
            src="@/assets/images/wifi-fail.png"
            class="popup-icon mb15" />
          <p class="f14 c32 fw400">授权{{isSuccess?'成功':'失败'}}</p>
        </div>
        <div class="flex"
          v-if="isSuccess">
          <div class="mr10">
            <van-button size="small"
              style="border-width:1px;color:#205BFF; border-color:#205BFF"
              class="popup-btn">继续授权</van-button>
          </div>
          <div>
            <van-button size="small"
              style="border-width:1px;color:#205BFF; border-color:#205BFF"
              class="popup-btn">确定</van-button>
          </div>
        </div>
        <div class="flex"
          v-else>
          <div class="mr10">
            <van-button
              style="border-width:1px;"
              size="small" class="popup-btn ">重试</van-button>
          </div>
          <div>
            <van-button
              style="border-width:1px;"
              size="small" class="popup-btn">取消</van-button>
          </div>
        </div>
      </div>

    </van-popup>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  data() {
    return {
      authTo: '',
      authDevice: '',
      authPeriod: '',
      devicePickerVisible: false,
      periodPickerVisible: false,
      isSuccess: true, // 是否成功
      resultPopupVisible: false,
      devices: ['HUAWEI', '小米', '摄像头'],
      minDate: new Date(),
      maxDate: new Date(2029, 10, 1),
      currentDate: new Date(),
    };
  },
  methods: {
    onDeviceConfirm(value) {
      this.authDevice = value;
      this.devicePickerVisible = false;
    },
    onPeriodConfirm(value) {
      this.authPeriod = moment(value).format('YYYY-MM-DD HH:mm:ss');
      this.periodPickerVisible = false;
    },
    // 授权
    auth() {},
  },
};
</script>
<style lang='scss' scoped>
.popup-icon {
  width: 44px;
  height: 44px;
}
.result-popup {
  width: 180px;
  box-shadow: 0px 5px 20px rgba(225, 227, 233, 0.6);
  border-radius: 5px;
}
.mb35 {
  margin-bottom: 35px;
}
.popup-btn {
  border: 1px solid rgba(72, 10, 197, 1);
  opacity: 1;
  border-radius: 5px;
  color: rgba(72, 10, 197, 1);
}
</style>
<style lang="scss">
.auth {
  .van-field__label {
    & > span {
      color: #323232;
      font-weight: bold;
      font-size: 14px;
    }
  }
}
</style>
