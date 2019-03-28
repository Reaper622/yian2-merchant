<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
    <tab v-show="tabShow"></tab>
  </div>
</template>

<script>
import Tab from '@/components/Tab/Tab'
export default {
  name: 'App',
  components: {
    Tab
  },
  data () {
    return {
      tabShow: false,
      transitionName: ''
    }
  },
  mounted () {
    this.checkTabShow()
  },
  watch: {
    $route (to, from) {
      this.checkTabShow()
      let isBack = this.$router.isBack // 监听路由变化时的状态为前进还是后退
      if (isBack) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
      this.$router.isBack = false
    }
  },
  methods: {
    checkTabShow () {
      if (this.$route.path !== '/login' && this.$route.path !== '/register') {
        this.tabShow = true
      } else {
        this.tabShow = false
      }
    }
  }
}
</script>

<style >
  #app{
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .child-view {
    position: absolute;
    width: 100%;
    height: 100%;
    transition: all .3s ease;
  }
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(30px, 0);
    transform: translate(30px, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-30px, 0);
    transform: translate(-30px, 0);
  }
</style>
