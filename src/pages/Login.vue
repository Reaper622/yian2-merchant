<template>
  <div class="wrapper">
    <div class="header-info">
      <router-link to="/register">
        <div class="info">注册</div>
      </router-link>
    </div>
    <div class="logo-wrapper">
      <img class="logo" src="@/assets/images/longLogo.png" alt="gg">
    </div>
    <div class="input-wrapper">
      <input class="input" type="text" placeholder="用户邮箱" v-model="list.uid">
      <input class="input" type="password" placeholder="请填写密码" v-model="list.psw">
      <div class="isRememberPsw">
        <span class="checkbox-title">记住密码</span>
        <input v-model="isRememberPsw" @click="checkCheckboxValue" id="color-input-blue" class="chat-button-location-radio-input" type="checkbox" name="color-input-blue"/>
        <label for="color-input-blue"></label>
      </div>
    </div>
    <div class="login-button" @click="sendInfo">登录</div>
    <div class="footer-info">
      <span>登录即同意</span>
      <span class="color-text">《易安兼职使用协议》</span>
      <span>&</span>
      <span class="color-text">《隐私权条款》</span>
    </div>
    <div class="footer-info">
      <span>还没账号？</span>
      <router-link to="/register">
        <span class="color-text font-underline">立即注册</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: 'Login',
  data () {
    return {
      list: {
        uid: '',
        psw: ''
      },
      isRememberPsw: false
    }
  },
  methods: {
    sendInfo () {
      let email = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g// eslint-disable-line
      if (this.list.uid === '' || this.list.psw === '') {
        this.$layer.closeAll()
        this.$layer.msg('账号/密码不能为空')
      } else if (email.test(this.list.uid)) {
        console.log(this.isRememberPsw)// 记住密码
        if (this.isRememberPsw) {
          this.savePsw()
        }
        this.$axios.post('/merchant/account/login.do', qs.stringify({
          uid: this.list.uid,
          psw: this.list.psw
        }))
          .then(this.sendInfoSucc)
      } else {
        this.$layer.closeAll()
        this.$layer.msg('账号有误')
      }
    },
    sendInfoSucc (res) {
      if (res.data.status === 2000) {
        this.$layer.closeAll()
        this.$layer.msg('登录成功')
        // 向Vuex中存储用户信息
        this.$store.commit('loginState', res.data.data)
        this.$router.replace('/home')
      } else {
        this.$layer.closeAll()
        this.$layer.msg(res.data.msg)
      }
    },
    savePsw () {
      window.localStorage.setItem('isSave', this.isRememberPsw)
      window.localStorage.setItem('uid', this.list.uid)
      window.localStorage.setItem('psw', this.list.psw)
    },
    checkCheckboxValue () {
      console.log(this.isRememberPsw)
    }
  },
  mounted () {
    this.isRememberPsw = window.localStorage.getItem('isSave')
    if (this.isRememberPsw) {
      this.list.uid = window.localStorage.getItem('uid')
      this.list.psw = window.localStorage.getItem('psw')
    } else {
      this.list.uid = ''
      this.list.psw = ''
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/varibles.styl'
  input::-webkit-input-placeholder{
    color: $color-input-grey
  }
  input::-moz-placeholder{   /* Mozilla Firefox 19+ */
    color: $color-input-grey
  }
  input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    color: $color-input-grey
  }
  input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
    color: $color-input-grey
  }
  .header-info
    display flex
    justify-content flex-end
    .info
      margin .3rem
  .logo-wrapper
    display flex
    justify-content center
    margin-top 1rem
    margin-bottom 1rem
    .logo
      width auto
      height 1.5rem
  .input-wrapper
    display flex
    flex-direction column
    .input
      border-bottom .02rem solid #CECECE
      padding .2rem
      margin .4rem
      margin-top .6rem
      font-size $font-size-medium
    .isRememberPsw
      margin-top .1rem
      display flex
      justify-content center
      .checkbox-title
        color $color-input-grey
      #color-input-blue +label{
        display block
        width .28rem
        height .28rem
        cursor pointer
        background #ffffff
        border-radius .08rem
        border .02rem solid #CECECE
      }
      #color-input-blue:checked +label::before{
        display block
        content "\2714"
        text-align center
        color $color-theme
      }
      input[type=checkbox]{
        visibility: hidden
      }
  .login-button
    margin .4rem
    margin-top .6rem
    color #ffffff
    background-color $color-theme
    height .8rem
    line-height .8rem
    text-align center
    border-radius .1rem
  .footer-info
    display flex
    justify-content center
    margin-top 1rem
    font-size $font-size-small-x
    .color-text
      color $color-theme
    .font-underline
      text-decoration underline
</style>
