import { get, post } from './request';

/**
 * 获取设备列表
 */
export function deviceList() {
  return post('/userdevice/deviceList', {
    // deviceid: '1000b06c66',
    // name: '22222',
    // userId: '1',
  });
}
