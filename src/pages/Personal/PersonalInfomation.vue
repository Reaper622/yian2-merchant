<template>
  <div class="wrapper">
    <m-header
    :title="'我的个人信息'"
    :isBack="true"></m-header>
    <div class="content">
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
    </div>
    <transition name="bounce">
      <div class="AvatarSelector" v-show="avatarChange">
        <swiper :options="swiperOption" class="swiper-container">
            <swiper-slide class="avatar-slide" v-for="(arr, index) in avatarList" :key="index">
              <img class="avaImg" v-for="(avatar, index) in arr" :key="index" :src="avatar.icon" @click="selectAvatar(avatar)">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
          <img v-for="(item,index) in avatarList" :key="index" :src="item.icon" @click="selectAvatar(item)" >
        <img :src="selectedAvatar.icon" class="selectedAvatar">
        <div class="selectBtn" @click="applyNewAvatar(selectedAvatar)">确 认 选 择</div>
      </div>
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
      avatarChange: false,
      avatarList: [],
      selectedAvatar: {},
      swiperOption: {
        direction: 'horizontal',
        speed: 300,
        pageination: {
          el: '.swiper-pagination'
        }
      }
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
    // 获取头像信息
    getAvatarList () {
      this.$axios.get('http://www.equator8848.xyz:8080/yian2/common/account/getIconList.do')
        .then(res => {
          if (res.data.status === 1) {
            this.avatarList = this.splitAvatarList(res.data.data.list, 6)
            console.log(this.avatarList)
            console.log(res.data.data.list)
          } else {
            this.$layer.closeAll()
            this.$layer.msg(res.data.msg)
          }
        })
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
    },
    // 选择头像
    selectAvatar (avatar) {
      this.selectedAvatar = avatar
    },
    // 确认更改头像
    applyNewAvatar (avatar) {
      this.$axios.post('/merchant/account/updateUserIcon.do', qs.stringify({
        iconNum: avatar.id
      }))
        .then(res => {
          if (res.data.status === 2000) {
            this.$layer.closeAll()
            this.$layer.msg(res.data.msg)
            this.icon = avatar.icon
            this.avatarChange = false
          }
        })
    },
    // 将头像数组拆分为6个一组
    splitAvatarList (arr, len) {
      var result = []
      for (var i = 0; i < arr.length; i += len) {
        result.push(arr.slice(i, i + len))
      }
      return result
    }
  },
  beforeMount () {
    this.getInfomation()
    this.getAvatarList()
  },
  mounted () {
  }
}
</script>

<style lang="stylus" scoped>
  @import '~@/assets/styles/varibles'
  .content
    height auto
    padding-bottom $tabbarHeight
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
    height 8.5rem
    margin 1rem 10% 0
    background #fff
    z-index 101
    border 5px solid $color-theme
    border-radius .2rem
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
  .swiper-container
    width 100%
    height 4.5rem
    .avatar-slide
      height 4rem
      width 100%
      display grid
      grid-template-columns 30% 30% 30%
      justify-content space-around
      .avaImg
        width 100%
        height auto
  .selectedAvatar
    width 25%
    height auto
    margin .2rem 37.5% 0
  .selectBtn
    width 90%
    height 1rem
    line-height 1rem
    margin .5rem 5%
    text-align center
    background $color-success
    color $color-text
</style>
