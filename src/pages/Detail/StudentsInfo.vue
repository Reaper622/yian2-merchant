<template>
  <div class="wrapper">
    <m-header
    :title="'学生名单'"
    :isBack="true"></m-header>
    <div class="exportList" @click="exportList" v-if="status != 8">导出名单</div>
    <div class="exportList" @click="allGood" v-else>一键好评</div>
    <student-info
    v-for="(student,index) in students"
    :key="index"
    :name="student.studentName"
    :school="student.studentSchoolId"
    :contact="student.studentPhone"
    :studentId="student.studentId"
    :status="status"
    @refuse="refuseForm"
    @evaluate="evaluateForm"></student-info>
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
    <div class="cover" v-show="isEvaluating" @click="stopEvaluating"></div>
    <transition name="bounce">
      <div class="evaluateForm" v-show="isEvaluating">
        <div class="starPanel">
          <div class="star medium"></div>
          <div class="star medium"></div>
          <div class="star medium"></div>
        </div>
        <div class="content">
          <textarea  placeholder="在这里写评价内容..."></textarea>
        </div>
        <div class="evaluateBtn" @click="evaluateStudent">确认</div>
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
      isEvaluating: false,
      checkedValue: '',
      otherReason: '',
      isOther: true,
      refuseStudentId: '',
      evaluateStudentId: '',
      status: 0
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
    this.status = this.$route.params.status
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
    // 弹出评价框
    evaluateForm (id) {
      this.isEvaluating = true
      this.evaluateStudentId = id
    },
    // 点击灰色取消弹出框
    stopRefusing () {
      this.isRefusing = false
    },
    // 点击灰色取消弹出框
    stopEvaluating () {
      this.isEvaluating = false
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
    },
    evaluateStudent () {

    },
    // 导出学生名单
    exportList () {
      let url = 'http://www.equator8848.xyz:8080/yian2/merchant/job/getSignInfoByExcel.do?jobId=' + this.$route.params.id
      let link = document.createElement('a')
      link.href = url
      link.click()
    },
    // 一键好评
    allGood () {

    }
  }

}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/varibles'
  .exportList
    position absolute
    right 0
    top 0
    z-index 10
    width 2rem
    height $headerHeight
    line-height $headerHeight
    background $color-warning
    color $color-text
    text-align center
    font-size $font-size-medium
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
  .evaluateForm
    position absolute
    width 80%
    left 10%
    height 60%
    background #fff
    z-index 999
    top 2rem
    overflow hidden
    border-radius .5rem
    .starPanel
      width 80%
      margin .2rem 10%
      height 2rem
      display flex
      justify-content space-around
    .content
      width 80%
      margin .2rem 10% 0
      height 50%
      border 1px solid black
      textarea
        width 100%
        height 100%
    .evaluateBtn
      width 40%
      margin .3rem 30%
      border-radius .2rem
      height 1rem
      line-height 1rem
      background $color-success
      color $color-text
      text-align center
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
  // 实现五角星
  .star.medium {
    border-color: #fd4 transparent transparent transparent;
    border-style: solid;
    border-top-width: 16.66667px;
    border-right-width: 25px;
    border-left-width: 25px;
    height: 0;
    margin-top: 16.66667px;
    margin-bottom: 10.71429px;
    position: relative;
    width: 0;
    top: .8rem
}
.star.medium:before,
.star.medium:after {
    border-color: #fd4 transparent transparent transparent;
    border-style: solid;
    border-top-width: 16.66667px;
    border-right-width: 25px;
    border-left-width: 25px;
    content: '';
    display: block;
    height: 0;
    left: -25px;
    position: absolute;
    top: -16.66667px;
    width: 0;
}
.star.medium:before {
    transform: rotate(70deg);
}
.star.medium:after {
    transform: rotate(-70deg);
}
</style>
