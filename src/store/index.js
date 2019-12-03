import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    addingDeviceInfo: {},
    deviceList: [],
  },
  mutations: {
    setAddingDeviceInfo(state, info) {
      state.addingDeviceInfo = info;
    },
    setDeviceList(state, list) {
      state.deviceList = list;
    },
  },
  actions: {},
  modules: {},
});
