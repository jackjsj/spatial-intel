import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/demo',
  },
  {
    path: '/demo',
    name: 'demo',
    component: () => import('@/views/demo'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
