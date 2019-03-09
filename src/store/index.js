import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default () => {
  return new Vuex.Store({
    state: {
      // 用户信息
      user: {},
      // 兼职类型
      jobTypeList: []
    },
    mutations: {
      // 登录存储
      loginState (state, user) { // 第一个参数为state，第二个为传递的参数
        // 用sessionStorage存储登录userId可防止用户刷新后state内登录态清空
        window.sessionStorage.setItem('uid', user.uid)
        window.sessionStorage.setItem('user', JSON.stringify(user))
        state.user = user
      },
      // 注销删除
      logoutState (state) { // 第一个参数为state，第二个为传递的参数
        // 删除sessionStorage内存储的userId
        window.sessionStorage.removeItem('uid')
        state.user = null
      },
      userState (state, user) {
        state.user = user
      },
      jobTypeList (state, list) {
        window.sessionStorage.setItem('jobTypeList', JSON.stringify(list))
        state.jobTypeList = list
      }
    },
    getters: {
      getUser (state) {
        if (!state.user.uid) {
          return JSON.parse(window.sessionStorage.getItem('user'))
        }
        return state.user
      },
      getJobTypeList (state) {
        if (!state.jobTypeList[0]) {
          return JSON.parse(window.sessionStorage.getItem('jobTypeList'))
        }
        return state.jobTypeList
      }
    }
  })
}
