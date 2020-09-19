<template>
  <div class="container main">
    <div ref="lucky" class="lucky-wheel">
      <div class="lucky-title">
        <p> 0元博豪礼</p>
        <p class="p1">惊喜享不停</p>
      </div>
      <div class="wheel-main">
        <div v-if="nojs" class="wheel-pointer1" @click="beginRotate()">
          <p class="wheel-p" style="margin-top:15px;">待解锁</p>
        </div>
        <div v-else class="wheel-pointer" @click="beginRotate()">
          <p class="wheel-p">倒计时</p>
          <p>{{ day }} 天</p>
          <!-- {{hr}}:{{min}}:{{sec}} -->
        </div>
        <div class="wheel-bg" :style="rotateStyle">
          <div class="prize-list">
            <div class="prize-item" v-for="(item, index) in prizeList" :key="index" :style="item.style">
              <!-- <div class="prize-pic">
                <img :src="item.icon" />
              </div>-->
              <div class="prize-type">{{ item.name }}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="nojs">
        <div class="kjtime" style="padding:0 10px;padding-top:10px;">
          <p>
            目前活动报名火热，为保证每位家人都可成功参与活动，报名解锁方式咨询当地俱乐部，由俱乐部统一发放。咨询热线18060703873、18060839771
          </p>
        </div>
      </div>
      <div v-else>
        <div class="kjtime">
          <p>抽奖时间：{{ luckstartdate }}</p>
        </div>
        <div @click="wxShare()" class="zhifuzg flex middle center">
          <img src="../assets/img/share.png" alt />
          <span>分享赢抽奖次数</span>
        </div>
      </div>
      <div v-if="false" class="lbtext flex center middle">
        <img src alt />
        <p>
          恭喜 *** 抽中
          <span style="color:#d5181c">一等奖</span>
        </p>
      </div>
    </div>
    <div class="jpsm">
      <div class="jpsm-div1 flex column middle">
        <!-- <div class="img-t">奖品说明</div>
        <img class="img-b" src="../assets/img/noliwu.png" alt />
        <p class="p-b">具体以开奖信息为准</p> -->
      </div>
    </div>
    <div class="jpsm" style="margin-top:30px;">
      <div class="jpsm-div">
        <div class="img-t">活动时间</div>
        <p style="margin-top:10px;" class="p-b1">
          （1）2020年8月6日活动报名开幕式，8月8日早06:00:00开始报名，9月6日晚20:30结束报名；
        </p>
        <p style="margin-top:10px;" class="p-b1">（2）2020年9月7日早06:00抽奖活动开始，9月14日晚20:30结束抽奖活动；</p>
        <p style="margin-top:10px;" class="p-b1">
          （3）2020年9月15日开始核销兑奖，实体产品将于9月22日前寄出，服务产品根据使用期限进行核销
        </p>
        <div class="img-t" style="margin-top:20px">抽奖说明</div>
        <p style="margin-top:10px;" class="p-b1">（1）用户可在抽奖活动报名日截止前进行报名获得抽奖资格</p>
        <p style="margin-top:10px;" class="p-b1">（2）抽奖由开始日起连续7天</p>
        <p style="margin-top:10px;" class="p-b1">（3）获得抽奖资格的用户每天可抽奖7次</p>
        <p style="margin-top:10px;" class="p-b1">（4）每个用户1元100%中奖</p>
        <div class="img-t" style="margin-top:20px">报名流程</div>
        <p style="margin-top:10px;" class="p-b1">（1）用户通过渠道分享进入宣传页</p>
        <p style="margin-top:10px;" class="p-b1">（2）宣传页输入手机号和验证码校验成功后进入云闪付拉新页面</p>
        <p style="margin-top:10px;" class="p-b1">（3）云闪付提供链接进行下载云闪付并实名注册</p>
        <p style="margin-top:10px;" class="p-b1">（4）进入一元支付页面进行报名支付</p>
        <p style="margin-top:10px;" class="p-b1">（5）支付完成后等待抽奖</p>
      </div>
    </div>
    <!-- <div class="main">
      <div class="main-bg"></div>
      <div class="bg-p"></div>
      <div class="content">
        <div class="count">今日免费抽奖次数： {{ count}}</div>
      </div>
      <div class="tip">
        <div class="tip-title">活动规则</div>
        <div class="tip-content">
          <p>1.每日签到后，即可获得一次幸运大转盘的机会，仅限当天有效，过期作废。 2.金币抽奖，每10个金豆可兑换一次大转盘机会。</p>
          <p>2.金币抽奖，每10个金豆可以兑换一次大转盘抽奖机会</p>
          <p>3.所中金豆或积分到【我的账户】中查询。累计达到100金豆及以上，可以兑换相应奖品</p>
        </div>
      </div>
    </div>
    <div class="toast" v-show="prize">
      <div class="toast-container">
        <img :src="toastIcon" class="toast-picture" />
        <div class="close" @click="closeToast()"></div>
        <div class="toast-title">{{toastTitle}}</div>
        <div class="toast-btn">
          <div class="toast-cancel" @click="closeToast">关闭</div>
        </div>
      </div>
    </div>-->
    <!-- <div class="toast-mask" v-show="prize"></div> -->
    <!-- <div class="fixed-right">活动流程</div> -->
    <!-- <div @click="wxShare()" class="fixed-right1">
      <img src="../assets/img/shart.png" alt />
    </div>-->
  </div>
