import crypto from 'crypto';
import { get, post } from './request';

const appsecret = 'BELXUApJ88AUPBCe2ipvzUBOxfTrSPiG';

/**
 * 1. 帐户登录
 */
export function login(params) {
  Object.assign(params, {
    nonce: 'asbsedwq',
    version: 8,
  });
  const buffer = Buffer.from(JSON.stringify(params), 'utf-8');
  const theSign = crypto
    .createHmac('sha256', appsecret)
    .update(buffer)
    .digest('base64');
  return post('/api/user/login', params, {
    headers: {
      Authorization: `Sign ${theSign}`,
    },
  });
}

/**
 * 2. 根据设备ID获取设备信息
 */
export function getDeviceById(params, at) {
  Object.assign(params, {
    nonce: 'asbsedwq',
    version: 8,
  });
  return get(`/api/user/device/${params.deviceid}`, {
    params,
    headers: {
      Authorization: `Bearer ${at}`,
    },
  });
}

/**
 * 3. 根据设备ID获取设备状态
 */
export function getDeviceStatus(params, at) {
  Object.assign(params, {
    nonce: 'asbsedwq',
    version: 8,
  });
  return get('/api/user/device/status', {
    params,
    headers: {
      Authorization: `Bearer ${at}`,
    },
  });
}

export function updateDeviceStatus(params, at) {
  Object.assign(params, {
    nonce: 'asbsedwq',
    version: 8,
  });
  return post('/api/user/device/status', params, {
    headers: {
      Authorization: `Bearer ${at}`,
    },
  });
}

export function addWifiDevice(params, at) {
  Object.assign(params, {
    nonce: 'asbsedwq',
    version: 8,
  });
  return post('/api/user/device/add', params, {
    headers: {
      Authorization: `Bearer ${at}`,
    },
  });
}
