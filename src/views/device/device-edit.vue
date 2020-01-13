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
        label="名称："
        placeholder="" />
      <van-field
        v-model="location"
        label="位置："
        placeholder=""
        right-icon="more-o"
        @click-right-icon="showLocations" />
      <van-field
        v-model="group"
        label="分组："
        placeholder=""
        right-icon="more-o"
        @click-right-icon="showGroups" />
      <van-field
        v-model="deviceid"
        label="设备号："
        readonly
        placeholder="" />
      <div v-show="ui === '单通道开关'">
        <van-switch-cell v-model="pulse" title="点动状态：" />
        <van-field
          v-model="pulseWidth"
          label="时间设置"
          placeholder="仅支持0.5的整数位，范围0.5~3600秒" />
      </div>
    </div>
    <van-popup
      :close-on-click-overlay="false"
      v-model="pickPopupVisible"
      position="bottom">
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
import { Toast } from 'vant';
import { deviceReName, querySortInfo } from '@/api/';

export default {
  data() {
    return {
      deviceName: '',
      location: '',
      deviceid: '',
      locations: ['家', '公司'],
      groups: ['默认分组'],
      pickType: '',
      pickPopupVisible: false,
      pulse: false,
      pulseWidth: '',
      ui: '',
    };
  },
  mounted() {
    // 获取分组列表和位置列表
    Toast.loading({
      duration: 0,
      forbidClick: true,
      message: '加载中...',
    });
    querySortInfo().then(resp => {
      if (resp.code === '1') {
        const { deviceGroup, deviceLocation } = resp.result;
        this.locations.push(...deviceLocation);
        this.locations = [...new Set(this.locations)];
        this.groups.push(...deviceGroup);
        this.groups = [...new Set(this.groups)];
        Toast.clear();
      } else {
        Toast(resp.msg);
      }
    });
    this.deviceid = this.$route.query.deviceid;
    this.deviceName = this.$route.query.deviceName;
    this.location = this.$route.query.loc;
    this.group = this.$route.query.group;
    this.ui = this.$route.query.ui;
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
    changeDeviceName() {
      deviceReName({
        deviceid: this.deviceid,
        name: this.deviceName,
      }).then(resp => {
        if (resp.code === '1') {
          // Toast('修改将延迟生效，请稍候...');
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
