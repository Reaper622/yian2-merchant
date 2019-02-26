<template>
  <div class="wrapper">
    <m-header
    :title="'认证信息'"
    :isBack="true"></m-header>
    <div class="course"></div>
    <div class="btn apply">申请认证</div>
    <div class="picIdentify">
      <img :src="imgSrc" alt="认证图片" v-show="isUpload">
    </div>
    <div class="btn uploadPic" @click="uploadPic">上传认证照片</div>
    <input type="file" ref="file" name="file" @change="uploadToServer" accept="image/png,image/jpeg,image/jpg" class="uploadInput">
  </div>
</template>

<script>
import MHeader from '@/components/MHeader/MHeader'
export default {
  name: 'Identification',
  data () {
    return {
      // 检测时候上传了照片
      isUpload: false,
      imgSrc: ''
    }
  },
  components: {
    MHeader
  },
  methods: {
    uploadPic () {
      // 触发文件上传的点击事件
      this.$refs.file.dispatchEvent(new MouseEvent('click'))
    },
    // 上传到服务器
    uploadToServer () {
      let _this = this
      let file = this.$refs.file.files[0]
      let formData = new FormData()
      formData.append('photo', file, file.name)
      console.log(formData.get('photo'))
      this.$axios.post('/merchant/audit/uploadAuditImg.do', formData, {
        headers: {'Content-Type': 'multipart/form-data'}
      })
        .then(res => {
          if (res.data.status === 1) {
            _this.$layer.closeAll()
            _this.$layer.msg('上传成功')
            _this.getIdentifiedPic()
          } else {
            _this.$layer.closeAll()
            _this.$layer.msg(res.data.msg)
          }
        })
    },
    // 获取认证后的图片
    getIdentifiedPic () {
      this.$axios.post('/merchant/audit/getAuditImage.do')
        .then(res => {
          if (res.data.status === 1) {
            this.imgSrc = res.data.msg
            this.isUpload = true
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
  .course
    width 90%
    height 3.5rem
    border 1px solid black
    margin .5rem 5%
  .btn
    width 90%
    height 1rem
    text-align center
    line-height 1rem
    color $color-text
    font-size $font-size-medium
    margin .5rem 5%
  .apply
    background $color-warning
  .uploadPic
    background $color-theme
  .picIdentify
    width 90%
    height 3.5rem
    background $color-info
    margin .5rem 5%
    img
      width 100%
      height 100%
  // 隐藏file input
  .uploadInput
    position absolute
    top -999999rem
</style>
