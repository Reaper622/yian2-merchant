<template>
  <div class="outWrapper" ref="wrapper">
    <m-header
      :title="'我的兼职'"
      :isBack="true"></m-header>
    <div class="content">
      <floding-board
      :title="'待审核兼职'"
      :content="waitToAuditJobs"
      @beClicked="toClick(0)"></floding-board>
      <floding-board
      :title="'展示中的兼职'"
      :content="nowShowingJobs"
      @beClicked="toClick(1)"></floding-board>
      <floding-board
      :title="'未通过兼职'"
      :content="noPassJobs"
      @beClicked="toClick(2)"></floding-board>
      <floding-board
      :title="'满员的兼职'"
      :content="fullJobs"
      @beClicked="toClick(3)"></floding-board>
      <floding-board
      :title="'停止的兼职'"
      :content="stopedJobs"
      @beClicked="toClick(4)"></floding-board>
      <floding-board
      :title="'进行中的兼职'"
      :content="nowRunningJobs"
      @beClicked="toClick(5)"></floding-board>
      <floding-board
      :title="'待评价的兼职'"
      :content="toEvaluateJobs"
      @beClicked="toClick(6)"></floding-board>
      <floding-board
      :title="'已完成的兼职'"
      :content="finishedJobs"
      @beClicked="toClick(7)"></floding-board>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import qs from 'qs'
import MHeader from '@/components/MHeader/MHeader'
import FlodingBoard from '@/components/FlodingBoard/FlodingBoard'
export default {
  name: 'MyParttimeJob',
  data () {
    return {
      // 待审核兼职
      waitToAuditJobs: [],
      // 正在展示兼职 (学生可见)
      nowShowingJobs: [],
      // 未通过的兼职
      noPassJobs: [],
      // 满员的兼职
      fullJobs: [],
      // 停止的兼职
      stopedJobs: [],
      // 进行中的兼职
      nowRunningJobs: [],
      // 待评价的兼职
      toEvaluateJobs: [],
      // 已完成的兼职
      finishedJobs: [],
      // 每种兼职是否被点击过
      flags: [false, false, false, false, false, false, false, false]
    }
  },
  components: {
    MHeader,
    FlodingBoard
  },
  mounted () {
    this.$nextTick(() => {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.wrapper, {})
      } else if (!this.$refs.wrapper) {
        return false
      } else {
        this.scroll.refresh()
      }
    })
  },
  methods: {
    toClick (num) {
      this.flags[num] = !this.flags[num]
      switch (num) {
        case 0: this.getWaitToAuditJobs(); break
        case 1: this.getNowShowingJobs(); break
        case 2: this.getNoPassJobs(); break
        case 3: this.getFullJobs(); break
        case 4: this.getStopedJobs(); break
        case 5: this.getNowRunningJobs(); break
        case 6: this.getToEvaluateJobs(); break
        case 7: this.getFinishedJobs(); break
      }
    },
    // 获取待审核的兼职
    getWaitToAuditJobs () {
      // 只有点击过才加载
      if (this.flags[0]) {
        this.$axios.post('/merchant/job/getJobsByStatus.do', qs.stringify({
          status: 0
        }))
          .then(res => {
            if (res.data.status === 2000) {
              this.waitToAuditJobs = res.data.data.list
            } else {
              this.$layer.closeAll()
              this.$layer.msg(res.data.msg)
            }
          })
      }
    },
    // 获取正在展示的兼职 (学生可见)
    getNowShowingJobs () {
      // 只有点击过才加载
      if (this.flags[1]) {
        this.$axios.post('/merchant/job/getJobsByStatus.do', qs.stringify({
          status: 1
        }))
          .then(res => {
            if (res.data.status === 2000) {
              this.nowShowingJobs = res.data.data.list
            } else {
              this.$layer.closeAll()
              this.$layer.msg(res.data.msg)
            }
          })
      }
    },
    // 获取未通过的兼职信息
    getNoPassJobs () {
      // 只有点击过才加载
      if (this.flags[2]) {
        this.$axios.post('/merchant/job/getJobsByStatus.do', qs.stringify({
          status: 2
        }))
          .then(res => {
            if (res.data.status === 2000) {
              this.noPassJobs = res.data.data.list
            } else {
              this.$layer.closeAll()
              this.$layer.msg(res.data.msg)
            }
          })
      }
    },
    // 获取满员的兼职
    getFullJobs () {
      // 只有点击过才加载
      if (this.flags[3]) {
        this.$axios.post('/merchant/job/getJobsByStatus.do', qs.stringify({
          status: 3
        }))
          .then(res => {
            if (res.data.status === 2000) {
              this.fullJobs = res.data.data.list
            } else {
              this.$layer.closeAll()
              this.$layer.msg(res.data.msg)
            }
          })
      }
    },
    // 获取已停止的兼职
    getStopedJobs () {
      // 只有点击过才加载
      if (this.flags[4]) {
        this.$axios.post('/merchant/job/getJobsByStatus.do', qs.stringify({
          status: 4
        }))
          .then(res => {
            if (res.data.status === 2000) {
              this.stopedJobs = res.data.data.list
            } else {
              this.$layer.closeAll()
              this.$layer.msg(res.data.msg)
            }
          })
      }
    },
    // 获取进行中的兼职
    getNowRunningJobs () {
      // 只有点击过才加载
      if (this.flags[5]) {
        this.$axios.post('/merchant/job/getJobsByStatus.do', qs.stringify({
          status: 7
        }))
          .then(res => {
            if (res.data.status === 2000) {
              this.nowRunningJobs = res.data.data.list
            } else {
              this.$layer.closeAll()
              this.$layer.msg(res.data.msg)
            }
          })
      }
    },

    // 获取待评价的兼职
    getToEvaluateJobs () {
      // 只有点击过才加载
      if (this.flags[6]) {
        this.$axios.post('/merchant/job/getJobsByStatus.do', qs.stringify({
          status: 8
        }))
          .then(res => {
            if (res.data.status === 2000) {
              this.toEvaluateJobs = res.data.data.list
            } else {
              this.$layer.closeAll()
              this.$layer.msg(res.data.msg)
            }
          })
      }
    },
    getFinishedJobs () {
      // 只有点击过才加载
      if (this.flags[7]) {
        this.$axios.post('/merchant/job/getJobsByStatus.do', qs.stringify({
          status: 9
        }))
          .then(res => {
            if (res.data.status === 2000) {
              this.finishedJobs = res.data.data.list
            } else {
              this.$layer.closeAll()
              this.$layer.msg(res.data.msg)
            }
          })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~@/assets/styles/varibles'
  .outWrapper
    bottom .88rem
    width 100%
    overflow hidden
    z-index 1
    .content
      height 100%
      padding-bottom .88rem
</style>
