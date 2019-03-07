<template>
  <div class="wrapper">
    <m-header
    :title="'联系与反馈'"
    :isBack="true"></m-header>
    <div class="board border">告示</div>
    <div class="feedback">
      <textarea id="feedbackContent" placeholder="这里填写反馈内容" maxlength="50" v-model="content"></textarea>
    </div>
    <div class="submit" @click="feedback">提交</div>

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
    }
  }

}
</script>

<style lang="stylus" scoped>
  @import '~@/assets/styles/varibles'
  .board
    width 95%
    height 3rem
    margin 1rem 2.5%
    border 1px solid #888
  .feedback
    width 95%
    height 3rem
    margin .2rem 2.5%
    box-sizing border-box
    border .05rem solid $color-theme
    #feedbackContent
      width 100%
      height 100%
  .submit
    width 90%
    margin 1.5rem 5% 0
    height 1rem
    line-height 1rem
    text-align center
    color $color-text
    background $color-theme
</style>