</template>
<script>
import api from '@/api/user'
import { prizeList } from './config'
import validate from '../utils/validate'
const CIRCLE_ANGLE = 360
const config = {
  // 总旋转时间
  duration: 4000,
  // 旋转圈数
  circle: 8,
  mode: 'ease-in-out',
}

export default {
  data() {
    return {
      count: 10, // 剩余抽奖次数
      duration: 3000, // 转盘旋转时间
      prizeList: [], // 奖品列表
      rotateAngle: 0, // 旋转角度
      index: 0,
      prize: null,
      day: 0, //天
      hr: 0, //时
      min: 0, //分
      sec: 0, //秒,
      luckstartdate: '',
      ysfPayHtml: 'ysfPayHtml',
      isnojs: null,
      nojs: false,
    }
  },
  created() {
    // console.log(this.prizeList);
    // 初始化一些值
    this.angleList = []
    // 是否正在旋转
    this.isRotating = false
    // 基本配置
    this.config = config

    // 获取奖品列表
    this.initPrizeList()
  },
  mounted() {
    this.isnojs = validate.getQueryVariable('isnojs')
    if (this.isnojs == null) {
    } else {
      this.nojs = true
      this.$refs.lucky.style.height = '39.2rem'
    }
    this.getCjData()
  },
  //当离开页面时，清除倒计时
  beforeDestroy() {
    clearInterval(this._interval)
  },
  computed: {
    rotateStyle() {
      return `
        -webkit-transition: transform ${this.config.duration}ms ${this.config.mode};
        transition: transform ${this.config.duration}ms ${this.config.mode};
        -webkit-transform: rotate(${this.rotateAngle}deg);
            transform: rotate(${this.rotateAngle}deg);`
    },
    toastTitle() {
      return this.prize && this.prize.isPrize === 1 ? '恭喜您，获得' + this.prize.name : '未中奖'
    },
    toastIcon() {
      // return this.prize && this.prize.isPrize === 1
      //   ? require("../assets/img/congratulation.png")
      //   : require("../assets/img/sorry.png");
    },
  },
  methods: {
    initPrizeList() {
      // 这里可以发起请求，从服务端获取奖品列表
      // 这里使用模拟数据

      this.prizeList = this.formatPrizeList(prizeList)
      // console.log(this.prizeList);
    },
    // 格式化奖品列表，计算每个奖品的位置
    formatPrizeList(list) {
      // 记录每个奖的位置
      const angleList = []

      const l = list.length
      // 计算单个奖项所占的角度
      const average = CIRCLE_ANGLE / l

      const half = average / 2

      // 循环计算给每个奖项添加style属性
      list.forEach((item, i) => {
        // 每个奖项旋转的位置为 当前 i * 平均值 + 平均值 / 2
        const angle = -(i * average + half)
        // 增加 style
        item.style = `-webkit-transform: rotate(${angle}deg);
                      transform: rotate(${angle}deg);`

        // 记录每个奖项的角度范围
        angleList.push(i * average + half)
      })

      this.angleList = angleList

      return list
    },
    beginRotate() {
      this.$toast({
        message: `您好,开始抽奖时间是${this.luckstartdate},敬请期待!`,
        duration: 3000,
      })
      // alert(`您好,开始抽奖时间是${this.luckstartdate},敬请期待!`);
      return false
      // 添加次数校验

      if (this.count === 0) return

      // 开始抽奖
      // 这里这里向服务端发起请求，得到要获得的奖
      // 可以返回下标，也可以返回奖品 id，通过查询 奖品列表，最终得到下标

      // 随机获取下标
      this.index = this.random(this.prizeList.length - 1)

      // 减少剩余抽奖次数
      this.count--

      // 开始旋转
      this.rotating()
    },
    random(max, min = 0) {
      return parseInt(Math.random() * (max - min + 1) + min)
    },
    rotating() {
      const { isRotating, angleList, config, rotateAngle, index } = this

      if (isRotating) return

      this.isRotating = true

      // 计算角度
      const angle =
        // 初始角度
        rotateAngle +
        // 多旋转的圈数
        config.circle * CIRCLE_ANGLE +
        // 奖项的角度
        angleList[index] -
        (rotateAngle % CIRCLE_ANGLE)

      this.rotateAngle = angle

      // 旋转结束后，允许再次触发
      setTimeout(() => {
        this.rotateOver()
      }, config.duration + 1000)
    },
    rotateOver() {
      this.isRotating = false

      this.prize = prizeList[this.index]

      // console.log(this.prize, this.index);
    },
    //关闭弹窗
    closeToast() {
      this.prize = null
    },
    //倒计时
    countdown() {
      const end = Date.parse(new Date(this.luckstartdate))
      const now = Date.parse(new Date())
      // console.log(end, now);
      if (end - now < 0) {
        alert('活动开始时间不能小于现在时间!')
        return false
      }
      const msec = end - now
      let day = parseInt(msec / 1000 / 60 / 60 / 24)
      let hr = parseInt((msec / 1000 / 60 / 60) % 24)
      let min = parseInt((msec / 1000 / 60) % 60)
      let sec = parseInt((msec / 1000) % 60)
      this.day = day
      var hrs = parseInt(day * 24) + hr
      // console.log(hrs);
      this.hr = hrs > 9 ? hrs : '0' + hrs
      this.min = min > 9 ? min : '0' + min
      this.sec = sec > 9 ? sec : '0' + sec
      const that = this
      this._interval = setTimeout(function() {
        that.countdown()
      }, 1000)
    },
    async getCjData() {
      let res = await api.getCjData({ pageRoute: this.ysfPayHtml })
      if (res.status == 200) {
        this.luckstartdate = res.data.activitesLuck.luckstartdate;
        // console.log(JSON.parse(res.data[0].awards));
        this.countdown()
      } else {
        this.$toast(res.data.msg)
      }
    },
    timestampToTime(timestamp) {
      // 计算年月日时分的函数
      var date = new Date(timestamp)
      var Y = date.getFullYear() + '-'
      var M = date.getMonth() + 1 + '-'
      var D = date.getDate() + ' '
      var h = date.getHours() + ':'
      var m = date.getMinutes() + ':'
      var s = date.getSeconds()
      return Y + M + D + h + m + s
    },
    wxShare() {
      window.android.androidWxShare('ysfPayHtml')

      // this.$toast("点击了分享");
      // try {
      //   window.android.androidWxShare();
      // } catch (e) {
      //   console.log("出现错误, 如果在非android环境下访问, 出现该警告是正常的");
      // }
    },
  },
}
</script>
<style scoped>
.zhifuzg {
  width: 686px;
  height: 98px;
  line-height: 98px;
  font-size: 32px;
  font-family: PingFang SC, PingFang SC-Bold;
  font-weight: 700;
  text-align: center;
  color: #a50000;
  background-image: url('../assets/img/zhifubtn.png');
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  margin: 0 auto;
  margin-top: 50px;
}
.zhifuzg img {
  width: 32px;
  height: 32px;
  margin-right: 16px;
}
.container {
  width: 100%;
  /* height: 1206px; */
  /* overflow: hidden; */
  color: #fff;
  background-color: #d4131a;
  position: relative;
}
.fixed-right {
  position: fixed;
  top: 65%;
  right: 0;
  /* left: 50%; */
  transform: translateY(-50%);
  width: 162px;
  height: 64px;
  line-height: 64px;
  background: #fdc720;
  border-radius: 32px 0px 0px 32px;
  z-index: 999;
  color: #e81818;
  font-size: 30.8px;
}
.fixed-right1 {
  position: fixed;
  top: 15%;
  right: 10px;
  transform: translateY(-50%);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #fdc720;
  z-index: 999;
  color: #e81818;
  font-size: 30.8px;
}
.fixed-right1 img {
  width: 50px;
  height: 50px;
  margin-top: 20px;
}
.lucky-wheel {
  height: 1320px;
  background-image: url('../assets/img/contentbg.png');
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.lucky-title {
  text-align: center;
  padding-top: 57px;
  font-size: 105px;
  color: #fff;
  font-weight: bold;
  text-shadow: 0px 1px 0px #c8201e, 0px 2px 0px #c8201e, 0px 3px 0px #c8201e, 0px 4px 0px #c8201e, 0px 5px 0px #c8201e,
    0px 6px 0px #c8201e, 0px 7px 0px #c8201e, 0px 8px 7px #c8201e;
}
.lucky-title .p1 {
  text-shadow: 0px 1px 0px #c8201e, 0px 2px 0px #c8201e, 0px 3px 0px #c8201e, 0px 4px 0px #c8201e, 0px 5px 0px #c8201e,
    0px 6px 0px #c8201e, 0px 7px 0px #c8201e, 0px 8px 7px #c8201e;
  text-align: center;
  font-size: 80px;
  color: #fff;
  font-weight: bold;
  margin-bottom: 30px;
}
/*****************转盘start */
.wheel-main {
  margin: 0 auto;
  position: relative;
  width: 649px;
  height: 649px;
  /* margin-left: 72px; */
}
.wheel-pointer {
  position: absolute;
  top: 42%;
  left: 50%;
  z-index: 2;
  width: 198px;
  height: 285px;
  background: url('../assets/img/draw_btn.png') no-repeat center top;
  background-size: 100%;
  transform: translate3d(-50%, -50%, 0);
}
.wheel-pointer p {
  font-size: 30.8px;
  color: #ffd701;
}

.wheel-pointer .wheel-p {
  padding-top: 148.5px;
  margin-bottom: 5px;
}

.wheel-pointer1 {
  position: absolute;
  top: 42%;
  left: 50%;
  z-index: 2;
  width: 198px;
  height: 285px;
  background: url('../assets/img/weijiesuo.png') no-repeat center top;
  background-size: 100%;
  transform: translate3d(-50%, -50%, 0);
}
.wheel-pointer1 p {
  font-size: 30.8px;
  color: #fff;
}
.wheel-pointer1 .wheel-p {
  padding-top: 148.5px;
  margin-bottom: 5px;
}

.wheel-bg {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  background: url('../assets/img/draw_wheel.png') no-repeat center top;
  background-size: 100%;
  color: #fff;
}

.wheel-bg div {
  text-align: center;
}
.prize-list {
  width: 100%;
  height: 100%;
  position: relative;
}
.prize-list .prize-item {
  position: absolute;
  width: 190px;
  height: 330px;
  top: 0;
  left: 50%;
  margin-left: -95px;
  transform-origin: 50% 100%;
}
.prize-type {
  font-size: 28.6px;
  transform: rotate(88deg);
  margin-top: 154px;
  color: #fc5910;
  font-weight: 600;
  letter-spacing: 5px;
}
/*********转盘end********* *****/

.kjtime {
  font-size: 32px;
  font-family: PingFang SC, PingFang SC-Bold;
  font-weight: 700;
  text-align: left;
  color: #d4131a;
  line-height: 39px;
  text-align: center;
  margin-top: 25px;
}
.lbtext {
  width: 686px;
  height: 64px;
  background: #ffffff;
  border: 3px solid #e0261b;
  border-radius: 32px;
  margin: 0 auto;
  margin-top: 30px;
}
.lbtext p {
  font-size: 26px;
  font-family: PingFang SC, PingFang SC-Regular;
  font-weight: 400;
  text-align: left;
  color: #666666;
}
.jpsm {
  padding-bottom: 60px;
}
.jpsm-div {
  width: 666px;
  /* height: 483px; */
  background: #ffffff;
  border-radius: 40px;
  margin: 0 auto;
  margin-top: -80px;
  padding-top: 48px;
  padding-bottom: 30px;
}
.jpsm-div1 {
  width: 666px;
  height: 816px;
  background-image: url('../assets/img/jianping.png');
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  margin: 0 auto;
  margin-top: -90px;
}
.jpsm-div .img-t {
  width: 293px;
  height: 60px;
  display: block;
  line-height: 60px;
  background-image: url('../assets/img/title.png');
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  font-size: 36px;
  margin: 0 auto;
}
.jpsm-div .img-b {
  width: 216px;
  height: 234px;
  display: block;
  margin-top: 30px;
  margin-bottom: 30px;
}
.jpsm-div .p-b {
  font-size: 32px;
  font-family: PingFang SC, PingFang SC-Regular;
  font-weight: 400;
  text-align: center;
  color: #999999;
}
.jpsm-div .p-b1 {
  font-size: 32px;
  font-family: PingFang SC, PingFang SC-Regular;
  font-weight: 400;
  text-align: left;
  color: #999999;
  padding: 0 10px;
}

.prize-pic img {
  width: 130px;
  height: 80px;
  margin-top: 50px;
}
.prize-count {
  font-size: 28px;
}

/* .main {
  position: relative;
  width: 100%;
  min-height: 336px;
  background: rgb(243, 109, 86);
  padding-bottom: 54px;
} */
.main-bg {
  width: 100%;
  height: 210px;
  position: absolute;
  top: -110px;
  left: 0;
  /* background: url("../assets/img/luck_bg.png") no-repeat center top; */
  background-size: 100%;
}
.bg-p {
  width: 100%;
  height: 94px;
  background: rgb(252, 207, 133);
}
.content {
  position: absolute;
  top: 5.6px;
  left: 0;
  background: rgb(243, 109, 86);
  width: 100%;
  height: 166px;
  font-size: 36px;
  color: #ffeb39;
  padding-left: 216px;
}
.content div {
  text-align: left;
}
.tip {
  position: relative;
  margin: 80px auto 0;
  width: 2240px;
  border: 2px solid #fbc27f;
}
.tip-title {
  position: absolute;
  top: -32px;
  left: 50%;
  transform: translate(-50%, 0);
  font-size: 32px;
  color: #fccc6e;
  background: rgb(243, 109, 86);
  padding: 10px 20px;
}
.tip-content {
  padding: 50px 20px;
  font-size: 28px;
  color: #fff8c5;
  line-height: 1.5;
}
.toast-mask {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 10000;
  width: 100%;
  height: 100%;
}
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 20000;
  transform: translate(-50%, -50%);
  width: 374px;
  background: #fff;
  border-radius: 10px;
  padding: 10px;
  background-color: rgb(252, 244, 224);
}
.toast-container {
  position: relative;
  width: 100%;
  height: 100%;
  border: 2px dotted #fccc6e;
}
.toast-picture {
  position: absolute;
  top: -208px;
  left: -48px;
  width: 2280px;
  height: 274px;
}
.toast-pictrue-change {
  position: absolute;
  top: -48px;
  left: -44px;
  width: 2240px;
  height: 100px;
}
.toast-title {
  padding: 90px 0;
  font-size: 36px;
  color: #fc7939;
  text-align: center;
}
.toast-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
}
.toast-btn div {
  background-image: -moz-linear-gradient(-18deg, rgb(242, 148, 85) 0%, rgb(252, 124, 88) 51%, rgb(252, 124, 88) 99%);
  background-image: -ms-linear-gradient(-18deg, rgb(242, 148, 85) 0%, rgb(252, 124, 88) 51%, rgb(252, 124, 88) 99%);
  background-image: -webkit-linear-gradient(-18deg, rgb(242, 148, 85) 0%, rgb(252, 124, 88) 51%, rgb(252, 124, 88) 99%);
  box-shadow: 0px 4px 0px 0px rgba(174, 34, 5, 0.7);
  width: 150px;
  height: 60px;
  border-radius: 60px;
  text-align: center;
  line-height: 60px;
  color: #fff;
}
.close {
  position: absolute;
  top: -30px;
  right: -30px;
  width: 64px;
  height: 64px;
  /* background: url("../assets/img/close_store.png") no-repeat center top; */
  background-size: 100%;
}
</style>
