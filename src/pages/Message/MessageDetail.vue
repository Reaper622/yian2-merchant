<template>
  <!-- <transition name="slide"> -->
    <div class="wrapper">
      <m-header :title="'消息详情'" isBack="true"></m-header>
      <div class="title">{{msgTitle}}</div>
      <div class="border-wrapper">
        <div class="content">{{content}}</div>
        <div class="push-time">{{pushTime}}</div>
      </div>
    </div>
  <!-- </transition> -->
</template>

<script>
import qs from 'qs'
import MHeader from '@/components/MHeader/MHeader'
export default {
  name: 'MessageDetail',
  components: {
    MHeader
  },
  data () {
    return {
      msgTitle: '',
      pushTime: '',
      content: ''
    }
  },
  methods: {
    getMessageDetail () {
      this.$axios.post('/message/getMessage.do', qs.stringify({
        messageId: this.$route.params.messageId
      }))
        .then((res) => {
          console.log(res)
          this.getDetailsucc(res)
        })
    },
    getDetailsucc (res) {
      this.content = res.data.data.content
      this.msgTitle = res.data.data.msgTitle
      this.pushTime = res.data.data.pushTime
    }
  },
  mounted () {
    this.getMessageDetail()
  }
}
</script>

<style lang="stylus" scoped>
  @import '~@/assets/styles/varibles'
  // .slide-enter-active, .slide-leave-active
  //   transition: all 0.3s ease
  // .slide-enter, .slide-leave-to
  //   transform: translate3d(100%, 0, 0)
  .wrapper
    margin 0 0
    .title
      margin .3rem .2rem
      background #ffffff
      line-height .86rem
      text-align center
      border-radius .2rem
    .border-wrapper
      border-radius .2rem
      overflow hidden
      margin 0 .2rem
    .content
      font-size .28rem
      background-color #ffffff
      padding .6rem .4rem
      line-height .36rem
    .push-time
      font-size .28rem
      text-align right
      background-color #ffffff
      padding 0 .4rem .6rem
      line-height .36rem
</style>
