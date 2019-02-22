<template>
  <div class="wrapper">
    <m-header
    :title="'兼职详情'"
    :isBack="true"></m-header>
    <div class="item">
      <div class="item-title">{{list.jobSummary}}</div>
      <div class="item-location">{{list.address}}</div>
      <div class="row-wrapper">
        <span class="grey">基本工资：</span>
        <span class="black">{{list.reward}}元/{{list.rewardType}}</span>
      </div>
      <div class="color-block"></div>
      <div class="row-wrapper">
        <span class="grey">兼职类型：</span>
        <span class="black">{{list.jobType}}</span>
      </div>
      <div class="row-wrapper">
        <span class="grey">招聘人数：</span>
        <span class="black">{{list.hireNum}}</span>
      </div>
      <div class="row-wrapper">
        <span class="grey">已聘人数：</span>
        <span class="black">{{list.nowNum}}</span>
      </div>
      <div class="color-block"></div>
      <div class="detail-title">工作内容：</div>
      <div class="detail">{{list.details}}</div>
      <div class="tip">若发现实际工作内容与上述描述不符，请您提高警惕并第一时间向我们举报</div>
      <div class="color-block"></div>
    </div>
  </div>
</template>

<script>
import MHeader from '@/components/MHeader/MHeader'
import qs from 'qs'
export default {
  name: 'DetailList',
  components: {
    MHeader
  },
  data () {
    return {
      list: {
        jobSummary: '',
        address: '',
        reward: '',
        rewardType: '',
        jobType: '',
        hireNum: '',
        nowNum: '',
        details: '',
        isSignOrNot: ''
      }
    }
  },
  methods: {
    // 请求兼职信息
    getContent () {
      this.$axios.post('/merchant/job/getJobById.do', qs.stringify({
        jobId: this.$route.params.id
      }))
        .then(res => {
          console.log(res)
          this.list = res.data.data
          this.list.jobType = this.getTypeName(this.list.jobType)
        })
    },
    // 比较兼职类型码获取类型文字
    getTypeName (num) {
      // 冲VueX中获取
      let typeList = this.$store.getters.getJobTypeList
      for (let x in typeList) {
        if (typeList[x].id === num) {
          return typeList[x].name
        }
      }
    }
  },
  mounted () {
    this.getContent()
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/varibles.styl'
  .item-title
    font-size .38rem
    padding .4rem .4rem
  .item-location
    font-size .24rem
    color grey
    padding-left .4rem
    padding-bottom .1rem
    border-bottom 1px solid #E9E9E9
  .row-wrapper
    padding .2rem .4rem
    .grey
      font-size .28rem
      color #979797
    .black
      font-size .32rem
  .color-block
    height .25rem
    background-color #EFEFF4
  .detail-title
    margin .3rem .4rem .2rem .4rem
    border-left .1rem solid $bgColor
    padding-left .2rem
    font-size .32rem
    color #0F87FF
  .detail
    padding .1rem .4rem
    font-size .28rem
    line-height .5rem
  .tip
    padding 0 .4rem .3rem .4rem
    font-size .24rem
    font-weight bold
    text-indent .48rem
    color $color-info
</style>
