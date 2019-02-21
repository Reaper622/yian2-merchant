<template>
  <div class="wrapper">
    <m-header
    :title="'兼职草稿箱'"
    :isBack="true"></m-header>
    <div class="draft" v-for="(item, index) in drafts" :key="index" @click="toDetail(item.jobId)">
      <p class="draft-title">{{item.jobSummary}}</p>
      <!-- <span class="draft-last-modify">最后修改时间</span> -->
    </div>
    <div class="addWrapper">
      <div class="addDraft" @click="toPublish">
        <p>添加</p>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import MHeader from '@/components/MHeader/MHeader'
export default {
  name: 'DraftBox',
  components: {
    MHeader
  },
  data () {
    return {
      drafts: []
    }
  },
  methods: {
    getDrafts (index) {
      let _this = this
      this.$axios.post('/merchant/job/getJobsByStatus.do', qs.stringify({
        // 对应获取草稿
        status: 5,
        pageNum: index,
        pageSize: 5
      }))
        .then(res => {
          _this.drafts = _this.drafts.concat(res.data.data.list)
        })
    },
    // 点击添加跳转至发布页
    toPublish () {
      this.$router.replace('/parttimejob/publish')
    },
    // 前往草稿详情页
    toDetail (id) {
      this.$router.push('/parttimejob/draftdetail/' + id)
    }
  },
  mounted () {
    this.getDrafts(1)
  }
}
</script>

<style lang="stylus" scoped>
  @import '~@/assets/styles/varibles'
  @import '~@/assets/styles/mixin'
  .draft
    position relative
    width 90%
    height 1.2rem
    background $color-theme
    margin .2rem 5%
    padding-top .1rem
    border-radius .1rem
    .draft-title
      font-size $font-size-large-x
      text-align center
      color $color-text
    .draft-last-modify
      position absolute
      font-size $font-size-medium
      color $color-text-ll
      right .4rem
      bottom 0
  .addWrapper
    width 100%
    display flex
    justify-content center
    .addDraft
      position fixed
      background $color-theme
      text-align center
      bottom 1.2rem
      width 1.5rem
      height 1.5rem
      border-radius 1.5rem
      p
        color $color-text
        font-size $font-size-medium
        verticalcenter()
</style>
