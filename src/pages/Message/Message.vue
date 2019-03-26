<template>
  <div>
    <m-header :title="'我的消息'"></m-header>
    <img src="@/assets/images/message.png" class="banner">
    <div class="content">
      <message-list></message-list>
    </div>
  </div>
</template>

<script>
import MHeader from '@/components/MHeader/MHeader'
import MessageList from '@/components/MessageList/MessageList'
export default {
  name: 'Message',
  components: {
    MHeader,
    MessageList
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/varibles'
  .banner
    display block
    width 100%
    height 2.82rem
    margin-top .1rem
    margin-bottom .14rem
  .content
    height  auto
    padding-bottom $tabbarHeight
</style>
