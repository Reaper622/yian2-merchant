<template>
  <div class="wrapper">
    <m-header
    :title="'账号安全-修改密码'"
    :isBack="true"></m-header>
    <div class="input-wrapper">
      <input class="pswInput" type="password" placeholder="旧密码" v-model="oldPsw">
      <input class="pswInput" type="password" placeholder="新密码" v-model="newPsw" @blur="checkPsw">
      <input class="pswInput" type="password" placeholder="确认密码" v-model="rePsw" @blur="checkRePsw">
    </div>
    <input type="text" class="authCodeInput" placeholder="输入验证码" v-model="authCode">
    <div class="getAuthCode" @click="getAuthCode">获取验证码</div>
    <div class="reset">确认修改</div>
  </div>
</template>

<script>
import qs from 'qs'
import MHeader from '@/components/MHeader/MHeader'
export default {
  name: 'ResetPsw',
  components: {
    MHeader
  },
  data () {
    return {
      oldPsw: '',
      newPsw: '',
      rePsw: '',
      authCode: ''
    }
  },
  methods: {
    // 检查新密码
    checkPsw () {
      if (this.newPsw) {
        if (this.newPsw.length < 6) {
          this.$layer.closeAll()
          this.$layer.msg('密码不能少于6位')
          return false
        }
        if (this.newPsw.length > 16) {
          this.$layer.closeAll()
          this.$layer.msg('密码不能多于16位')
          return false
        }
        return true
      }
    },
    // 检查确认密码
    checkRePsw () {
      if (this.newPsw !== this.rePsw) {
        this.$layer.closeAll()
        this.$layer.msg('两次密码不一致')
        return false
      } else {
        return true
      }
    },
    // 获取验证码
    getAuthCode () {
      this.$axios.post('/email/changePsw.do', qs.stringify({
        emailAddress: this.$store.getters.getUser.uid
      }))
        .then(res => {
          if (res.data.status === 1) {
            this.$layer.closeAll()
            this.$layer.msg(res.data.msg)
          } else {
            this.$layer.closeAll()
            this.$layer.msg(res.data.msg)
          }
        })
    },
    // 提交修改
    reset () {
      if (this.checkPsw() && this.checkRePsw() && this.oldPsw && this.authCode) {
        this.$axios.post('/merchant/account/changePsw.do', qs.stringify({
          oldPsw: this.oldPsw,
          newPsw: this.newPsw,
          authCode: this.authCode
        }))
          .then(res => {
            if (status === 2000) {
              this.$layer.closeAll()
              this.$layer.msg('修改成功')
              // 修改后跳转到登录页面
              setTimeout(() => {
                this.$router.replace('/login')
              }, 1000)
            } else {
              this.$layer.closeAll()
              this.$layer.msg(res.data.msg)
            }
          })
      } else {
        this.$layer.closeAll()
        this.$layer.msg('请检查内容是否填写完毕')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~@/assets/styles/varibles'
  .input-wrapper
    margin-top 1.5rem
    display flex
    flex-direction column
    .pswInput
      border-bottom .02rem solid #CECECE
      padding .2rem
      margin .4rem
      margin-top .6rem
      font-size $font-size-medium
  .authCodeInput
    width 3rem
    border-bottom .02rem solid #CECECE
    padding .2rem
    margin .4rem
    margin-top .6rem
    font-size $font-size-medium
  .getAuthCode
    display inline-block
    width 2rem
    height .8rem
    background $color-theme-light
    text-align center
    line-height .8rem
    margin-left .5rem
    color $color-text
    border-radius .1rem
  .reset
    width 90%
    margin 1rem 5%
    height 1rem
    background $color-theme
    line-height 1rem
    text-align center
    color $color-text
</style>
