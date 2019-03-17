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

// 路由守卫，检测是否登录
router.beforeEach((to, from, next) => {
  // 若是前往登录与注册页面
  if (to.path === '/login' || to.path === '/register') {
    next()
  } else {
    // 若未登录，前往登录页面
    if (store.getters.getUser === null) {
      console.log(store.getters.getUser)
      next('/login')
    } else { // 若已登录，跳转至目标地址
      next()
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
