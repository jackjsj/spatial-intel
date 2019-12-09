<template>
  <div>
    <van-nav-bar
      class="flex-none"
      style="border-bottom:1px solid #EBEDFF"
      :title="'编辑'"
      left-text="返回"
      right-text="完成"
      left-arrow
      :border="false"
      @click-left="$router.back()"
      @click-right="changeDeviceName" />
    <div class="mt10">
      <van-field
        v-model="deviceName"
        label="名称备注："
        placeholder="" />
      <van-field
        v-model="location"
        label="位置备注："
        readonly
        placeholder="" />
      <van-field
        v-model="deviceid"
        label="设备号："
        readonly
        placeholder="" />
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { deviceReName } from '@/api/';

export default {
  data() {
    return {
      deviceName: '',
      location: '',
      deviceid: '',
    };
  },
  mounted() {
    this.deviceid = this.$route.query.deviceid;
    this.deviceName = this.$route.query.deviceName;
  },
  methods: {
    changeDeviceName() {
      deviceReName({
        deviceid: this.deviceid,
        name: this.deviceName,
      }).then(resp => {
        if (resp.code === '1') {
          Toast('修改将延迟生效，请稍候...');
          this.$router.push('/device-list');
        } else {
          Toast(resp.msg);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
