import axios from 'axios';
import { Toast } from 'vant';
import router from '@/router/';

const instance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  // baseURL: 'http://mj002.vipgz2.idcfengye.com/spaceIngelligent/kuzhai',
  baseURL: '/spaceIngelligent/kuzhai',
  timeout: 60000,
});
// 添加响应拦截器
instance.interceptors.response.use(
  response => {
    if (response.data.code === 401) {
      Toast(response.data.msg);
      router.push('/login');
    }
    return response.data;
  },
  error => Promise.reject(error),
);

export function post(uri, params, config) {
  return instance.post(uri, params, {
    headers: {
      token: localStorage.getItem('SI_TOKEN'),
    },
    ...config,
  });
}

export function get(uri, config) {
  return instance.get(uri, config);
}
