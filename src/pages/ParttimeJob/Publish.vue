<template>
  <div class="main">
    <m-header
    :title="'发布兼职'"
    :isBack="true"></m-header>
    <div class="content">
      <div class="content-wrapper1">
        <div class="item-title1">兼职简介</div>
        <input class="item-detail1" type="text" v-model="list.jobSummary">
      </div>
      <hr>
      <div class="content-wrapper1">
        <div class="item-title1">兼职时间</div>
        <input class="item-detail1" type="text" v-model="list.jobTime">
      </div>
      <hr>
      <div class="content-wrapper1">
        <div class="item-title1">兼职地点</div>
        <input class="item-detail1" type="text" v-model="list.address">
      </div>
      <hr>
      <div class="content-wrapper1">
        <div class="item-title1">招聘人数</div>
        <input class="item-detail1" type="text" v-model="list.hireNum">
      </div>
      <hr>
      <div class="content-wrapper1">
        <div class="item-title1">兼职类型</div>
        <div id="trigger5" class="item-detail2">&nbsp;</div>
      </div>
      <hr>
      <div class="content-wrapper1">
        <div class="item-title1">报酬类型</div>
        <div id="trigger4" class="item-detail2">&nbsp;</div>
      </div>
      <hr>
      <div class="content-wrapper1">
        <div class="item-title1">单位报酬</div>
        <input class="item-detail1" type="text" v-model="list.reward">
      </div>
      <hr>
      <div class="content-wrapper1">
        <div class="item-title1">兼职详情</div>
        <textarea class="item-detail1" cols="30" rows="3" v-model="list.details"></textarea>
      </div>
      <hr>
      <div class="content-wrapper1">
        <div class="item-title1">学校ID</div>
        <div id="trigger6" class="item-detail2">&nbsp;</div>
      </div>
      <hr>
      <div class="change-button" @click="publish(0)">发布兼职</div>
      <div class="change-button" @click="publish(5)">存入草稿箱</div>
    </div>

  </div>
</template>

<script>
import MobileSelect from 'mobile-select'
import qs from 'qs'
import MHeader from '@/components/MHeader/MHeader'
export default {
  name: 'Publish',
  data () {
    return {
      list: {
        jobSummary: '',
        jobTime: '',
        reward: null,
        rewardType: null,
        address: '',
        details: '',
        jobType: null,
        hireNum: null,
        schoolId: null
      },
      typeList: [],
      schoolList: []
    }
  },
  components: {
    MHeader
  },
  mounted () {
    this.typeList = this.$store.getters.getJobTypeList
    this.schoolList = this.$store.getters.getSchoolList
    console.log(this.schoolList)
    let _this = this
    let mobileSelect4 = new MobileSelect({// eslint-disable-line
      trigger: '#trigger4',
      title: '选择报酬类型',
      wheels: [
        {
          data: [
            {id: 0, value: '小时'},
            {id: 1, value: '天'},
            {id: 2, value: '月'}
          ]
        }
      ],
      callback: function (indexArr, data) {
        console.log(data[0])
        _this.list.rewardType = data[0].id
      }
    })

    let mobileSelect5 = new MobileSelect({// eslint-disable-line
      trigger: '#trigger5',
      title: '选择兼职类型',
      wheels: [
        {data: _this.typeList}
      ],
      keyMap: {
        id: 'id',
        value: 'name'
      },
      callback: function (indexArr, data) {
        console.log(indexArr, data[0])
        _this.list.jobType = data[0].id
      }
    })
    let mobileSelect6 = new MobileSelect({// eslint-disable-line
      trigger: '#trigger6',
      title: '选择学校',
      wheels: [
        {data: _this.schoolList}
      ],
      keyMap: {
        id: 'code',
        value: 'name'
      },
      callback: function (indexArr, data) {
        console.log(indexArr, data[0])
        _this.list.schoolId = data[0].code
      }
    })
  },
  methods: {
    publish (actionNum) {
      console.log(this.list)
      let _this = this
      if (this.list.jobSummary && this.list.jobTime && this.list.reward && this.list.rewardType !== null && this.list.address &&
      this.list.details && this.list.jobType !== null  && this.list.hireNum && this.list.schoolId) {
        this.$axios.post('/merchant/job/dealJob.do', qs.stringify({
          action: actionNum,
          jobSummary: this.list.jobSummary,
          jobTime: this.list.jobTime,
          reward: parseInt(this.list.reward),
          rewardType: this.list.rewardType,
          address: this.list.address,
          details: this.list.details,
          jobType: this.list.jobType,
          hireNum: parseInt(this.list.hireNum),
          schoolId: parseInt(this.list.schoolId)
        }))
          .then(res => {
            if (res.data.status === 1) {
              _this.$layer.closeAll()
              _this.$layer.msg(res.data.msg)
              // 当前为首页，后期改为我的兼职
              _this.$router.replace('/home')
            } else {
              _this.$layer.closeAll()
              _this.$layer.msg(res.data.msg)
            }
          })
      } else {
        this.$layer.closeAll()
        this.$layer.msg('填写不符合标准')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~@/assets/styles/varibles.styl'
  .content
    height auto
    padding-bottom $tabbarHeight
  .content-wrapper1
      display flex
      justify-content space-between
      padding .1rem .8rem
      align-items center
      .item-title1
        font-size .3rem
        margin-top .2rem
        flex-grow 1
      .item-detail1
        font-size .3rem
        margin-top .2rem
        border-bottom 1px solid #cccccc
        flex-grow 2
      .item-detail2
        font-size .3rem
        margin-top .2rem
        border-bottom 1px solid #cccccc
        flex-grow 4
  .change-button
    text-align center
    margin 0 1.5rem
    margin-top .6rem
    height .6rem
    line-height .6rem
    background-color $bgColor
    color $color-text
    border-radius .14rem
    &:last-child
      background-color #43A964
      margin-top .4rem
</style>
