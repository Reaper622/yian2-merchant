<template>
  <div class="wrapper">
    <div class="tab">
      <router-link tag="div" class="tab-item" to="/home">
        <span class="tab-title">首页</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/message">
        <span class="tab-title">消息</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/personal">
        <span class="tab-title">个人中心</span>
      </router-link>
    </div>

  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
  @import "~@/assets/styles/varibles.styl"
  .wrapper
    position fixed
    bottom 0
    width 100%
    height $tabbarHeight
    background #fff
    .tab
      display flex
      height .88rem
      line-height .88rem
      font-size $font-size-medium
      .tab-item
        flex 1
        text-align center
        .tab-title
          padding-bottom 5px
        //&为stylus提供的父级选择器
        &.router-link-active
          .tab-title
            color $color-theme
            border-bottom 2px solid $color-theme
</style>
