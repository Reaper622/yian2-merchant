<template>
  <div class="wrapper">
    <m-header
    :title="'个人中心'"
    :isBack="true"></m-header>
    <div class="avatarArea">
      <img :src="avatarLink" alt="头像" class="avatar">
    </div>
    <router-link to="/personal/personalinfomation"><div class="panel">个人信息</div></router-link>
    <router-link to="/personal/identification"><div class="panel">账号安全与认证</div></router-link>
    <router-link to="/evaluation"><div class="panel">我的评价</div></router-link>
    <router-link to="/personal/contact"><div class="panel">联系与反馈</div></router-link>
    <div class="loginOut" @click="loginOut">注销登录</div>
  </div>
</template>

<script>
import MHeader from '@/components/MHeader/MHeader'
export default {
  name: 'Personal',
  components: {
    MHeader
  },
  data () {
    return {
      avatarLink: ''
    }
  },
  mounted () {
    this.getAvatarLink()
  },
  methods: {
    // 获取用户头像
    getAvatarLink () {
      this.avatarLink = this.$store.getters.getUser.icon
    },
    // 注销
    loginOut () {
      // 弹框让用户确认是否注销
      this.$layer.closeAll()
      this.$layer.confirm('您确定要注销吗？', () => {
        // 确认注销后注销
        this.$axios.get('/common/account/logOut.do')
          .then(res => {
            if (res.data.status === 1) {
              this.$layer.closeAll()
              this.$layer.msg(res.data.msg)
              // 回到登录页面
              this.$router.replace('/login')
              // 清除Vuex中的用户数据
              this.$store.commit('userState', null)
            }
          })
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~@/assets/styles/varibles'
  .wrapper
    .avatarArea
      position relative
      width 100%
      height 3rem
      .avatar
        position absolute
        width 2rem
        height 2rem
        right .2rem
        top .5rem
    .panel
      width 100%
      height 1rem
      line-height 1rem
      text-align center
      color $color-text
      background $bgColor
      margin-bottom .2rem
    .loginOut
      width 100%
      height 1rem
      line-height 1rem
      text-align center
      color $color-text
      background $color-danger
      margin-top 2rem
</style>
