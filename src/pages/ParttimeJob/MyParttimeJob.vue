<template>
  <div class="wrapper">
    <m-header
    :title="'我的兼职'"
    :isBack="true"></m-header>
    <floding-board
    :title="'未通过兼职'"></floding-board>
  </div>
</template>

<script>
import MHeader from '@/components/MHeader/MHeader'
import FlodingBoard from '@/components/FlodingBoard/FlodingBoard'
export default {
  name: 'MyParttimeJob',
  data () {
    return {
    }
  },
  components: {
    MHeader,
    FlodingBoard
  }
}
</script>

<style lang="stylus" scoped>
  @import '~@/assets/styles/varibles'
</style>
