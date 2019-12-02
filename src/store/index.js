import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    addingDeviceInfo: {},
  },
  mutations: {
    setAddingDeviceInfo(state, info) {
      state.addingDeviceInfo = info;
    },
  },
  actions: {},
  modules: {},
});
