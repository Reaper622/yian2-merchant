<template>
  <div class="wrapper">
    <m-header
    :title="'我的个人信息'"
    :isBack="true"></m-header>
    <div class="avatarArea">
      <img :src="this.icon" class="avatar">
      <div class="changeAvatarBtn" @click="toChangeAvatar(true)">修改头像</div>
    </div>
    <div class="infoArea">
      <input class="infoInput" type="text" placeholder="姓名" v-model="name">
      <input class="infoInput" type="text" placeholder="商户名称" v-model="unit">
      <input class="infoInput" type="text" placeholder="电话" v-model="phone">
      <input class="infoInput" type="text" placeholder="QQ" v-model="qQ">
      <input class="infoInput" type="text" placeholder="微信" v-model="wX">
    </div>
    <div class="btn" @click="checkInfo">保存</div>
    <div class="cover" v-show="avatarChange" @click="toChangeAvatar(false)"></div>
    <transition name="bounce">
      <div class="AvatarSelector" v-show="avatarChange"></div>
    </transition>
  </div>
</template>

<script>
import qs from 'qs'
import MHeader from '@/components/MHeader/MHeader'

export default {
  name: 'PersonalInfomation',
  components: {
    MHeader
  },
  data () {
    return {
      icon: '',
      unit: '',
      name: '',
      phone: '',
      qQ: '',
      wX: '',
      avatarChange: false
    }
  },
  methods: {
    // 获取 Vuex 中的数据
    getInfomation () {
      let user = this.$store.getters.getUser
      this.icon = user.icon
      this.name = user.name
      this.phone = user.phone
      this.unit = user.unit
      this.qQ = user.qQ
      this.wX = user.wX
    },
    // 检测信息
    checkInfo () {
      if (this.name && this.phone && this.unit && this.qQ && this.wX) {
        this.updateInfo()
      } else {
        this.$layer.closeAll()
        this.$layer.msg('输入有误，请检查')
      }
    },
    // 修改个人信息
    updateInfo () {
      this.$axios.post('/merchant/account/updateUserInfo.do', qs.stringify({
        name: this.name,
        unit: this.unit,
        phone: this.phone,
        WX: this.wX,
        QQ: this.qQ
      }))
        .then(res => {
          if (res.data.status === 2000) {
            this.$layer.closeAll()
            this.$layer.msg(res.data.msg)
            this.updateVuex()
          } else {
            this.$layer.closeAll()
            this.$layer.msg(res.data.msg)
          }
        })
    },
    // 存入Vuex信息
    updateVuex () {
      let user = this.$store.getters.getUser
      user.icon = this.icon
      user.name = this.name
      user.unit = this.unit
      user.phone = this.phone
      user.wX = this.wX
      user.qQ = this.qQ
      this.$store.commit('userState', user)
    },
    // 触发修改头像事件
    toChangeAvatar (bool) {
      this.avatarChange = bool
    }
  },
  mounted () {
    this.getInfomation()
  }
}
</script>

<style lang="stylus" scoped>
  @import '~@/assets/styles/varibles'
  .avatarArea
    width 100%
    height 3rem
    .avatar
      width 2rem
      height 2rem
      margin .5rem .5rem
    .changeAvatarBtn
      width 2rem
      height .6rem
      line-height .6rem
      background $color-success
      float right
      text-align center
      margin 1.2rem .5rem
      color $color-text
      border-radius .2rem
  .infoArea
    width 100%
    height auto
    display: flex
    flex-direction: column
    .infoInput
      border-bottom: .02rem solid #CECECE
      padding: .2rem
      margin: .4rem
      margin-top: .15rem
  .btn
    width 90%
    height 1rem
    line-height 1rem
    margin .5rem 5%
    text-align center
    background $color-theme
    color $color-text
    letter-spacing 1rem
    text-indent 1rem
    font-size $font-size-large
  .cover
    position absolute
    top 0
    width 100%
    height 100%
    background rgba(160, 160, 160, .5)
    z-index 100
  .AvatarSelector
    position absolute
    top 2rem
    width 80%
    height 8rem
    margin 1rem 10% 0
    background #fff
    z-index 101
  .bounce-enter-active
    animation bounce-in .5s
  .bounce-leave-active
    animation bounce-in .5s reverse
  @keyframes bounce-in
    0%
      transform scale(0)
    50%
      transform scale(1.2)
    100%
      transform scale(1)
</style>
