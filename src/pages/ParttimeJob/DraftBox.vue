<template>
  <div class="wrapper">
    <m-header
    :title="'兼职草稿箱'"
    :isBack="true"></m-header>
    <div class="draft">
      <p class="draft-title">兼职标题</p>
      <span class="draft-last-modify">最后修改时间</span>
    </div>
  </div>
</template>

<script>
// import qs from 'qs'
import MHeader from '@/components/MHeader/MHeader'
export default {
  name: 'DraftBox',
  components: {
    MHeader
  },
  data () {
    return {
      drafts: []
    }
  },
  methods: {
    getDrafts (index) {
      this.$axios.post('job/getJobsByStatus.do', {
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~@/assets/styles/varibles.styl'
  .draft
    position relative
    width 90%
    height 1.2rem
    background $color-theme
    margin .2rem 5%
    padding-top .1rem
    border-radius .1rem
    .draft-title
      font-size $font-size-large-x
      text-align center
      color $color-text
    .draft-last-modify
      position absolute
      font-size $font-size-medium
      color $color-text-ll
      right .4rem
      bottom 0
</style>
