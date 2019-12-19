import '@/assets/styles/utils.css';

import Vue from 'vue';
import VConsole from 'vconsole';
import App from './App.vue';
import router from './router';
import store from './store';
import './vantComponent';
import '@/assets/styles/override.scss';

// const vConsole = new VConsole();
window.Vue = Vue;
window.router = router;
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
