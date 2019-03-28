<template>
  <div class="wrapper">
    <m-header
    :title="'审核列表'"
    :isBack="true"></m-header>
    <div class="content">
      <div class="item" v-for="(item,index) in list" :key="index">
        <img class="schoolIcon" :src="item.icon" alt="">
        <span class="schoolname">{{item.authSchool.schoolName}}</span>
        <img class="authImg" src="@/assets/images/auth.png" />
        <span class="authMsg">{{item.authSchool.status === 0 ? '待审核' : (item.authSchool.status === 1 ? '已通过' : '未通过')}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import MHeader from '@/components/MHeader/MHeader'
export default {
  name: 'IdentificationList',
  components: {
    MHeader
  },
  data () {
    return {
      list: []
    }
  },
  mounted () {
    this.getIdentificationList()
  },
  methods: {
    // 获取审核列表
    getIdentificationList () {
      this.$axios.get('/merchant/audit/getAuditList.do')
        .then(res => {
          console.log(res)
          if (res.data.status === 1) {
            this.list = res.data.data
          } else {
            this.$layer.closeAll()
            this.$layer.msg(res.data.msg)
          }
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
   @import'~@/assets/styles/varibles'
  .content
    height auto
    padding-bottom $tabbarHeight
  .item
    position relative
    width 90%
    height 2rem
    margin .5rem 5%
    border-radius .5rem
    background #ffffff
    line-height 2rem
    .schoolIcon
      width 1.5rem
      height 1.5rem
      margin .25rem .2rem
    .authImg
      position absolute
      width auto
      height .8rem
      margin .6rem 0
      right 1.2rem
    .authMsg
      position absolute
      right .2rem
</style>
