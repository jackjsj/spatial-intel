<template>
  <div>
    <div>
      <van-cell-group>
        <van-cell title="设备信息" />
        <van-cell v-for="item in deviceInfoField"
          :key="item.key"
          :title="item.name"
          :label="item.formatter ? item.formatter(deviceInfo[item.key]) : deviceInfo[item.key]" />
        <van-cell title="设备状态" :label="status" />
      </van-cell-group>
    </div>
    <div class="mat mt20 flex jcc">
      <div class="mr10">
        <van-button size="small" @click="on">开启设备</van-button>
      </div>
      <div>
        <van-button size="small" @click="off">关闭设备</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import {
  login,
  getDeviceById,
  getDeviceStatus,
  updateDeviceStatus,
} from '@/api/';

function getTs() {
  return Math.round(new Date().getTime() / 1000);
}

const deviceInfoField = [
  {
    name: '名称',
    key: 'name',
  },
  {
    name: 'ip',
    key: 'ip',
  },
  {
    name: '在线状态',
    key: 'online',
    formatter(val) {
      return val ? '在线' : '离线';
    },
  },
  {
    name: '设备ID',
    key: 'deviceid',
  },
  {
    name: '设备类型',
    key: 'type',
  },
  {
    name: '设备apikey',
    key: 'apikey',
  },
];

export default {
  data() {
    return {
      deviceInfoField,
      deviceInfo: {},
      status: '',
    };
  },
  async mounted() {
    // 登录
    this.loginInfo = await this.login();
    // 获取设备信息
    this.deviceInfo = await this.getDeviceById();
    // 查询设备状态
    this.deviceStatus = await this.getDeviceStatus();
  },
  methods: {
    getDeviceStatus() {
      getDeviceStatus(
        {
          deviceid: '1000b06c5f',
          appid: 'Jz40dL2jj4GCaqorkleliPvgT2wDyInZ',
          ts: getTs(),
        },
        this.loginInfo.at,
      ).then(resp => {
        this.status = resp.params.switch === 'off' ? '已关闭' : '已开启';
      });
    },
    getDeviceById() {
      Toast.loading({
        message: '正在查询设备信息...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0,
      });
      return getDeviceById(
        {
          deviceid: '1000b06c5f',
          appid: 'Jz40dL2jj4GCaqorkleliPvgT2wDyInZ',
          ts: getTs(),
        },
        this.loginInfo.at,
      ).then(resp => {
        Toast.clear();
        return resp;
      });
    },
    login() {
      Toast.loading({
        message: '登录中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0,
      });
      return login({
        password: 'book1548',
        phoneNumber: '+8613730995961',
        appid: 'Jz40dL2jj4GCaqorkleliPvgT2wDyInZ',
        ts: getTs(),
      }).then(resp => {
        Toast.clear();
        Toast('登录成功');
        return resp;
      });
    },
    on() {
      updateDeviceStatus(
        {
          deviceid: '1000b06c5f',
          appid: 'Jz40dL2jj4GCaqorkleliPvgT2wDyInZ',
          ts: getTs(),
          apikey: this.deviceInfo.apikey,
          params: {
            switch: 'on',
          },
        },
        this.loginInfo.at,
      ).then(async resp => {
        if (resp.error !== 0) {
          Toast(resp.errmsg);
        } else {
          // this.status = '已开启';
          await this.getDeviceStatus();
          Toast(`设备${resp.deviceid}已开启`);
        }
        console.log(resp);
      });
    },
    off() {
      updateDeviceStatus(
        {
          deviceid: '1000b06c5f',
          appid: 'Jz40dL2jj4GCaqorkleliPvgT2wDyInZ',
          ts: getTs(),
          apikey: this.deviceInfo.apikey,
          params: {
            switch: 'off',
          },
        },
        this.loginInfo.at,
      ).then(async resp => {
        if (resp.error !== 0) {
          Toast(resp.errmsg);
        } else {
          // this.status = '已关闭';
          await this.getDeviceStatus();
          Toast(`设备${resp.deviceid}已关闭`);
        }
        console.log(resp);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
