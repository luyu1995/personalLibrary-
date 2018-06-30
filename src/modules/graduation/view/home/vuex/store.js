import Vue from "vue";
import Vuex from "vuex";
//https://vuex.vuejs.org/zh-cn/api.html
Vue.use(Vuex);
const store = new Vuex.Store({

  state: {
    userInfo: {}
  },
  mutations: {
    setUserInfo: function (state, userInfo) {
      state.userInfo = userInfo
    }
  }
})
export default store;
