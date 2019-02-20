// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import fasClick from 'fastclick'
import createStore from './store'
import Axios from 'axios'
// 引入reset.css
import '@/assets/styles/reset.css'
// 引入iconfont的通用样式
import '@/assets/styles/iconfontCommon.css'
// 引入VueAwesomeSwiper的样式
import 'swiper/dist/css/swiper.css'
// 引入弹出层
import layer from 'vue2-layer-mobile'
import '@/assets/styles/border.css'

Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper)
Vue.use(layer)
fasClick.attach(document.body)
// 创建一个Vuex Store对象
const store = createStore()

// 设置Axios默认请求头
Axios.defaults.baseURL = 'http://www.equator8848.xyz:8080/yian2'
// 设置Axios携带凭证Cookie
Axios.defaults.withCredentials = true
Vue.prototype.$axios = Axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
