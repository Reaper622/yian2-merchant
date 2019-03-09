<template>
  <div>
    <div class="wrapper" v-for="item of evaluationList" :key="item.id">
      <div class="level">{{item.evaluationLevel}}</div>
      <div class="content">{{item.content}}</div>
      <div class="time">{{item.evaluationTime}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EvaluationPanel',
  props: {
    evaluationList: Array
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/varibles.styl'
  .wrapper
    margin .2rem .12rem 0
    background-color #ffffff
    border-radius .2rem
    color #3B3B3B
    .level
      height .7rem
      line-height .7rem
      padding-left .6rem
      font-weight bold
    .content
      color #5F5F5F
      margin-top .1rem
      padding 0 .6rem
    .time
      color #5F5F5F
      padding .3rem .6rem .2rem
      text-align right
</style>
