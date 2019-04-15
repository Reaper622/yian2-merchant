<template>
  <div class="wrapper">
    <m-header
    :title="'草稿详情'"
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
        <div id="trigger5" class="item-detail2" ref="jobTypeTrigger">&nbsp;</div>
      </div>
      <hr>
      <div class="content-wrapper1">
        <div class="item-title1">报酬类型</div>
        <div id="trigger4" class="item-detail2" ref="rewardTypeTrigger">&nbsp;</div>
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
        <div class="item-title1">学校</div>
        <div id="trigger6" class="item-detail2" ref="schoolTrigger"></div>
      </div>
      <div class="buttonLine">
        <div class="btn" id="saveBtn" @click="saveDraft">
          <p>保存</p>
        </div>
        <div class="btn" id="publishBtn" @click="publishDraft">
          <p>发布</p>
        </div>
        <div class="btn" id="deleteBtn" @click="deleteDraft">
          <p>删除</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MobileSelect from 'mobile-select'
import qs from 'qs'
import MHeader from '@/components/MHeader/MHeader'
export default {
  name: 'DraftDetail',
  components: {
    MHeader
  },
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
        schoolId: null,
        schoolName: null
      }
    }
  },
  mounted () {
    this.getInfo()
    this.getParttimeJobType()
    this.getSchoolAudited()
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
  },
  methods: {
    // 获取要展示的兼职信息
    getInfo () {
      let _this = this
      this.$axios.post('/merchant/job/getJobById.do', qs.stringify({
        jobId: this.$route.params.id
      }))
        .then(res => {
          if (res.data.status === 2000) {
            console.log(res.data.data)
            _this.list = res.data.data
            let schoolNameList = this.$store.getters.getSchoolList
            let arr = schoolNameList.filter(v => v.code === _this.list.schoolId)
            console.log(arr)
            _this.list.schoolName = arr[0].name
            // 在Trigger中展示数据
            _this.$refs.jobTypeTrigger.innerHTML = _this.getJobTypeName(res.data.data.jobType)
            _this.$refs.rewardTypeTrigger.innerHTML = res.data.data.rewardType
            _this.$refs.schoolTrigger.innerHTML = _this.list.schoolName
          } else {
            _this.$layer.closeAll()
            _this.$layer.msg(res.data.msg)
          }
        })
    },
    // 请求兼职类型以及其对应的代码
    getParttimeJobType () {
      let _this = this
      this.$axios.post('/jobTypeList/getJobTypeListWithoutIcon.do')
        .then(res => {
          let mobileSelect5 = new MobileSelect({// eslint-disable-line
            trigger: '#trigger5',
            title: '选择兼职类型',
            wheels: [
              {data: res.data.data.list}
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
        })
    },
    // 根据代码获取对应的兼职类型名称
    getJobTypeName (num) {
      let list = this.$store.getters.getJobTypeList
      for (var x in list) {
        if (list[x].id === num) {
          return list[x].name
        }
      }
    },
    // 根据代码获取对应的报酬类型文字
    getRewardTypeNum (type) {
      if (type === '小时') {
        return 0
      } else if (type === '天') {
        return 1
      } else {
        return 2
      }
    },
    // 编辑草稿之后，保存
    saveDraft () {
      let _this = this
      if (this.list.jobSummary && this.list.jobTime && this.list.reward && this.list.rewardType !== null && this.list.address &&
      this.list.details && this.list.jobType !== null && this.list.hireNum && this.list.schoolId) {
        this.$axios.post('/merchant/job/saveJobInfo.do', qs.stringify({
          jobId: this.$route.params.id,
          jobSummary: this.list.jobSummary,
          jobTime: this.list.jobTime,
          reward: parseInt(this.list.reward),
          rewardType: parseInt(this.getRewardTypeNum(this.list.rewardType)),
          address: this.list.address,
          details: this.list.details,
          jobType: parseInt(this.list.jobType),
          hireNum: parseInt(this.list.hireNum),
          schoolId: parseInt(this.list.schoolId)
        }))
          .then(res => {
            console.log(res)
            if (res.data.status === 1) {
              _this.$layer.closeAll()
              _this.$layer.msg('保存成功')
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
    },
    // 将草稿发布出去
    publishDraft () {
      let _this = this
      if (this.list.jobSummary && this.list.jobTime && this.list.reward && this.list.rewardType && this.list.address &&
      this.list.details && this.list.jobType && this.list.hireNum && this.list.schoolId) {
        this.$axios.post('/merchant/job/dealJob.do', qs.stringify({
          action: 0,
          jobSummary: this.list.jobSummary,
          jobTime: this.list.jobTime,
          reward: parseInt(this.list.reward),
          rewardType: parseInt(this.getRewardTypeNum(this.list.rewardType)),
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
    },
    // 删除草稿
    deleteDraft () {
      this.$layer.closeAll()
      this.$layer.confirm('您确定要删除么？', () => {
        this.$axios.post('/merchant/job/delJobById.do', qs.stringify({
          jobId: this.$route.params.id
        }))
          .then(res => {
            if (res.data.status === 2000) {
              this.$layer.closeAll()
              this.$layer.msg('删除成功')
            } else {
              this.$layer.closeAll()
              this.$layer.msg(res.data.msg)
            }
          })
      }, () => {
        console.log('取消删除')
      })
    },
    // 获取已认证的学校列表
    getSchoolAudited () {
      this.$axios.get('/merchant/audit/getPassList.do')
        .then(res => {
          let _this = this
          _this.schoolList = res.data.data
          console.log(res.data.data, 'it')
          let mobileSelect6 = new MobileSelect({// eslint-disable-line
            trigger: '#trigger6',
            title: '选择学校',
            wheels: [
              {data: _this.schoolList}
            ],
            keyMap: {
              id: 'schoolId',
              value: 'schoolName'
            },
            callback: function (indexArr, data) {
              console.log(indexArr, data[0])
              _this.list.schoolId = data[0].schoolId
            }
          })
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~@/assets/styles/varibles'
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
  .buttonLine
    display flex
    justify-content space-around
    align-items center
    width 100%
    margin-top .5rem
    .btn
      width 2.5rem
      height 1rem
      border-radius .2rem
      line-height 1rem
      text-align center
      font-size $font-size-medium
      color $color-text
  #saveBtn
    background $color-theme
  #publishBtn
    background $color-success
  #deleteBtn
    background $color-danger
</style>
