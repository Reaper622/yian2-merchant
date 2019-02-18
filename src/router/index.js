import Vue from 'vue'
import Router from 'vue-router'
// 一级路由
import Login from '@/pages/Login'
import Home from '@/pages/Home'
import Register from '@/pages/Register'

// 二级路由
import Publish from '@/pages/ParttimeJob/Publish'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/parttimejob/publish',
      name: 'Publish',
      component: Publish
    }
  ]
})
