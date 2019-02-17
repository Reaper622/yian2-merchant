<template>
  <div id="app">
    <router-view></router-view>
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
      tabShow: false
    }
  },
  mounted () {
    this.checkTabShow()
  },
  watch: {
    $route () {
      this.checkTabShow()
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

<style>

</style>
