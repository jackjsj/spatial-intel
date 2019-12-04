import { get, post } from './request';

/**
 * 1. 获取设备列表
 */
export function deviceList() {
  return post('/userdevice/deviceList', {
    // deviceid: '1000b06c61',
    // name: '22222',
    userId: 1,
  });
}

/**
 *  2. 添加设备
 */
export function addDevice(options) {
  return post('/userdevice/addDevice', options);
}

/**
 *  3. 删除单个设备
 */
export function deleteOne(deviceid) {
  return post('/userdevice/deleteOne', {
    deviceid,
  });
}

/**
 * 4. 获取分配服务器
 */
export function webSocketAp() {
  return post('/userdevice/webSocketAp');
}

/**
 * 5. 获取单个设备详情
 */
export function getOneByDeviceid(deviceid) {
  return post('/userdevice/getOneByDeviceid', {
    deviceid,
  });
}

/**
 * 6. 设备重命名
 */
export function deviceReName(options) {
  return post('/userdevice/deviceReName', options);
}
