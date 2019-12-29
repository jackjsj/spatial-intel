import { get, post } from './request';

/**
 * 1. 获取设备列表
 */
export function deviceList(options) {
  return post('/kuzhai/userdevice/deviceList', options);
}

/**
 *  2. 添加设备
 */
export function addDevice(options) {
  return post('/kuzhai/userdevice/addDevice', options);
}

/**
 *  3. 删除单个设备
 */
export function deleteOne(options) {
  return post('/kuzhai/userdevice/deleteOne', options);
}

/**
 * 4. 获取分配服务器
 */
export function webSocketAp() {
  return post('/kuzhai/userdevice/webSocketAp');
}

/**
 * 5. 获取单个设备详情
 */
export function getOneByDeviceid(options) {
  return post('/kuzhai/userdevice/getOneByDeviceid', options);
}

/**
 * 6. 设备重命名
 */
export function deviceReName(options) {
  return post('/kuzhai/userdevice/deviceReName', options);
}

/**
 * 7. 登录
 */
export function login(options) {
  return post('/kuzhai/tbuser/userPhoneLogin', options);
}

/**
 * 8. 注册
 */
export function register(options) {
  return post('/kuzhai/tbuser/userPhoneRegister', options);
}

/**
 * 9. 退出登录
 */
export function logout() {
  return post('/kuzhai/tbuser/logout');
}

/**
 * 10. 设备分组列表
 */
export function deviceSortList() {
  return post('/kuzhai/userdevice/deviceSortList');
}

/**
    11. 查询用户已有分类信息
 */
export function querySortInfo() {
  return post('/kuzhai/userdevice/querySortInfo');
}

/**
 * 12. 查询所有用户设备
 */
export function userAllDevicesList() {
  return post('/kuzhai/userdevice/userAllDevicesList');
}

/**
 * 13. 授权设备
 */
export function shareDevice(options) {
  return post('/kuzhai/userdevice/shareDevice', options);
}

/**
 * 14. 充值套餐列表
 */
export function rechargePackageList(options) {
  return post('/goods/rechargepackage/list', options);
}

/**
 * 15. step1: 创建订单
 */
export function createOrder(options) {
  return post('/pay/order/createOrder', options);
}

/**
 * 16. step2: 提交订单
 */
export function submitOrder(options) {
  return post('/pay/wx/code/jlwxCrtOrder', options);
}

/**
 * 17. 获取二维码
 */
export function getQrCode(options) {
  return post('/pay/wx/code/qrCode', options, {
    responseType: 'arraybuffer',
  });
}

/**
 * 18. 查询支付结果
 */
export function payResult(options) {
  return post('/pay/wx/code/payResult', options);
}

/**
 * 19. 获取短信验证码
 */
export function getVCode(options) {
  return post('/kuzhai/tbuser/userPhoneRegisterMessageCode', options);
}
