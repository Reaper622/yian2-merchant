<template>
  <div class="wrapper">
    <m-header
    :title="'审核列表'"
    :isBack="true"></m-header>
    <div class="content">
      <div class="item" v-for="(item,index) in list" :key="index">
        <img src="" alt="">
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
    width 90%
    height 2rem
    margin .5rem 5%
    border-radius .5rem
    background #ffffff
</style>
