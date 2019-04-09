<template>
  <div class="wrapper">
    <div class="contentArea">
      <div class="name">{{name}}</div>
      <div class="infoArea">
        <div class="panel school">
          <img src="@/assets/images/school.png">
          {{school}}
          </div>
        <div class="panel contact">
          <img src="@/assets/images/phone.png">
          {{contact}}
          </div>
      </div>
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
    height 3rem
    margin .5rem 5%
    background #ffffff
    border-radius .3rem
    box-shadow .05rem .05rem .08rem #E3E3E3
    .name
      position absolute
      width 90%
      margin 0 5%
      height .6rem
      line-height .6rem
      font-size $font-size-medium-x
      border-bottom 0.01rem solid black
    .infoArea
      position absolute
      width 100%
      top .9rem
      height .8rem
      line-height .8rem
      .panel
        position relative
        display inline-block
        width 45%
        text-align center
        img
          height .8rem
          width 30%
  .operationArea
    position absolute
    width 100%
    top 2rem
    display flex
    justify-content space-around
    .btn
      position relative
      width 30%
      height .8rem
      margin-top .1rem
      text-align center
      border-radius .4rem
      line-height .8rem
      color #ffffff
  .checkEva
    background $color-theme
  .refuse
    background $color-danger
  .evaluate
    background $color-warning
</style>
