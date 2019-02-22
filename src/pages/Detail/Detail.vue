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
    <div class="operationArea" >
      <div class="btn stop" v-show="isShowStop" @click="stopRecruit()">停止招聘</div>
      <div class="btn evaluate" v-show="isShowEvaluate" @click="toEvaluate()">前去评价</div>
      <div class="btn start" v-show="isShowStart" @click="startIt()">开工</div>
      <div class="btn rePublish" v-show="isShowRePublish" @click="rePublish()">重新发布</div>
    </div>
    <div class="color-block"></div>
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
        isSignOrNot: '',
        status: null
      },
      isShowStop: false,
      isShowEvaluate: false,
      isShowStart: false,
      isShowRePublish: false
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
          this.checkStatus()
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
    },
    // 检测状态码显示可执行的操作
    checkStatus () {
      console.log(this.list)
      let num = this.list.status
      // 在正在展示与满员情况下可以停止招聘
      if (num === 1 || num === 3) {
        this.isShowStop = true
      } else if (num === 4) {
        this.isShowStart = true
        this.isShowRePublish = true
      } else if (num === 8) {
        this.isShowEvaluate = true
      }
    },
    // 停止招聘
    stopRecruit () {
      this.$layer.closeAll()
      this.$layer.confirm('您确定要停止吗？', () => {
        this.$axios.post('/merchant/job/updateJobById.do', qs.stringify({
          jobId: this.list.jobId,
          action: 4
        }))
          .then(res => {
            if (res.data.status === 2000) {
              this.$layer.closeAll()
              this.$layer.msg('删除成功')
              // 1秒后回到我的兼职页面
              setTimeout(() => {
                this.$router.replace('/parttimejob/myparttimejob')
              }, 1000)
            } else {
              this.$layer.closeAll()
              this.$layer.msg(res.data.msg)
            }
          })
      })
    },
    // 前去评价
    toEvaluate () {
    },
    // 开工
    startIt () {
      this.$layer.closeAll()
      this.$layer.confirm('您确定要开工吗？', () => {
        this.$axios.post('/merchant/job/updateJobById.do', qs.stringify({
          jobId: this.list.jobId,
          action: 7
        }))
          .then(res => {
            if (res.data.status === 2000) {
              this.$layer.closeAll()
              this.$layer.msg('成功开工')
              // 1秒后回到我的兼职页面
              setTimeout(() => {
                this.$router.replace('/parttimejob/myparttimejob')
              }, 1000)
            } else {
              this.$layer.closeAll()
              this.$layer.msg(res.data.msg)
            }
          })
      })
    },
    // 重新发布
    rePublish () {
      this.$layer.closeAll()
      this.$layer.confirm('您确定要重新发布吗？', () => {
        this.$axios.post('/merchant/job/updateJobById.do', qs.stringify({
          jobId: this.list.jobId,
          action: 1
        }))
          .then(res => {
            if (res.data.status === 2000) {
              this.$layer.closeAll()
              this.$layer.msg('发布成功')
              // 1秒后回到我的兼职页面
              setTimeout(() => {
                this.$router.replace('/parttimejob/myparttimejob')
              }, 1000)
            } else {
              this.$layer.closeAll()
              this.$layer.msg(res.data.msg)
            }
          })
      })
    }
  },
  mounted () {
    this.getContent()
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/varibles'
@import '~@/assets/styles/mixin'
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
  .operationArea
    width 100%
    height 2rem
    display flex
    justify-content space-around
    .btn
      width 2rem
      height 1rem
      border-radius .5rem
      color $color-text
      font-size $font-size-medium-x
      text-align center
      line-height 1rem
      margin-top .5rem
    .stop
      background $color-danger
    .evaluate
      background $color-info
    .start
      background $color-success
    .rePublish
      background $color-theme
</style>
