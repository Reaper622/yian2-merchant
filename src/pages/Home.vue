<template>
  <div class="main">
    <m-header
      :title="title"
      :isBack="true"></m-header>
    <swiper :swiperList="swiperListDemo"></swiper>
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

</style>
