import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
  },
  {
    path: '/add-way',
    name: 'add-way',
    component: () => import('@/views/device-add/add-way'),
  },
  {
    path: '/by-wifi',
    name: 'by-wifi',
    component: () => import('@/views/device-add/by-wifi'),
  },
  {
    path: '/wifi-link',
    name: 'wifi-link',
    component: () => import('@/views/device-add/wifi-link'),
  },
  {
    path: '/wifi-fail',
    name: 'wifi-fail',
    component: () => import('@/views/device-add/wifi-fail'),
  },
  {
    path: '/device-info-input',
    name: 'device-info-input',
    component: () => import('@/views/device-add/device-info-input'),
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/views/auth-page/auth'),
  },
  {
    path: '/device-list',
    name: 'device-list',
    component: () => import('@/views/device/device-list'),
  },
  {
    path: '/device-edit',
    name: 'device-edit',
    component: () => import('@/views/device/device-edit'),
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: () => import('@/views/mine/feedback'),
  },
  {
    path: '/change-pwd',
    name: 'change-pwd',
    component: () => import('@/views/mine/change-pwd'),
  },
  {
    path: '/add-credit',
    name: 'add-credit',
    component: () => import('@/views/mine/add-credit'),
  },
  {
    path: '/index',
    name: 'index',
    redirect: '/index/home',
    component: () => import('@/views/index'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/main/home'),
      },
      {
        path: 'mine',
        name: 'mine',
        component: () => import('@/views/main/mine'),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});
router.beforeEach((to, from, next) => {
  // 判断是否localStorage中有token
  const token = localStorage.getItem('SI_TOKEN');
  if (to.name !== 'login' && !token) {
    // 跳转到登录页面进行登录
    next('/login');
  } else {
    next();
  }
});
export default router;
