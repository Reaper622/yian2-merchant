<template>
  <div class="wrapper">
    <m-header
    :title="'我的兼职'"
    :isBack="true"></m-header>
    <floding-board
    :title="'未通过兼职'"></floding-board>
  </div>
</template>

<script>
import qs from 'qs'
import MHeader from '@/components/MHeader/MHeader'
import FlodingBoard from '@/components/FlodingBoard/FlodingBoard'
export default {
  name: 'MyParttimeJob',
  data () {
    return {
      noPassJobs: [],
      nowRecruitingJobs: [],
      stopedJobs: [],
      toEvaluateJobs: [],
      finishedJobs: [],
      flags: [false, false, false, false, false]
    }
  },
  components: {
    MHeader,
    FlodingBoard
  },
  mounted () {
  },
  methods: {
    // 获取未通过的兼职信息
    getNoPassJobs () {
      // 只有点击过才加载
      if (this.flags[0]) {
        this.$axios.post('/merchant/job/getJobsByStatus.do', qs.stringify({
          status: 2
        }))
          .then(res => {
            if (res.data.status === 2000) {
              console.log(res)
            } else {
              this.$layer.closeAll()
              this.$layer.msg(res.data.msg)
            }
          })
      }
    },
    // 获取正在招聘的兼职信息
    getNowRecruitingJobs () {
      // 只有点击过才加载
      if (this.flags[1]) {
        this.$axios.post('/merchant/job/getJobsByStatus.do', qs.stringify({
          status: 1
        }))
          .then(res => {
            if (res.data.status === 2000) {
              console.log(res)
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
      if (this.flags[3]) {
        this.$axios.post('/merchant/job/getJobsByStatus.do', qs.stringify({
          status: 4
        }))
          .then(res => {
            if (res.data.status === 2000) {
              console.log(res)
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
      if (this.flags[0]) {
        this.$axios.post('/merchant/job/getJobsByStatus.do', qs.stringify({
          status: 2
        }))
          .then(res => {
            if (res.data.status === 2000) {
              console.log(res)
            } else {
              this.$layer.closeAll()
              this.$layer.msg(res.data.msg)
            }
          })
      }
    },
    getFinishedJobs () {
      // 只有点击过才加载
      if (this.flags[5]) {
        this.$axios.post('/merchant/job/getJobsByStatus.do', qs.stringify({
          status: 8
        }))
          .then(res => {
            if (res.data.status === 2000) {
              console.log(res)
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
</style>
