<template>
  <div class="main">
    <m-header
      :title="title"
      :isBack="true"></m-header>
    <swiper :swiperList="swiperListDemo"></swiper>
    <div class="menu">
      <div class="menu-lane">
        <router-link to="/publish">
          <div class="menu-item">
            <p class="menu-icon">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-fabu"></use>
              </svg>
            </p>
            <p class="menu-title">发布兼职</p>
          </div>
        </router-link>
        <router-link to="/draftBox">
          <div class="menu-item">
            <p class="menu-icon">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-caogaoxiang"></use>
              </svg>
            </p>
            <p class="menu-title">草稿箱</p>
          </div>
        </router-link>
      </div>
      <div class="menu-lane">
        <router-link to="myParttimejob">
          <div class="menu-item">
            <p class="menu-icon">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-wode2"></use>
              </svg>
            </p>
            <p class="menu-title">我的兼职</p>
          </div>
        </router-link>
        <router-link to="/moreFunction">
          <div class="menu-item">
            <p class="menu-icon">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-gengduo"></use>
              </svg>
            </p>
            <p class="menu-title">更多功能</p>
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
      title: '首页',
      swiperListDemo: [{
        id: '0001',
        imgUrl: 'https://image.ganjistatic1.com/gjfsqq/097136cab4dc4fe4943b1a03e7f2db68_0-0_7-5.png'
      }, {
        id: '0002',
        imgUrl: 'https://image.ganjistatic1.com/gjfsqq/gjupload/671e4c82eddf4f269be1ae9034928245_0-0_7-5.png'
      }, {
        id: '0003',
        imgUrl: 'https://image.ganjistatic1.com/gjfsqq/ec8d3987fafb474fb088394c3f60f0fa_0-0_7-5.jpg'
      }]
    }
  },
  components: {
    MHeader,
    Swiper
  }
}
</script>

<style lang="stylus" scoped>
  @import '~@/assets/styles/varibles.styl'
  .menu
    width 100%
    margin-top 2rem
    text-align center
    .menu-lane
      margin-bottom .2rem
      .menu-item
        display inline-block
        width 3rem
        height 3rem
        background $color-theme
        border-radius .1rem
        .icon
          width 1rem
          height 1rem
          margin-top .2rem
          color $color-text
      .menu-title
        font-size $font-size-large
        color $color-text
        margin-top .5rem

</style>
