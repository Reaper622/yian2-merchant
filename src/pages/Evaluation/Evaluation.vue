<template>
  <div class="wrapper">
    <m-header
    :title="title"
    :isBack="true"></m-header>
    <div class="content">
      <div class="user-info border-bottom">
        <img :src="user.icon">
        <span>{{user.name}}</span>
      </div>
      <div class="evaluation-num">
        <div class="flex-item">
          <img class="face-img" src="@/assets/images/good.png">
          好评 {{goodNum}}
        </div>
        <div class="flex-item">
          <img class="face-img" src="@/assets/images/middle.png">
          中评 {{middleNum}}
        </div>
        <div class="flex-item">
          <img class="face-img" src="@/assets/images/bad.png">
          差评 {{badNum}}
        </div>
      </div>
      <div class="tab">
        <div class="tab-item" :class="[isSelected ? activeItem: blankItem]" @click="tabLeftClick">我收到的</div>
        <div class="tab-item" :class="[!isSelected ? activeItem: blankItem]" @click="tabRightClick">我发出的</div>
      </div>
      <div class="evaluation-wrapper">
        <evaluation-panel :evaluationList="activeList"></evaluation-panel>
      </div>
    </div>
  </div>
</template>

<script>
import MHeader from '@/components/MHeader/MHeader'
import EvaluationPanel from '@/components/EvaluationPanel/EvaluationPanel'
import qs from 'qs'
export default {
  name: 'Evaluation',
  components: {
    MHeader,
    EvaluationPanel
  },
  data () {
    return {
      title: '我的评价',
      isSelected: true,
      activeItem: 'active-item',
      blankItem: 'blank-item',
      inList: [],
      outList: [],
      activeList: [],
      goodNum: '',
      middleNum: '',
      badNum: '',
      user: {}
    }
  },
  methods: {
    tabLeftClick () {
      this.isSelected = true
      this.activeList = this.inList
    },
    tabRightClick () {
      this.isSelected = false
      this.activeList = this.outList
    },
    getOwnInEvaluation () {
      let _this = this
      this.$axios.get('/evaluate/getOwnInEvaluation.do', qs.stringify({
        pageNum: '',
        pageSize: ''
      }))
        .then((res) => {
          // console.log(res)
          _this.inList = _this.normalizeList(res.data.data.list)
          _this.activeList = _this.inList
        })
    },
    getOwnOutEvaluation () {
      let _this = this
      this.$axios.get('/evaluate/getOwnOutEvaluation.do', qs.stringify({
        pageNum: '',
        pageSize: ''
      }))
        .then((res) => {
          // console.log(res)
          _this.outList = _this.normalizeList(res.data.data.list)
          // console.log(_this.outList)
        })
    },
    normalizeList (rawList) {
      let ret = []
      for (let item in rawList) {
        let obj = {}
        obj.content = rawList[item].content
        obj.evaluationTime = rawList[item].evaluationTime
        obj.id = rawList[item].id
        if (rawList[item].evaluationLevel === 0) {
          obj.evaluationLevel = '好评'
        } else if (rawList[item].evaluationLevel === 1) {
          obj.evaluationLevel = '中评'
        } else if (rawList[item].evaluationLevel === 2) {
          obj.evaluationLevel = '差评'
        }
        ret.push(obj)
      }
      return ret
    },
    getEvaluationNumber () {
      this.$axios.get('/evaluate/getOwnEvaluationData.do')
        .then((res) => {
          const num = res.data.data
          this.goodNum = num.good_evaluation
          this.middleNum = num.middle_evaluation
          this.badNum = num.bad_evaluation
        })
    },
    getUser () {
      this.user = this.$store.getters.getUser
    }
  },
  mounted () {
    this.getEvaluationNumber()
    this.getOwnInEvaluation()
    this.getOwnOutEvaluation()
    this.getUser()
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/varibles.styl'
  .content
    height auto
    padding-bottom $tabbarHeight
  .user-info
    height 1rem
    line-height 1rem
    margin .5rem .12rem 0
    padding 0 .6rem
    background-color #ffffff
    img
      height .8rem
      width auto
      margin .1rem .2rem .1rem 0
  .evaluation-num
    display flex
    justify-content space-around
    height 1rem
    line-height 1rem
    margin 0 .12rem
    background-color #fff
    .face-img
      width .6rem
      height .6rem
  .tab
    display flex
    background-color #fff
    margin 0 .12rem
    .tab-item
      height 0.8rem
      line-height .8rem
      width 50%
      text-align center
    .active-item
      background-color $color-theme
      color #ffffff
      box-sizing border-box
    .blank-item
      background-color #ffffff
      color $color-theme
      box-sizing border-box
      border 0.02rem solid $color-theme-light
</style>
