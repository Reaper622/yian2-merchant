<template>
  <div class="main">
    <m-header
      :title="title"
      :isBack="true"></m-header>
  </div>
</template>

<script>
import MHeader from '@/components/MHeader/MHeader.vue'
export default {
  name: 'Home',
  data () {
    return {
      title: '首页'
    }
  },
  components: {
    MHeader
  }
}
</script>

<style lang="stylus" scoped>

</style>
