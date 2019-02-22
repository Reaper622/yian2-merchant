<template>
  <div class="wrapper">
    <div :class="isclicked? 'boardAfterClick':'boardBeforeClick'" @click="clicked">
      <span class="titleText">
        {{this.title}}
      </span>
      <p :class="isclicked?'iconAfterClick':'iconBeforeClick'" >
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-right"></use>
        </svg>
      </p>
    </div>
    <transition name="slide-fade">
      <div class="contentArea" v-show="isclicked">
        <div class="contentItem" v-for="(item, index) in content" :key="index">
          <p class="contentTitle">{{item.jobSummary}}</p>
          <span class="contentTime">{{item.jobTime}}</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'FlodingBoard',
  data () {
    return {
      isclicked: false
    }
  },
  props: {
    // 传入标题头
    title: {
      type: String,
      required: true
    },
    // 内部展示内容数组
    content: {
      type: Array
    }
  },
  methods: {
    // 点击函数
    clicked () {
      this.isclicked = !this.isclicked
      // 触发点击事件
      this.$emit('beClicked')
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~@/assets/styles/varibles'
  .wrapper
    margin-top .2rem
  .boardBeforeClick
    width 100%
    height 1.2rem
    line-height 1.2rem
    background $color-info
    text-align center
    overflow hidden
    .iconBeforeClick
      width .5rem
      height .5rem
      float right
      right .2rem
      color $color-text
  .boardAfterClick
    width 100%
    height 1.2rem
    line-height 1.2rem
    background $color-theme
    text-align center
    overflow hidden
    .iconAfterClick
      width .5rem
      height .5rem
      float right
      right .2rem
      transform: rotate(90deg)
      transform-origin: center bottom
      color $color-text
  .titleText
    color $color-text
    font-size $font-size-large
  .contentItem
    position relative
    width 90%
    height 1.2rem
    background $color-theme-light
    margin .2rem 5%
    padding-top .1rem
    border-radius .1rem
    .contentTitle
      font-size $font-size-large-x
      text-align center
      color $color-text
    .contentTime
      position absolute
      font-size $font-size-medium
      color $color-text-ll
      right .4rem
      bottom 0
  .slide-fade-enter-active
    transition: all .3s ease
  .slide-fade-leave-active
    transition: all .3s ease
  .slide-fade-enter
  .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */
    transform: translateY(-10px)
    opacity: 0
</style>
