import { get, post } from './request';

/**
 * 获取设备列表
 */
export function deviceList() {
  return post('/userdevice/deviceList', {
    // deviceid: '1000b06c61',
    // name: '22222',
    userId: 1,
  });
}

/**
 *  添加设备
 */
export function addDevice(options) {
  return post('/userdevice/addDevice', options);
}

/**
 *  删除单个设备
 */
export function deleteOne(deviceid) {
  return post('/userdevice/deleteOne', {
    deviceid,
  });
}

/**
 * 获取分配服务器
 */
export function webSocketAp() {
  return post('/userdevice/webSocketAp');
}
