import Vue from 'vue'
import Router from 'vue-router'

// 一级路由
const Login = () => import('@/pages/Login')
const Home = () => import('@/pages/Home')
const Register = () => import('@/pages/Register')
const Personal = () => import('@/pages/Personal/Personal')
const Evaluation = () => import('@/pages/Evaluation/Evaluation')
const Message = () => import('@/pages/Message/Message')
// 二级路由
const Publish = () => import('@/pages/ParttimeJob/Publish')
const DraftBox = () => import('@/pages/ParttimeJob/DraftBox')
const DraftDetail = () => import('@/pages/ParttimeJob/DraftDetail')
const MyParttimeJob = () => import('@/pages/ParttimeJob/MyParttimeJob')
const Detail = () => import('@/pages/Detail/Detail')
const Identification = () => import('@/pages/Personal/Identification')
const ResetPsw = () => import('@/pages/Personal/ResetPsw')
const Contact = () => import('@/pages/Personal/Contact')
const PersonalInfomation = () => import('@/pages/Personal/PersonalInfomation')
const MessageDetail = () => import('@/pages/Message/MessageDetail')
// 三极路由
const StudentsInfo = () => import('@/pages/Detail/StudentsInfo')

// // 一级路由
// import Login from '@/pages/Login'
// import Home from '@/pages/Home'
// import Register from '@/pages/Register'
// import Personal from '@/pages/Personal/Personal'
// import Evaluation from '@/pages/Evaluation/Evaluation'
// import Message from '@/pages/Message/Message'

// // 二级路由
// import Publish from '@/pages/ParttimeJob/Publish'
// import DraftBox from '@/pages/ParttimeJob/DraftBox'
// import DraftDetail from '@/pages/ParttimeJob/DraftDetail'
// import MyParttimeJob from '@/pages/ParttimeJob/MyParttimeJob'
// import Detail from '@/pages/Detail/Detail'
// import Identification from '@/pages/Personal/Identification'
// import ResetPsw from '@/pages/Personal/ResetPsw'
// import Contact from '@/pages/Personal/Contact'
// import PersonalInfomation from '@/pages/Personal/PersonalInfomation'
// import MessageDetail from '@/pages/Message/MessageDetail'

// // 三级路由
// import StudentsInfo from '@/pages/Detail/StudentsInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
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
      path: '/message',
      name: 'Message',
      component: Message
    },
    {
      path: '/message/:messageId',
      name: 'MessageDetail',
      component: MessageDetail
    },
    {
      path: '/personal',
      name: 'Personal',
      component: Personal
    },
    {
      path: '/parttimejob/publish',
      name: 'Publish',
      component: Publish
    },
    {
      path: '/parttimejob/draftbox',
      name: 'DraftBox',
      component: DraftBox
    },
    {
      path: '/parttimejob/draftdetail/:id',
      name: 'DraftDetail',
      component: DraftDetail
    },
    {
      path: '/parttimejob/myparttimejob',
      name: 'MyParttimeJob',
      component: MyParttimeJob
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/detail/:id/studentsinfo/:status',
      name: 'StudentsInfo',
      component: StudentsInfo
    },
    {
      path: '/personal/identification',
      name: 'Identification',
      component: Identification
    },
    {
      path: '/personal/resetpsw',
      name: 'ResetPsw',
      component: ResetPsw
    },
    {
      path: '/personal/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/personal/personalinfomation',
      name: 'PersonalInfomation',
      component: PersonalInfomation
    },
    {
      path: '/evaluation',
      name: 'Evaluation',
      component: Evaluation
    }
  ]
})
