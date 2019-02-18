<template>
  <div class="wrapper">
    <div class="header-info">
      欢迎注册易安账号（商家）
    </div>
    <div class="input-wrapper">
      <input class="input" v-model="list.uid" type="text" placeholder="输入邮箱地址作为账号" @blur="checkEmail">
      <input class="input" v-model="list.ps" type="password" placeholder="请设置密码(6-16位)" @blur="checkPs">
      <input class="input" v-model="list.psw" type="password" placeholder="请确认密码" @blur="checkPsw">
      <input class="input code-input" v-model="list.authCode" type="text" placeholder="请输入验证码">
      <div class="code" @click="sendCode" ref="text">点击获取验证码</div>
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
export default {
  name: 'Register',
  data () {
    return {
      list: [{
        uid: '',
        ps: '',
        psw: '',
        authCode: '',
        userType: ''
      }]
    }
  },
  methods: {
    sendInfo () {
      if (this.list.uid && this.list.ps && this.list.psw && this.list.authCode && this.list.userType) {
        console.log(this.list)
        this.$axios.post('/account/register.do', qs.stringify({
          uid: this.list.uid,
          psw: this.list.psw,
          authCode: this.list.authCode,
          userType: this.list.userType
        }), {
          withCredentials: true
        })
          .then(this.sendInfoSucc)
      } else {
        this.$layer.closeAll()
        this.$layer.msg('输入框不能为空')
      }
    },
    sendInfoSucc (res) {
      console.log(res.data.msg)
      this.$layer.closeAll()
      this.$layer.msg(res.data.msg)
    },
    time () {
      let _this = this
      let wait = 60
      if (wait === 0) {
        this.$refs.text.innerText = '点击获取验证码'
        wait = 60
      } else {
        let s = setInterval(function () {
          _this.$refs.text.innerText = wait + '秒后再次获取'
          wait--
          if (wait === 0) {
            _this.$refs.text.innerText = '点击获取验证码'
            clearInterval(s)
          }
        }, 1000)
      }
    },
    sendCode () {
      let email = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g// eslint-disable-line
      if (email.test(this.list.uid)) {
        console.log(this.list.uid)
        this.time()
        this.$axios.post('/account/verificationEmail.do', qs.stringify({
          uid: this.list.uid,
          action: '0'
        }))
          .then((res) => {
            if (res.data.status === 1) {
              this.$layer.closeAll()
              this.$layer.msg(res.data.msg)
            }
          })
      } else {
        this.$layer.closeAll()
        this.$layer.msg('账号不符标准')
        return false
      }
    },
    checkEmail () {
      let email = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g// eslint-disable-line
      if (email.test(this.list.uid)) {
        this.$axios.post('/account/checkAccountIsExist.do', qs.stringify({
          uid: this.list.uid
        }))
          .then((res) => {
            this.$layer.closeAll()
            this.$layer.msg(res.data.msg)
          })
      } else {
        this.$layer.closeAll()
        this.$layer.msg('账号不符合规则')
        return false
      }
    },
    checkPs () {
      if (this.list.ps) {
        if (this.list.ps.length < 6 || this.list.ps.length > 16) {
          this.$layer.closeAll()
          this.$layer.msg('密码不符合规则')
          return false
        }
      }
    },
    checkPsw () {
      if (this.list.ps !== '' && this.list.psw != '' && this.list.psw !== this.list.ps) {// eslint-disable-line
        this.$layer.closeAll()
        this.$layer.msg('两次密码输入不一致')
        return false
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/varibles'
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
    padding .2rem 0
    margin-bottom .2rem
    background-color $color-theme
    text-align center
    color #ffffff
    font-size .3rem
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
</style>
