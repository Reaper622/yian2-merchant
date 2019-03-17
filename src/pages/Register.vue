<template>
  <div class="wrapper">
    <m-header :title="'欢迎注册易安账号（商家）'"></m-header>
    <div class="logo-wrapper">
      <img class="logo" src="@/assets/images/longLogo.png" alt="gg">
    </div>
    <div class="input-wrapper">
      <input class="input" v-model="list.uid" type="text" placeholder="输入邮箱地址作为账号" @blur="checkEmail">
      <input class="input" v-model="list.psw" type="password" placeholder="请设置密码(6-16位)" @blur="checkPsw">
      <input class="input" v-model="list.rePsw" type="password" placeholder="请确认密码" @blur="checkRePsw">
      <input class="input code-input" v-model="list.authCode" type="text" placeholder="请输入验证码">
      <div class="code" @click="flag && sendCode()" ref="text">点击获取验证码</div>
    </div>
    <div class="login-button" @click="sendInfo">注册</div>
    <!-- <div class="footer-info">
      <span>注册即同意</span>
      <span class="color-text">《易安兼职使用协议》</span>
      <span>&</span>
      <span class="color-text">《隐私权条款》</span>
    </div> -->
    <div class="footer-info">
      <span>已有账号？</span>
      <router-link to="/login">
        <span class="color-text underline-text">立即登录</span>
      </router-link>
    </div>
    <div class="school">看看哪些高校在使用易安兼职？</div>
  </div>
</template>

<script>
import qs from 'qs'
import MHeader from '@/components/MHeader/MHeader'
export default {
  name: 'Register',
  data () {
    return {
      list: {
        uid: '',
        psw: '',
        rePsw: '',
        authCode: ''
      },
      flag: true
    }
  },
  components: {
    MHeader
  },
  methods: {
    sendInfo () {
      if (this.list.uid && this.list.psw && this.list.rePsw && this.list.authCode) {
        console.log(this.list)
        this.$axios.post('/merchant/account/register.do', qs.stringify({
          uid: this.list.uid,
          pwd: this.list.psw,
          authCode: this.list.authCode
        }))
          .then(this.sendInfoSucc)
      } else {
        this.$layer.closeAll()
        this.$layer.msg('请完善注册信息')
      }
    },
    sendInfoSucc (res) {
      if (res.data.status === 2000) {
        this.$layer.closeAll()
        this.$layer.msg(res.data.msg)
      } else if (res.data.status === 4001) {
        this.$layer.closeAll()
        this.$layer.msg(res.data.msg)
      } else {
        console.log(res)
      }
    },
    time () {
      this.flag = false
      clearInterval(this.timer)
      let _this = this
      let wait = 59
      if (wait === 0) {
        this.$refs.text.innerText = '点击获取验证码'
        wait = 59
      } else {
        this.timer = setInterval(function () {
          _this.$refs.text.innerText = wait + '秒后再次获取'
          wait--
          if (wait === 0) {
            _this.flag = true
            _this.$refs.text.innerText = '点击获取验证码'
            clearInterval(_this.timer)
          }
        }, 1000)
      }
    },
    sendCode () {
      let email = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g// eslint-disable-line
      if (email.test(this.list.uid)) {
        this.time()
        this.$axios.post('/email/register.do', qs.stringify({
          emailAddress: this.list.uid
        }))
          .then((res) => {
            if (res.data.status === 1) {
              this.$layer.closeAll()
              this.$layer.msg(res.data.msg)
            }
          })
      } else {
        this.$layer.closeAll()
        this.$layer.msg('请输入正确的邮箱')
        return false
      }
    },
    checkEmail () {
      if (this.list.uid) {
        let email = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g// eslint-disable-line
        if (email.test(this.list.uid)) {
          this.$axios.post('/merchant/account/checkAccountIsExist.do', qs.stringify({
            uid: this.list.uid
          }))
            .then((res) => {
              if (res.data.status === 4003) {
                this.$layer.closeAll()
                this.$layer.msg(res.data.msg)
              }
            })
          return true
        } else {
          this.$layer.closeAll()
          this.$layer.msg('账号不符合规则')
          return false
        }
      } else {
        return false
      }
    },
    checkPsw () {
      if (this.list.psw) {
        if (this.list.psw.length < 6) {
          this.$layer.closeAll()
          this.$layer.msg('密码不能少于6位')
          return false
        }
        if (this.list.psw.length > 16) {
          this.$layer.closeAll()
          this.$layer.msg('密码不能多于16位')
          return false
        }
        return true
      }
    },
    checkRePsw () {
      if (this.list.psw !== '' && this.list.rePsw != '' && this.list.rePsw !== this.list.psw) {// eslint-disable-line
        this.$layer.closeAll()
        this.$layer.msg('两次密码输入不一致')
        return false
      }
    }
  },
  mounted () {

  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/varibles'
  input::-webkit-input-placeholder
    color $color-input-grey
  input::-moz-placeholder  /* Mozilla Firefox 19+ */
    color $color-input-grey
  input:-moz-placeholder   /* Mozilla Firefox 4 to 18 */
    color $color-input-grey
  input:-ms-input-placeholder  /* Internet Explorer 10-11 */
    color $color-input-grey
  .logo-wrapper
    display flex
    justify-content center
    margin-top 1rem
    margin-bottom 1rem
    .logo
      width auto
      height 1.5rem
  .input-wrapper
    display: flex
    flex-direction: column
    .input
      border-bottom: .02rem solid #CECECE
      padding: .2rem
      margin: .4rem
      margin-top: .15rem
    .code
      color $color-theme
      text-decoration underline
      text-align center
      padding-right .2rem
  .login-button
    margin: .4rem
    margin-top: .6rem
    color: #ffffff
    background-color $color-theme
    height .8rem
    line-height .8rem
    text-align center
    border-radius .1rem
  .footer-info
    display flex
    justify-content center
    margin-top .5rem
    font-size $font-size-small-x
    .color-text
      color $color-theme
      font-size $font-size-small-x
    .underline-text
      text-decoration underline
  .school
    font-size $font-size-small-x
    text-align center
    margin-top 1.2rem
    color $color-input-grey-d
  #trigger1
    display none
</style>
