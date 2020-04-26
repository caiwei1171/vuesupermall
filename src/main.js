import Vue from 'vue'
import App from './App.vue'
import router from "./router/index.js"
import store from "./store/index.js"

import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
  loading:require('./assets/images/common/placeholder.png')
})
import FastClick from 'fastclick'
// 解决移动端300ms延时
FastClick.attach(document.body);

import toast from '@/components/common/toast/index.js'
// 安装toast插件
Vue.use(toast)

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue();

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
