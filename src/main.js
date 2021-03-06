// main.js 程序入口文件，项目中所有页面都会加载它，可初始化vue实例

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'reset-css'
import '@/vantui'
// 引入工具集
import utils from './utils'

Vue.config.productionTip = false
// 注册工具集
Vue.prototype.utils = utils

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.filter("RMBformat",val=>{
  return "￥ "+Number(val).toFixed(2)+" 元"
})