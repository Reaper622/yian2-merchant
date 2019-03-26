<template>
  <div class="wrapper">
    <m-header
    :title="'认证信息'"
    :isBack="true"></m-header>
    <div class="content">
      <div class="course">
        <img class="course-img" src="@/assets/images/course_top.png" />
        <p class="course-tip">请上传您的营业执照,注意无遮挡</p>
      </div>
      <div class="btn apply">申请认证</div>
      <div class="picIdentify">
        <img class="is-identify-pic" :src="imgSrc" alt="认证图片" v-if="isUpload">
        <div class="identity-content" v-else>
          <img class="identity-pic" src="@/assets/images/identity.png" />
          <p class="identity-tip">待上传认证图片...</p>
        </div>
      </div>
      <div class="btn uploadPic" @click="uploadPic">上传认证照片</div>
      <input type="file" ref="file" name="file" @change="uploadToServer" accept="image/png,image/jpeg,image/jpg" class="uploadInput">
      <div class="btn checkList" @click="toList">查看我的认证列表</div>
    </div>
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
      formData.append('img', file)
      console.log(formData.get('img'))
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
    },
    // 跳转到审核列表
    toList () {
      this.$router.push('/personal/identification/list')
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import'~@/assets/styles/varibles'
  .content
    height auto
    padding-bottom $tabbarHeight
  .course
    width 90%
    height 3.5rem
    margin .5rem 5%
    text-align center
    .course-img
      width 30%
      margin .2rem 35%
    .course-tip
      margin .2rem 0
      color $color-info
  .btn
    width 90%
    height 1rem
    text-align center
    line-height 1rem
    color $color-text
    font-size $font-size-medium
    margin .5rem 5%
    border-radius .3rem
  .apply
    background $color-warning
  .uploadPic
    background $color-theme
  .checkList
    background $color-success
  .picIdentify
    width 90%
    height 3.5rem
    background $color-info
    margin .5rem 5%
    .is-identify-pic
      width 100%
      height 100%
  // 隐藏file input
  .uploadInput
    position absolute
    top -999999rem
  .identity-content
    width 100%
    height 100%
    text-align center
    color #ffffff
  .identity-pic
    width 40%
    height auto
    margin 0 30%
</style>
