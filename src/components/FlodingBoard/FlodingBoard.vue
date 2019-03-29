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
      <div class="contentArea" v-show="isclicked" >
        <div class="contentItem" v-for="(item, index) in content" :key="index" @click="toDetail(item.jobId)">
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
    },
    // 点击兼职前往详情页
    toDetail (id) {
      this.$router.push('/detail/' + id)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~@/assets/styles/varibles'
  .wrapper
    margin-top .2rem
  .boardBeforeClick
    width 95%
    margin 0 2.5%
    height 1.2rem
    line-height 1.2rem
    background #fff
    text-align center
    border-radius .2rem
    .iconBeforeClick
      width .5rem
      height .5rem
      float right
      right .2rem
      color $color-theme
  .boardAfterClick
    width 95%
    margin 0 2.5%
    height 1.2rem
    line-height 1.2rem
    background $color-theme
    text-align center
    overflow hidden
    border-radius .2rem
    color $color-text
    .iconAfterClick
      width .5rem
      height .5rem
      float right
      right .2rem
      transform: rotate(90deg)
      transform-origin: center bottom
      color $color-text
  .titleText
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
      white-space nowrap
      text-overflow ellipsis
      overflow hidden
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
