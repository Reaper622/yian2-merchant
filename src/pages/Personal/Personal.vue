<template>
  <div class="bgwrapper">
    <m-header
    :title="'个人中心'"
    :isBack="true"></m-header>
    <div class="logoContainer">
      <div class="logo" :style="{backgroundImage:'url('+ require('@/assets/images/longLogo.png') +')'}">
        <img src="" alt="">
      </div>
      <div class="avatar-box">
        <img :src="avatarLink" class="avatar" />
      </div>
    </div>
    <div class="thewrapper">
      <div class="item border-bottom">
        <router-link to="/personal/personalinfomation">
          <div>
            个人信息
            <img class="mini-image" src="@/assets/images/1.png">
          </div>
        </router-link>
      </div>
      <div class="item border-bottom">
        <router-link to="/personal/resetpsw">
          <div>
            账号安全
            <img class="mini-image" src="@/assets/images/password.png">
          </div>
        </router-link>
      </div>
      <div class="item item-margin-bottom">
        <router-link to="/personal/identification">
          <div>
            认证信息
            <img class="mini-image2" src="@/assets/images/2.png">
          </div>
        </router-link>
      </div>
      <div class="item border-bottom">
        <router-link to="/parttimejob/myparttimejob">
          <div>
            我的兼职
            <img class="mini-image2" src="@/assets/images/3.png">
          </div>
        </router-link>
      </div>
      <div class="item border-bottom item-margin-bottom">
        <router-link to="/evaluation">
          <div>
            我的评价
            <img class="mini-image2" src="@/assets/images/5.png">
          </div>
        </router-link>
      </div>
      <div class="item">
        <router-link to="/personal/contact">
          <div>
            评价与反馈
            <img class="mini-image2" src="@/assets/images/6.png">
          </div>
        </router-link>
      </div>
      <div class="item logout" @click="logOut">注 销 登 录</div>
    </div>
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
    logOut () {
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
              this.$store.commit('logoutState', null)
            }
          })
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/varibles.styl'
    .logoContainer
      display flex
      margin .5rem .26rem .36rem
      background-color #ffffff
      padding .8rem .4rem
      border-radius .24rem
      .logo
        flex-grow 7
        background-repeat no-repeat
        background-size 100% 100%
        -moz-background-size 100% 100%
        height 1rem
      .avatar-box
        flex-grow 3
        height 1rem
        // background grey
        position relative
        .avatar
          position absolute
          left .4rem
          top -0.3rem
          width 1.6rem
          height 1.6rem
          border-radius .9rem
          background-color #FFE1F1
    .thewrapper
      display flex
      flex-direction column
      justify-content center
      // text-align center
      // a
      //   color black
      .item
        position relative
        padding .3rem 0 .3rem 1.4rem
        background #ffffff
        .mini-image
          position absolute
          left 0.44rem
          bottom .2rem
          width .44rem
          height .48rem
        .mini-image2
          position absolute
          left 0.44rem
          bottom .22rem
          width .44rem
          height .44rem
      .item-margin-bottom
        margin-bottom .3rem
      .logout
        margin-top .7rem
        padding .3rem 0
        text-align center
        color $color-danger
        font-weight bold
</style>
