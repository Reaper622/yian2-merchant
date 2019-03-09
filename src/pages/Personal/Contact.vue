<template>
  <div class="wrapper">
    <m-header
    :title="'联系与反馈'"
    :isBack="true"></m-header>
    <div class="board">
      <img src="@/assets/images/longLogo.png" >
      <div class="qqBtn" @click="addQQGroup">加入Q群</div>
    </div>
    <div class="feedback">
      <textarea id="feedbackContent" placeholder="快来反馈意见吧..." maxlength="200" v-model="content" ></textarea>
    </div>
    <div class="submit"  >提交</div>

  </div>
</template>

<script>
import MHeader from '@/components/MHeader/MHeader'
import qs from 'qs'
export default {
  name: 'Contact',
  components: {
    MHeader
  },
  data () {
    return {
      content: ''
    }
  },
  methods: {
    feedback () {
      // 发送反馈内容
      this.$axios.post('/feedback/addFeedback.do', qs.stringify({
        content: this.content
      }))
        .then(this.feedbackSuccess)
    },
    feedbackSuccess (res) {
      if (res.data.status === 1) {
        this.$layer.closeAll()
        this.$layer.msg(res.data.msg)
        this.$router.replace('/personal')
      } else {
        this.$layer.closeAll()
        this.$layer.msg(res.data.msg)
      }
    },
    // 加入Q群
    addQQGroup () {
      console.log('clicked')
      window.open('https://shang.qq.com/wpa/qunwpa?idkey=04894bd2d799339abfce331bfae0466dbf15e638367f71531db5065c2557ba4a', '_blank')
    }
  }

}
</script>

<style lang="stylus" scoped>
  @import '~@/assets/styles/varibles'
  .board
    width 95%
    height 2rem
    margin .5rem 2.5%
    background #fff
    border-radius .1rem
    img
      height 1rem
      width auto
      margin .5rem .1rem
    .qqBtn
      float right
      width 1.5rem
      text-align center
      height .8rem
      margin .6rem .5rem
      line-height .8rem
      background $color-theme
      color $color-text
      border-radius .1rem
  .feedback
    width 95%
    height 5rem
    margin .2rem 2.5%
    #feedbackContent
      width 100%
      height 5rem
      resize none
  .submit
    width 90%
    margin 1.5rem 5% 0
    height 1rem
    line-height 1rem
    text-align center
    color $color-text
    background $color-theme
</style>
