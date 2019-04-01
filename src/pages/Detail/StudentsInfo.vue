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
    :school="student.studentSchoolName"
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
          <div class="star" @click="setStar(1)"></div>
          <div :class="stars >= 2 ? 'star' : 'star dark'" @click="setStar(2)"></div>
          <div :class="stars == 3 ? 'star' : 'star dark'"  @click="setStar(3)"></div>
        </div>
        <div class="content">
          <div class="shortContent">
            <div :class="item.isSelected ? 'commentItem active' : 'commentItem'" v-for="item in shortComments" :key="item.id" @click="selectToggle(item.id)">
              {{item.content}}
            </div>
          </div>
          <textarea  placeholder="在这里写评价内容..." v-model="comment"></textarea>
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
      status: 0,
      shortComments: [
        {id: 0, content: '工作认真', isSelected: false},
        {id: 1, content: '态度良好', isSelected: false},
        {id: 2, content: '有责任心', isSelected: false},
        {id: 3, content: '按时到岗', isSelected: false}
      ],
      stars: 2,
      comment: ''
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
    this.status = this.$route.params.status
    this.getStudents()
  },
  methods: {
    // 获取学生信息
    getStudents () {
      if (parseInt(this.$route.params.status) !== 8) {
        this.$axios.post('/merchant/job/getSignInfoOnline.do', qs.stringify({
          jobId: this.$route.params.id
        }))
          .then(res => {
            if (res.data.status === 2000) {
              console.log(res)
              this.students = res.data.data
            } else if (res.data.status === 4002) {
              this.$layer.closeAll()
              this.$layer.msg(res.data.msg)
              this.students = null
            } else {
              this.$layer.closeAll()
              this.$layer.msg(res.data.msg)
            }
          })
      } else {
        this.$axios.post('/merchant/job/getSignInfoOnline.do', qs.stringify({
          jobId: this.$route.params.id
        }))
          .then(res => {
            if (res.data.status === 2000) {
              console.log(res)
              // 只获取待评价的同学
              for (let x in res.data.data) {
                if (res.data.data[x].evaluationStatus === 0 || res.data.data[x].evaluationStatus === 1) {
                  this.students.push(res.data.data[x])
                }
              }
            } else if (res.data.status === 4002) {
              this.$layer.closeAll()
              this.$layer.msg(res.data.msg)
              this.students = null
            } else {
              this.$layer.closeAll()
              this.$layer.msg(res.data.msg)
            }
          })
      }
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
      let _this = this
      let commentContent
      // 将短评加入评价内容
      for (let x in _this.shortComments) {
        if (_this.shortComments[x].isSelected) {
          commentContent = commentContent + _this.shortComments[x].content + ','
        }
      }
      commentContent += _this.comment
      this.$axios.post('/evaluate/evaluate.do', qs.stringify({
        jobId: _this.$route.params.id,
        toUserId: _this.evaluateStudentId,
        content: commentContent,
        level: _this.stars - 1
      }))
        .then(res => {
          if (res.data.status === 1) {
            this.$layer.closeAll()
            this.$layer.msg(res.data.msg)
            this.isEvaluating = false
          } else {
            this.$layer.closeAll()
            this.$layer.msg(res.data.msg)
          }
        })
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
      this.$axios.post('/evaluate/oneKeyEvaluateForMerchant.do', qs.stringify({
        jobId: this.$route.params.id
      }))
        .then(res => {
          if (res.data.status === 1) {
            this.$layer.closeAll()
            this.$layer.msg(res.data.msg)
            this.$router.go(-1)
          } else {
            this.$layer.closeAll()
            this.$layer.msg(res.data.msg)
          }
        })
    },
    // 设置星星数
    setStar (num) {
      this.stars = num
    },
    // 选中一个短评价
    selectToggle (id) {
      this.shortComments[id].isSelected = !this.shortComments[id].isSelected
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
      .shortContent
        width 100%
        height 70%
        display flex
        flex-wrap wrap
        justify-content space-around
        .commentItem
          width 40%
          height .8rem
          line-height .8rem
          text-align center
          box-sizing border-box
          border 2px solid #888
          background-color rgba(210, 210, 210, 0.5)
        .commentItem.active
          border 2px solid $color-success
          background-color #fff
      textarea
        width 100%
        height 30%
        overflow hidden
        background-color rgba(210, 210, 210, 0.5)
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
  .star {
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
.star:before,
.star:after {
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
.star:before {
    transform: rotate(70deg);
}
.star:after {
    transform: rotate(-70deg);
}
.star.dark {
    border-color: #888 transparent transparent transparent;
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
.star.dark:before,
.star.dark:after {
    border-color: #888 transparent transparent transparent;
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
.star.dark:before {
    transform: rotate(70deg);
}
.star.dark:after {
    transform: rotate(-70deg);
}
</style>
