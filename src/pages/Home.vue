<template>
  <div class="main">
    <m-header
      :title="'首页'"
      :isBack="false"></m-header>
    <swiper :swiperList="swiperListDemo"></swiper>
    <div class="menu">
      <div class="menu-panel">
        <router-link to="/parttimejob/publish">
          <div class="menu-item item1">
            发 布 兼 职
          </div>
        </router-link>
      </div>
      <div class="menu-panel">
        <router-link to="/parttimejob/draftbox">
          <div class="menu-item item2">
            草  稿  箱
          </div>
        </router-link>
      </div>
      <div class="menu-panel">
        <router-link to="/parttimejob/myParttimejob">
          <div class="menu-item item3">
            我 的 兼 职
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import MHeader from '@/components/MHeader/MHeader'
import Swiper from '@/components/Swiper/Swiper'
export default {
  name: 'Home',
  data () {
    return {
      swiperListDemo: [{
        id: '0001',
        imgUrl: '../../static/images/swiper.png'
      }]
    }
  },
  components: {
    MHeader,
    Swiper
  },
  mounted () {
    this.getJobTypeList()
  },
  methods: {
    // 请求兼职类型以及其对应的代码,储存在Vuex中
    getJobTypeList () {
      this.$axios.post('/jobTypeList/getJobTypeListWithoutIcon.do')
        .then(res => {
          this.$store.commit('jobTypeList', res.data.data.list)
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~@/assets/styles/varibles.styl'
  .menu
    width 100%
    margin-top 2rem
    text-align center
    .menu-panel
      margin-bottom 1rem
      display flex
      justify-content:space-around
      .menu-item
        width 3rem
        height 1rem
        line-height 1rem
        border-radius .3rem
        margin-left .2rem
        margin-right .2rem
        font-size $font-size-large
  .item1
    background #79BBFF
    color $color-text
  .item2
    background $color-theme
    color $color-text
  .item3
    backgournd #ffffff
    color $color-theme
    border .5px solid $color-theme
</style>
