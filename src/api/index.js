import { get, post } from './request';

/**
 * 1. 获取设备列表
 */
export function deviceList(options) {
  return post('/userdevice/deviceList', options);
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
export function deleteOne(options) {
  return post('/userdevice/deleteOne', options);
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
export function getOneByDeviceid(options) {
  return post('/userdevice/getOneByDeviceid', options);
}

/**
 * 6. 设备重命名
 */
export function deviceReName(options) {
  return post('/userdevice/deviceReName', options);
}

/**
 * 7. 登录
 */
export function login(options) {
  return post('/tbuser/userPhoneLogin', options);
}

/**
 * 8. 注册
 */
export function register(options) {
  return post('/tbuser/userPhoneRegister', options);
}

/**
 * 9. 退出登录
 */
export function logout() {
  return post('/tbuser/logout');
}

/**
 * 10. 设备分组列表
 */
export function deviceSortList() {
  return post('/userdevice/deviceSortList');
}

/**
    11. 查询用户已有分类信息
 */
export function querySortInfo() {
  return post('/userdevice/querySortInfo');
}

/**
 * 12. 查询所有用户设备
 */
export function userAllDevicesList() {
  return post('/userdevice/userAllDevicesList');
}

/**
 * 授权设备
 */
export function shareDevice(options) {
  return post('/userdevice/shareDevice', options);
}
