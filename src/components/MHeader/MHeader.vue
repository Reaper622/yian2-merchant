<template>
  <div class="header">
    <span class="title">{{title}}</span>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    // 传入的标题
    title: {
      type: String
    },
    // 是否可返回
    isBack: {
      type: Boolean
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~@/assets/styles/varibles.styl'
  .header
    line-height $headerHeight
    background $bgColor
    color #ffffff
    height $headerHeight
    text-align center
  .title
    font-size 0.48rem
    width 0.96rem
</style>
