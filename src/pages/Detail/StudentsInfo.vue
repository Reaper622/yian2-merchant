<template>
  <div class="wrapper">
    <m-header
    :title="'学生名单'"
    :isBack="true"></m-header>
    <student-info
    v-for="(student,index) in students"
    :key="index"
    :name="student.studentName"
    :school="student.studentSchoolId"
    :contact="student.studentPhone"
    :studentId="student.studentId"
    @refuse="refuseForm"></student-info>
    <div class="cover" v-show="isRefusing" @click="stopRefusing"></div>
    <transition name="bounce">
      <div class="refuseForm" v-show="isRefusing">
        <div class="panel">
          <input type="radio" class="checkBox" name="refuseReason" value="条件不符" v-model="checkedValue">
          <span class="boxTitle">条件不符</span>
        </div>
        <div class="panel">
          <input type="radio" class="checkBox" name="refuseReason" value="评价不好" v-model="checkedValue">
          <span class="boxTitle">评价不好</span>
        </div>
        <div class="panel">
          <input type="radio" class="checkBox" name="refuseReason" value="计划有变" v-model="checkedValue">
          <span class="boxTitle">计划有变</span>
        </div>
        <div class="panel">
          <input type="radio" class="checkBox" name="refuseReason" value="其他" v-model="checkedValue">
          <span class="boxTitle">其他</span>
          <br>
          <input type="text" class="inputReason" v-model="otherReason" :disabled="isOther">
        </div>
        <div class="btn" @click="refuseStudent">确认</div>
      </div>
    </transition>
  </div>
</template>

<script>
import qs from 'qs'
import MHeader from '@/components/MHeader/MHeader'
import StudentInfo from '@/components/StudentInfo/StudentInfo'
export default {
  name: 'StudentsInfo',
  components: {
    MHeader,
    StudentInfo
  },
  data () {
    return {
      students: [],
      isRefusing: false,
      checkedValue: '',
      otherReason: '',
      isOther: true,
      refuseStudentId: ''
    }
  },
  watch: {
    checkedValue (currentVal, oldVal) {
      console.log(currentVal)
      if (currentVal === '其他') {
        this.isOther = false
      } else {
        this.isOther = true
      }
    }
  },
  mounted () {
    this.getStudents()
  },
  methods: {
    // 获取学生信息
    getStudents () {
      this.$axios.post('/merchant/job/getSignInfoOnline.do', qs.stringify({
        jobId: this.$route.params.id
      }))
        .then(res => {
          if (res.data.status === 2000) {
            console.log(res)
            this.students = res.data.data
          } else if (res.data.statis === 4002) {
            this.$layer.closeAll()
            this.$layer.msg(res.data.msg)
            this.students = null
          } else {
            this.$layer.closeAll()
            this.$layer.msg(res.data.msg)
          }
        })
    },
    // 弹出拒绝原因调查表单
    refuseForm (id) {
      this.isRefusing = true
      this.refuseStudentId = id
    },
    // 点击灰色取消弹出框
    stopRefusing () {
      this.isRefusing = false
    },
    // 拒绝此学生
    refuseStudent () {
      let theNote
      // 若为其他则选择输入框内文字，若不是则选择选择的原因
      if (this.isOther === true) {
        theNote = this.otherReason
      } else {
        theNote = this.checkedValue
      }
      this.$axios.post('/merchant/job/refuseStudent.do', qs.stringify({
        jobId: this.$route.params.id,
        studentId: this.refuseStudentId,
        note: theNote
      }))
        .then(res => {
          if (res.data.status === 2000) {
            this.$layer.closeAll()
            this.$layer.msg('拒绝成功')
            this.getStudents()
            this.isRefusing = false
          } else {
            this.$layer.closeAll()
            this.$layer.msg(res.data.msg)
            this.isRefusing = false
            this.getStudents()
          }
        })
    }
  }

}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/varibles'
  .cover
    position absolute
    top 0
    width 100%
    height 100%
    background rgba(160, 160, 160, .5)
    z-index 100
  .refuseForm
    position absolute
    width 80%
    left 10%
    height 60%
    background #fff
    z-index 999
    top 2rem
    overflow hidden
    border-radius .5rem
    .panel
      width 100%
      height 1rem
      margin .5rem 0
      padding-left 1rem
      .checkBox
        width .5rem
        height .5rem
        backgroundcolor $color-theme
  .inputReason
    width 4rem
    height .8rem
    line-height .8rem
    margin-top .2rem
    margin-left .2rem
    border .02rem solid #888
  .btn
    width 40%
    height 1rem
    line-height 1rem
    background $color-success
    color $color-text
    text-align center
    margin 1rem 30%
  .bounce-enter-active
    animation bounce-in .5s
  .bounce-leave-active
    animation bounce-in .5s reverse
  @keyframes bounce-in
    0%
      transform scale(0)
    50%
      transform scale(1.2)
    100%
      transform scale(1)
</style>
