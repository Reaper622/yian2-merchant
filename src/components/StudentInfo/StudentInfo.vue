<template>
  <div class="wrapper">
    <div class="contentArea">
      <div class="panel name">{{name}}</div>
      <div class="panel school">{{school}}</div>
      <div class="panel contact">{{contact}}</div>
    </div>
    <div class="operationArea">
      <div class="btn checkEva" @click="checkEva">查看评价</div>
      <div class="btn refuse" @click="refuseIt" v-if="status != 8">拒绝</div>
      <div class="btn evaluate" @click="evaluateIt" v-else>评价</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StudentInfo',
  props: ['name', 'school', 'contact', 'studentId', 'status'],
  data () {
    return {
      notes: ''
    }
  },
  methods: {
    // 拒绝此人参加兼职
    refuseIt () {
      // 触发父级弹出表单
      this.$emit('refuse', this.studentId)
    },
    // 评价此人
    evaluateIt () {
      // 触发父级弹出评价框
      this.$emit('evaluate', this.studentId)
    },
    // 查看此人的评价
    checkEva () {
      this.$router.push('/evaluation/student/' + this.studentId)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~@/assets/styles/varibles'
  @import '~@/assets/styles/mixin'
  .wrapper
    position relative
    width 90%
    height 2.4rem
    margin .5rem 5%
    background #E8EAED
    border-radius .3rem
  .contentArea
    position absolute
    width 70%
    height 100%
    .panel
      width 90%
      height .6rem
      margin 0.15rem 5%
      line-height .6rem
      text-align center
      color $color-text
      border-radius .2rem
      font-size $font-size-medium
    .name
      background $color-success
    .school
      background $color-warning
    .contact
      background $color-theme
  .operationArea
    position absolute
    right 0
    width 30%
    height 100%
    .btn
      width 2rem
      height 1rem
      text-align center
      line-height 1rem
      color $color-text
      font-size $font-size-medium-x
      border-radius .3rem
      overflow hidden
      margin-top .1rem
      margin-bottom .2rem
  .refuse
    background $color-danger
  .evaluate
    background $color-success
  .checkEva
    background $color-theme
    margin-bottom .1rem
</style>
