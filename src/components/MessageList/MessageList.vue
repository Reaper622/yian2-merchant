<template>
  <div>
    <!-- <scroll class="scroll-content" ref="scroll" :data="list"> -->
      <ul>
        <li
          v-for="(item,index) in list"
          class="border-bottom"
          :class="{move:candelete.id==item.id}"
          @touchstart="touchStart(item)"
          @touchend="touchEnd(item)"
          :key="index"
          @click="selectItem(item)"
        >
          <div class="red-dot" v-show="!item.isRead"></div>
          <span class="title">{{item.title}}</span>
          <span class="pushTime">{{item.pushTime}}</span>
          <div class="isRead" @click.stop="cancelRedDot(item)">标为已读</div>
          <div class="del" @click.stop="deleteItem(index, item)">删除</div>
        </li>
      </ul>
    <!-- </scroll> -->
    <!-- <div class="totalNum">6</div> -->
    <div class="deleteAll" @click="deleteAll">删除所有</div>
  </div>
</template>

<script>
import qs from 'qs'
// import Scroll from 'components/scroll/scroll'
export default {
  name: 'MessageList',
  // components: {
  //   Scroll
  // },
  data () {
    return {
      // 数据
      list: [],
      clientNum: {}, // 记录开始滑动（x1）,结束滑动（x2）的鼠标指针的位置
      candelete: {}, // 滑动的item
      dotFlag: true
    }
  },
  methods: {
    getMessageList () {
      this.$axios.post('message/getMessageTitleList.do', qs.stringify({
        pageNum: '',
        pageSize: ''
      }), {
        withCredentials: true
      })
        .then((res) => {
          this.normalizeList(res)
          // this.$refs.scroll.refresh()
          // console.log(this.list)
        })
    },
    normalizeList (res) {
      let ret = []
      let list = res.data.data.list
      for (let item in list) {
        let obj = {}
        obj.id = parseInt(item) + 1
        obj.title = list[item].msgTitle
        obj.pushTime = list[item].pushTime
        obj.isRead = list[item].isRead
        obj.messageId = list[item].messageId
        ret.push(obj)
      }
      this.list = ret
    },
    deleteItem (index, item) {
      this.$axios.post('/message/delMessage.do', qs.stringify({
        messageId: item.messageId
      }))
        .then((res) => {
          if (res.data.status === 1) {
            this.list.splice(index, 1)
            // 删除数组某条数据，或者向某个位置添加数据
          }
        })
    },
    cancelRedDot (item) {
      this.$axios.post('/message/getMessage.do', qs.stringify({
        messageId: item.messageId
      }))
        .then((res) => {
          if (res.status === 200) {
            item.isRead = 1
          }
        })
    },
    touchStart (item) {
      let touchs = event.changedTouches[0]
      // 记录开始滑动的鼠标位置
      this.clientNum.x1 = touchs.pageX
      this.candelete = {}
    },
    touchEnd (item) {
      let touchs = event.changedTouches[0]
      // 记录结束滑动的鼠标位置
      this.clientNum.x2 = touchs.pageX
      this.candelete = {}
      // 判断滑动距离大于50，判定为滑动成功，否则失败
      if (
        this.clientNum.x2 < this.clientNum.x1 && Math.abs(this.clientNum.x1) - Math.abs(this.clientNum.x2) > 50
      ) {
        event.preventDefault()
        this.candelete = item
      } else if (
        this.clientNum.x2 > this.clientNum.x1 && Math.abs(this.clientNum.x2) - Math.abs(this.clientNum.x1) > 10
      ) {
        event.preventDefault()
        this.candelete = {}
      }
    },
    selectItem (item) {
      this.$router.push(`/message/${item.messageId}`)
    },
    deleteAll () {
      let _this = this
      if (this.list.length) {
        this.$layer.closeAll()
        this.$layer.open({
          btn: ['确认', '取消'],
          content: '确认删除所有消息？',
          className: 'good luck1',
          shade: true,
          yes (index, $layer) {
            _this.axios.post('/message/delAllMessage.do')
              .then(res => {
                console.log(res)
                if (res.data.status === 1) {
                  _this.$layer.closeAll()
                  _this.$layer.msg(res.data.msg)
                  _this.list = []
                }
              })
          }
        })
      } else {
        this.$layer.closeAll()
        this.$layer.msg('无可删除消息！')
      }
    }
  },
  mounted () {
    this.getMessageList()
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/mixin'
  // .totalNum
  //   text-align center
  //   position fixed
  //   z-index 999
  //   bottom .52rem
  //   left 4rem
  //   padding .02rem .03rem
  //   border-radius .2rem
  //   background-color #FC0208
  //   color #ffffff
  //   font-size .2rem
  //   min-width .2rem
  //   min-height .2rem
  .scroll-content
    height 100%
    overflow hidden
  li
    background #fdfdfd
    line-height 1.1rem
    position relative
    transform translateX(0)
    transition all .3s /*滑动效果更生动*/
    padding-left .5rem
    .red-dot
      position absolute
      top .44rem
      left .2rem
      width .2rem
      height .2rem
      border-radius .1rem
      background-color #FC0208
  ul
    overflow-x hidden /*隐藏ul x轴的滚动条*/
  li.move
    transform translateX(-2.4rem) /*滑动后x轴位移-60px,使其可见*/
  .title
    display inline-block
    max-width 55%
    ellipsis()
    vertical-align: bottom /*解决overflow hidden和inline-block同时出现造成的高度变化问题*/
  .pushTime
    position absolute
    right .2rem
    ellipsis()
  .isRead
    position absolute
    top 0
    right -1px
    z-index: 3
    width 1.4rem
    height 1.1rem
    text-align center
    color #ffffff
    background-color #F1AE42
    transform translateX(1.4rem) /*默认x轴位移60px，使其隐藏*/
  .del
    position absolute
    top 0
    right -1px
    z-index: 3
    width 1rem
    height 1.1rem
    text-align center
    color #ffffff
    background-color #ff5b45
    transform translateX(2.4rem) /*默认x轴位移60px，使其隐藏*/
  .deleteAll
    position fixed
    top 0.32rem
    right 0.12rem
    font-size .2rem
    color #ffffff
    z-index 999
</style>
