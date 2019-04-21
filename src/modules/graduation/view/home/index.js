import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import routes from './router'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import store from './vuex/store'
import vueCookie from 'vue-cookie'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import IScrollView from 'vue-iscroll-view'
import IScroll from 'iscroll'
import echarts from 'echarts'

import {getUserInfo} from "../../../../utils/request";
Vue.use(IScrollView, IScroll)
Vue.use(ElementUI, { locale })
Vue.use(vueCookie)
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false
const router = new VueRouter({
  mode: 'hash',
  routes
})

Vue.use(Vuex)

Vue.use(VueRouter)

window.router = router
const bus = new Vue({
  store,
  router
})
window.bus = bus
/*router.beforeEach(async(to, from, next) => {
  if(
!window.bus
)
{
  window.bus = new Vue(
    {
      router,
      store,
    }
  );

}
let userInfo = await
getUserInfo();
if (userInfo) {
  bus.$store.commit('setUserInfo', userInfo)
} else {
  next();
}
next()
})*/
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
