<template>
  <div class="container main">
    <div ref="lucky" class="lucky-wheel" :class="{myClassLuky:isMyClassLuky}">
      <!-- <van-nav-bar
        title="来抽奖"
        @click-left="onClickLeft"
        @click-right="onClickRight"
        left-arrow
        style="background-color:#D3191C"
      >
        <template #left>
          <van-icon name="arrow-left" size="20px " />
        </template>
        <template #right>
          <van-icon name="weapp-nav" size="20px" />
        </template>
      </van-nav-bar> -->
      <div class="lucky-title">
        <p> 0元博豪礼</p>
        <p class="p1">惊喜享不停</p>
      </div>

      <!-- 圆盘部分 -->
      <div class="wheel-main">
        <!-- 修改start -->
        <!-- <div v-if="nojs" class="wheel-pointer1" @click="beginRotate()">
          <p class="wheel-p" style="margin-top:15px;">待解锁</p>
        </div>
        <div v-else class="wheel-pointer" @click="beginRotate()">
          <p class="wheel-p">倒计时</p>
          <p>{{ day }} 天</p> -->

        <!-- {{hr}}:{{min}}:{{sec}}  -->

        <!-- </div> -->
        <!-- 修改end -->
        <!-- 修改完成start -->
        <!-- 时间没到的情况 -->
        <div class="wheel-pointer" :class="{ isShowPup: action }" id="abc" v-if="myParamsActi==='3'" @click="beginRotate('3')">
          <p class="wheel-p">倒计时</p>
          <p>{{ this.dayTian }} {{ this.dayDhms}}</p>
        </div>

        <div class="wheel-pointer" :class="{ isShowPup: action }" id="abc" v-if="myParamsActi==='1'" @click="beginRotate('1')">
          <p class="wheel-p">剩余次数</p>
          <p>{{ this.dayLastCount }}</p>
        </div>

        <div class="wheel-pointers" v-if="myParamsActi === '2'" @click="beginRotate('2')">
          <p class="wheel-p2">抽奖活动</p>
          <p>已结束</p>
        </div>

        <div class="wheel-pointers" v-if="myParamsActi === '4'" @click="beginRotate('4')">
          <p class="wheel-p4">待解锁</p>
        </div>
        <!-- 修改完成end -->
        <div class="wheel-bg" :style="rotateStyle" >
          <div class="prize-list">
            <div class="prize-item" v-for="(item, index) in prizeList" :key="index" :style="item.style">
              <!-- <div class="prize-pic">
                <img :src="item.icon" />
              </div>-->
              <div class="prize-type">{{ item.prize }}</div>
            </div>
            <!-- 中奖记录 -->
            <!-- <div class="prize-rig">
              中奖记录
              <div class="prize-k"></div>
            </div> -->
          </div>
        </div>
        <div class="wheel-bgpan"></div>
      </div>
      <!-- 圆盘结束 -->

      <!-- <div v-if="nojs">
        <div class="kjtime" style="padding:0 10px;padding-top:10px;">
          <p>
            目前活动报名火热，为保证每位家人都可成功参与活动，报名解锁方式咨询当地俱乐部，由俱乐部统一发放。咨询热线18060703873、18060839771
          </p>
        </div>
      </div> -->
      <!-- 待解锁状态获取报名资格 -->
      <div style="margin-bottom:10px" v-if="isCoj === '1'">
        <!-- 修改start -->
        <div class="kjtime" style="color:red" v-if="showMyTime">
          <p>抽奖时间：{{ luckstartdate }}</p>
        </div>
        <div @click="wxShare(1)" class="zhifuzg flex middle center">
          <span>获取报名资格</span>
        </div>
        <div  @click="clickQd" class="zhifuzg flex middle center toppara">
          <img src="../assets/img/i111.png" alt="">
          <span>签到获取抽奖次数</span>
        </div>
      </div>

      <!-- 待解锁状态支付一元解锁抽奖资格 -->
       <div style="margin-bottom:10px" v-if="isCoj === '2'">
        <!-- 修改start -->
        <div class="kjtime" style="color:red" v-if="showMyTime">
          <p>抽奖时间：{{ luckstartdate }}</p>
        </div>
        <div @click="wxShare(2)" class="zhifuzg flex middle center">
          <span>支付一元解锁抽奖资格</span>
        </div>
         <div  @click="clickQd" class="zhifuzg flex middle center toppara">
          <img src="../assets/img/i111.png" alt="">
          <span>签到获取抽奖次数</span>
        </div>
      </div>

      <!-- 正常情况 -->
      <div style="margin-bottom:10px" v-if="isCoj === '3'">
        <!-- 修改start -->
        <div class="kjtime" style="color:red" v-if="showMyTime">
          <p>抽奖时间：{{ luckstartdate }}</p>
        </div>
        <!-- <div @click="wxShare()" class="zhifuzg flex middle center">
          <img src="../assets/img/share.png" alt />
          <span>分享赢抽奖次数</span>
        </div> -->
        <div @click="clickQd"  class="zhifuzg flex middle center toppara">
          <img src="../assets/img/i111.png" alt="">
          <span>签到获取抽奖次数</span>
        </div>
      </div>
       <div class="jpsm-divBox" v-if="stute != 5">
            <div class="jpsm-divBox1">
              连续签到7天可获得1次抽奖次数
            </div>
            <!-- <div class="jpsm-divBox2" @click="clickQd" v-if="cliQd === '1'">
              去签到
            </div>  -->
        </div>
      <!-- <div class="lbtext flex center middl">
        <img src alt />
        <p class="kjName" style="text-align: center;">
          恭喜 *** 抽中
          <span style="color:#d5181c">一等奖</span>
        </p>
      </div> -->
      <div class="kjName-scro" v-if="isShowNotice">
        <van-notice-bar scrollable left-icon="volume-o" background="#fff" :text="myTextPa" />
      </div>
    </div>
    <!-- <div class="jpsm">
      <div class="jpsm-div1 flex column middle">
        <div class="img-t">奖品说明</div>
        <img class="img-b" src="../assets/img/noliwu.png" alt />
        <p class="p-b">具体以开奖信息为准</p>
      </div>
    </div> -->
    <!-- 奖品说明start -->
    <!-- <div class="myStyleB" :class="{ myStyleTop:myStyleTopShow }">
      <div ></div>
      <div class="jpsm-div">
        <div class="img-t">奖品说明</div>
        <ul v-for="(item,index) in myDataList" :key="index">
          <li>
            <div class="jpsm-le">
              {{item.prize}}
            </div>
            <div class="jpsm_can">
               <div class="jpsm-ri"  v-for="(itemLi,index1) in item.awardGroup" :key="index1">
              <span style="font-size:14px"><img :src="itemLi.award.goodsImgUrl" alt="" /> {{itemLi.award.goodsName}}</span>
            </div>
            </div>
          </li>
          <li style="clear:both"> </li>
        </ul>
      </div>
    </div> -->

    <div class="myStyleB" :class="{ myStyleTop:myStyleTopShow }">
      
     

      <!-- 倒计时  1  2  4 状态将奖品切换成死数 据 -->
      <div v-if="myNotShow === 'xs'">
        <div class="jpsm1" :class="{jpsm1class: isjpsm1class}">
          <div class="jpsm-div1 flex column middle">
          
          </div>
        </div>
        <div class="jpsm" style="margin-top:30px;">
            <div class="jpsm-div12">
            <div class="img-t">活动时间</div>
            <p style="margin-top:10px;" class="p-b1">
              （1）2020年9月6日早06:00开始报名，10月1日00:00结束报名；
            </p>
            <p style="margin-top:10px;" class="p-b1">（2）2020年10月1日早06:00抽奖活动开始，10月8日00:00结束抽奖；</p>
            <p style="margin-top:10px;" class="p-b1">
              （3）2020年10月8日开始核销兑奖，实体产品将于10月12日前寄出，服务产品根据使用期限进行核销。
            </p>
            <div class="img-t" style="margin-top:20px">抽奖说明</div>
            <p style="margin-top:10px;" class="p-b1">（1）用户需在截至报名前，报名参加活动，才能获得抽奖资格；</p>
            <p style="margin-top:10px;" class="p-b1">（2）抽奖从2020年10月1日开始，连续抽7天；</p>
            <p style="margin-top:10px;" class="p-b1">（3）拥有抽奖资格的用户每天可参与抽奖7次；</p>
            <p style="margin-top:10px;" class="p-b1">（4）100%中奖，每个用户最少获得1元现金红包一份。</p>
            <div class="img-t" style="margin-top:20px">报名流程</div>
            <p style="margin-top:10px;" class="p-b1">（1）用户进入木知了，根据引导获取报名资格，需下载云闪付并实名认证；</p>
            <p style="margin-top:10px;" class="p-b1">（2）支付1元解锁抽奖资格；</p>
            <p style="margin-top:10px;margin-bottom:10px" class="p-b1">（3）支付完成后等待抽奖。</p>
          </div>
        </div>
      </div>

      <!-- 开启抽奖时展示这 个 -->
      <div class="jpsm-div" :class="{ myStyleTop1:myStyleTopShow1 }" v-else>
       
        <div class="img-t">奖品说明</div>
        <ul v-for="(item,index) in myDataList" :key="index" class="box-ul">
          <li class="box-li" v-if="item.prize !='谢谢惠顾' ">
            <div class="jpsm-le">
              {{item.prize}}
            </div>
             <div class="jpsm_can1" >
                <div class="jpsm-ri1"  v-for="(itemLi,index1) in item.awardGroup" :key="index1">
                  <span style="font-size:14px" class="sp-box1" ><img :src="itemLi.awardImgUrl" alt="" /> <span class="spa-box">{{itemLi.awardName}}</span></span>
                </div>
            </div>
          </li>
          <li style="clear:both"></li>
        </ul>
      </div>


    </div>
    <!-- 奖品说明end -->

    <!-- <div class="jpsm" style="margin-top:30px;"  >
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
    </div> -->

    <!-- <div class="main">
      <div class="main-bg"></div>
      <div class="bg-p"></div>
      <div class="content">
        <div class="count">今日免费抽奖次数： {{ count }}</div>
      </div>
      <div class="tip">
        <div class="tip-title">活动规则</div>
        <div class="tip-content">
          <p>
            1.每日签到后，即可获得一次幸运大转盘的机会，仅限当天有效，过期作废。
            2.金币抽奖，每10个金豆可兑换一次大转盘机会。
          </p>
          <p>2.金币抽奖，每10个金豆可以兑换一次大转盘抽奖机会</p>
          <p>3.所中金豆或积分到【我的账户】中查询。累计达到100金豆及以上，可以兑换相应奖品</p>
        </div>
      </div>
    </div>
    <div class="toast" v-show="prize">
      <div class="toast-container">
        <img :src="toastIcon" class="toast-picture" />
        <div class="close" @click="closeToast()"></div>
        <div class="toast-title">{{ toastTitle }}</div>
        <div class="toast-btn">
          <div class="toast-cancel" @click="closeToast">关闭</div>
        </div>
      </div>
    </div> -->
    <!-- <div class="toast-mask" v-show="prize"></div> -->
    <div class="fixed-right" @click="WinningRecord" :class="{ isShowPup: action }">中奖记录</div>
    <!-- <div @click="wxShare()" class="fixed-right1 ">
      <img src="../assets/img/shart.png" alt />
    </div> -->

    <!-- 中奖实物奖品弹出层 -->
    <van-popup v-model="isShow" class="popup-content" :close-on-click-overlay="falseParams">
      <div class="popupContent-img">
        <img src="../assets/img/titleicon.png" class="img-1" alt="" />
        <img :src="this.myAwardImgUrl" alt="" class="img-2"/>
      </div>
      <h2 style="color:black;font-weight: 700;font-size:12px;padding:0 20px">
        恭喜，抽中{{this.myPrize}} 【{{this.myAwardName}} 】，实物奖品会在抽奖结束后统一发放
      </h2>
      <div class="popupImg-list" style="padding-top:20px">
        <van-form>
        <van-field v-model="textInfo" name="validator" border clearable rows="2" type="textarea" placeholder="请输入收货地址" v-if="myIsShow" :rules="[{ validator, message: '请输入收货地址' }]" />
        </van-form>
        <!-- 收货地址end -->
        <div style="width:90%;margin:auto;margin-top:5px">
          <span style="color:red;font-size:12px" v-if="myIsShow">请认真填写收货地址，不然导致奖品寄送不到</span>
        </div>
        <div class="btn-commit" style="margin-top:20px" :class="{myStyleCl:styleIsShow}"  @click="commitTj(2)">确认</div>
      </div>
    </van-popup>

    <!-- 中奖非实物奖品弹出层  -->
    <van-popup v-model="isShowNo" class="popup-content" :close-on-click-overlay="falseParams">
      <div class="popupContent-img">
        <img src="../assets/img/titleicon.png" class="img-popup" alt="" />
      </div>
      <h2 style="color:black;font-weight: 700;font-size:12px;padding:0 20px">
        恭喜，抽中{{this.myPrize}} 【{{this.myAwardName}} 】
      </h2>
      <div class="popupImg-list" style="padding-top:20px">
        <ul class="my-flowuls1" style="width:100%;height:100px">
          <li v-for="(item,index) in prizeData" :key="index" style="width:100%;height:100px">
            <img :src="item.awardImgUrl" alt="" style="width:30%;height:100%;border-radius:15%" />
          </li>
        </ul>
        <!-- <van-field v-model="textInfo" @click="comDz(textInfo)"  border clearable rows="2" type="textarea" placeholder="请输入收货地址" v-if="myIsShow" /> -->
        <div class="btn-commit" style="margin-top:20px;"  @click="commitTj(1)">确认</div>
      </div>
    </van-popup>

    <!-- 未中奖弹出层 -->
    <van-popup v-model="isNo" class="popup-noprize" >
      <div class="popupContent-img1">
        <img src="../assets/img/liwu.png" alt="" />
      </div>
      <h2 style="color:black;padding:0 30px;font-size:13px;font-weight: 700" v-if="this.dayLastContent == 0">
        很遗憾，没抽中，再接再厉哦，明日再来吧
      </h2>
       <h2 style="color:black;padding:0 30px;font-size:13px;font-weight: 700" v-else>
        很遗憾，没抽中，再接再厉哦，今日还可以再抽 {{this.dayLastContent}} 次
      </h2>
      <div class="btn-commit" style="margin-top:20px" @click="closeBtn(2)">去抽奖</div>
      <!-- <div class="btn-commit"  style="margin-top:20px">好的</div> -->
      <!-- <div class="close-btn1" @click="closeBtn(2)"></div> -->
    </van-popup>
    
  </div>
</template>
<script>
import { Toast } from 'vant'
import api from '@/api/user'
import { prizeList } from './config'
import validate from '../utils/validate'
const CIRCLE_ANGLE = 360
const config = {
  // 总旋转时间
  duration: 4000,
  // 旋转圈数
  circle: 8,
  mode: 'ease-in-out'
}

export default {
  data() {
    return {
      isjpsm1class: false,
      myParamsAc:"",
      myStyleTopShow1:false,
      dayLastContent:0,
      isCoj:"1",
      showEnds:"",
      luckenddate:"",
      myNowTime:"",//提交地址的时间戳
      isMyClassLuky:false,
      isShowNotice:true,
      myStyleTopShow:false,
      showMyTime:false,
      isShowNo:false,
      myAwardImgUrl:"",
      myAwardName:'',
      styleIsShow:false,
      myIsShow:true,
      dayDhms:'',
      dayTian:"",//倒计时天数
      myParamsActi:'',//剩余抽奖次数
      myTextPa: "",
      prizeData:[],
      myPrize:'',
      myDataList: [],
      dayLastCount: '', // 剩余抽奖次数
      duration: 3000, // 转盘旋转时间
      prizeList: [], // 奖品列表
      rotateAngle: 0, // 旋转角度
      index: 0,
      falseParams:false,
      prize: null,
      day: 0, // 天
      hr: 0, // 时
      min: 0, // 分
      sec: 0, // 秒,
      luckstartdate: '',
      // ysfPayHtml: 'ysfPayHtml',
      ysfPayHtml: 'ysfPayHtml',
      isnojs: null,
      nojs: false,
      isShow: false,
      radio: '1',
      textValue: '',
      textInfo: '',
      isNo: false,
      isDisabled: false,
      action: '',
      myCountParams:"",
      stute:'',
      getUrl:"",
      getUrlparams:'',
      myNotShow:"",
      cliQd: '', // 显示签到按钮
    }
  },
  created() {
   
    /*
     * console.log(this.prizeList);
     * 初始化一些值
     */
    this.angleList = []
    // 是否正在旋转
    this.isRotating = false
    // 基本配置
    this.config = config

    // 获取奖品列表
    this.initPrizeList()
  },
  mounted() {
    this.stute = validate.getQueryVariable('stute')
    this.getUrl = validate.getQueryVariable('url')
    console.log("this.stute",this.stute);
    console.log("this.getUrl", this.getUrl);
    if (this.stute == 2 || this.stute == 1) {
        this.isShowNotice = false
      // 此处操作获取安卓方法，将路径传回 去
        this.myNotShow = "xs"
        this.myParamsActi = "4"
        this.isCoj = "1"
        this.cliQd = '1'
    }else if (this.stute == 4) {
      this.isShowNotice = false
        this.myNotShow = "xs"
        this.myParamsActi = "4"
        this.isCoj = "2"
        this.cliQd = '1'
    }else if (this.stute == 3) {
        this.myParamsActi = "1"
        this.isCoj = "3"
        this.cliQd = '1'
    }else if (this.stute == 5){
        this.myNotShow = "xs"
        this.myParamsAc = "ou"
        this.myParamsActi = "2"
        this.isCoj = ""
        this.cliQd = ''
        this.isShowNotice = false
        this.myStyleTopShow1 = true
        this.isjpsm1class = true
        // 待修改
    }else {
        this.isCoj = "3"
        this.cliQd = ''
    }
    
    this.getCjData().then(()=>{
      this.getMyInfoCount()
    }).catch(()=>{

    })
    
  },
  // 当离开页面时，清除倒计时
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
      /*
       * return this.prize && this.prize.isPrize ===  1
       *   ? require("../assets/img/congratulation.png")
       *   : require("../assets/img/sorry.png");
       */
    }
  },
  methods: {
    // 校验函数返回 true 表示校验通过，false 表示不通过
    validator(val) {
      console.log("val",val);
      console.log("/^([a-zA-Z]|[u4e00-u9fa5]|_)([a-zA-Z0-9]|[u4e00-u9fa5]|_)*$/", /[^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n]/g.test(val));
      if (/[^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n]/g.test(val) == false) {
        return true
      } else {
        return false
      }
    },
    // 状态为1  2 时默认给他们去  报名
    async goParams() {
      let token = this.$store.getters.token
      let getOtherJoin = await api.goOtherJoin()
      console.log("getOtherJoin",getOtherJoin);
      if (getOtherJoin.data == '') { 
        let myParam = await api.getCodeZg()
        console.log("myParam",myParam);
        window.android.openBrowser(this.getUrl)
      }else {
        let myParam = await api.getCodeZg()
        window.android.openBrowser(this.getUrl)
      }
      // window.android.openBrowser(this.getUrl)
    },
    async getInfoParams() {
      let getParams = await api.gozlActivity({pageRoute : this.ysfPayHtml})
      console.log("getParams",getParams);
      if (getParams.status == 200) {
        this.getUrlparams = getParams.data.url
         console.log("this.getUrlparams222",this.getUrlparams);
        window.android.openBrowser(this.getUrlparams)
      }
      // console.log('getParams11111',getParams ) ;
      
      
      
    },
    // 提交地址
    comDz(params) {
      console.log("params",params);
    },
    async getMyInfoCount(){
      let _this = this
      let resCount = await api.getFindLotteryById(this.ysfPayHtml)
      console.log('resCount',resCount);
      // console.log('_this.myParamsActi', _this.myParamsActi);
      console.log("resCount.data",resCount.data);
      if (this.myParamsActi === "4") {
        return
      }
       // 活动结束
      if (this.showEnds == "clos" || this.myParamsAc === "ou") {
        _this.dayLastCount = resCount.data
        _this.myParamsActi = "2"
        return
      }
      // 倒计时
      if(this.myTime === "noTime") {
          _this.myParamsActi = "3"
          this.myNotShow = "xs"
          return
      }


      if (resCount.data == "" || resCount.data < 0) {
        // _this.dayLastCount = resCount.data
        _this.dayLastCount = 0
        _this.myParamsActi = "1"
        return
      }

      // 显示剩余次数
      if (resCount.data >= 0) {
        _this.dayLastCount = resCount.data
        // _this.dayLastCount = 10
        _this.myParamsActi = "1"
        return
      }
      // this.dayLastCount =  resCount .data 

    },
   async commitTj(params) {
      if(params == 1) {
        this.isShowNo = false
        window.android.showAd()
      }else if ( params == 2) {
        if (this.myIsShow == false) {
          this.isShow = false
          window.android.showAd()
          return
        }
        if (this.textInfo.trim() === "") {
          this.$toast("请输入收货地址")
            return 
        }
        console.log("this.validator(this.textInfo)",this.validator(this.textInfo));
        if(this.validator(this.textInfo) == false){
          return this.$toast("请不要输入表情")
        }
        let resContent = await api.getUpdateAdd({
          address:this.textInfo,
          createdate:this.myNowTime
        })
        if (resContent.status == 200) {
          this.isShow = false
          window.android.showAd()
        }else {
          this.isShow = false
          window.android.showAd()
        }
        console.log('resContent',resContent);
        // 此处是实物奖品
      }
    },
    closeBtn(params) {
      console.log('params', params)
      if (params == 1) {
        this.isShow = false
        window.android.showAd()
      } else if (params == 2) {
        this.isNo = false
        window.android.showAd()
      }
    },
    async initPrizeList() {
        let res = await api.getCjData({ pageRoute: this.ysfPayHtml })
        if (res.status == 200) {
          this.myDataLists = JSON.parse(res.data.activitesLuck.awards)
        }

      /*
       * 这里可以发起请求，从服务端获取奖品列 表 
       * 这里使用模拟数据
       */
      console.log('this.myDataLists.length',this.myDataLists.length);
      if (this.myDataLists.length < 12) {
        var isArray = []
        for (let index = this.myDataLists.length; index < 12; index++) {
          isArray.push({prize: "谢谢惠顾", prizeSerialNo: this.myDataLists.length + 1,})
        }
       
       this.myDataLists = [ ...this.myDataLists, ...isArray]
      } 
      this.prizeList = this.formatPrizeList(this.myDataLists)
    },
    // 格式化奖品列表，计算每个奖品的位置
    formatPrizeList(list) {
      console.log("list",list);
      // 记录每个奖的位置
      const angleList = []

      const l = list.length
      /*
       * 计算单个奖项所占的角度
       * console.log('CIRCLE_ANGLE', CIRCLE_ANGLE)
       */

      const average = CIRCLE_ANGLE / l
      // console.log('average', average)

      const half = average / 2
      // console.log('half', half)

      // 循环计算给每个奖项添加style属性
      list.forEach((item, i) => {
        // 每个奖项旋转的位置为 当前 i * 平均值 + 平均值 / 2
        const angle = -(i * average + half)
        /*
         * console.log('angleangleangle', angle)
         * 增加 style
         */
        item.style = `-webkit-transform: rotate(${angle}deg);
                      transform: rotate(${angle}deg);`

        // 记录每个奖项的角度范围
        angleList.push(i * average + half)
      })

      this.angleList = angleList

      return list
    },
    beginRotate(params) {
      if (params === '1') {
        console.log('this.dayLastCount',this.dayLastCount);
        if (this.dayLastCount == 0) {
          this.$toast("抽奖次数已用完")
          return
        }
        this.action = true
        /*
         * this.$toast({
         *   message: `您好,开始抽奖时间是${this.luckstartdate},敬请期待!`,
         *   duration: 3000,
         * })
         * 此代码在旋转完成后弹出抽中的奖项srart
         */
        /*
         * setTimeout(() => {
         *   // this.isNo = true
         *   this.isShow = true
         *   this.action = false
         * }, 4000)
         */

        // 此代码在旋转完成后弹出抽中的奖项end

        /*
         * alert(`您好,开始抽奖时间是${this.luckstartdate},敬请期待!`);
         * return false
         * 添加次数校验
         */
        if (this.dayLastCount === 0) return

        /*
         * 开始抽奖
         * 这里这里向服务端发起请求，得到要获得的奖
         * 可以返回下标，也可以返回奖品 id，通过查询 奖品列表，最终得到下标
         */
        this.getParamsFin()
        // this.index = 5
        // // 减少剩余抽奖次数
        // this.dayLastCount--
        // // 开始旋转
        // this.rotating()

        // 随机获取下标 是一就是二等奖是二就是三等奖
        
      } else if (params === '2' ) {
        this.showMyTime = false
        return
      } else if (params === '3' ) {

        return
      }
    },
   

    async getParamsFin(){
        try {
          let _this = this
        let resData = await api.getGoLottery({ pageRoute: this.ysfPayHtml })
        console.log('抽奖请求', resData)
        // 此处待修改
        if (resData.data == null || resData.data == "") {
            this.$toast('您的网络异常，请刷新后重试')
            this.action = false
            return
        }
        console.log("resData.data.code",resData.data.code);
        if (resData.data.code == 0) {
            if (resData.status == 200) {
              _this.textInfo = resData.data.address
              console.log('_this.textInfo', _this.textInfo);
              this.myNowTime = resData.data.nowTime
              _this.dayLastCount = resData.data.dayLastCount
              console.log("_this.dayLastCount",_this.dayLastCount);
              if (resData.data.data.prize === "谢谢惠顾") {
                if (resData.data.dayLastCount == null || resData.data.dayLastCount == undefined || resData.data.dayLastCount == "") {
                  this.dayLastContent = 0
                }
                  this.dayLastContent = resData.data.dayLastCount
                  setTimeout(() => {
                      this.action = false
                      _this.isNo = true
                  }, 4000)
              }else {
                 if (resData.data.data.awardGroup[0].award.isExpress === 1) {
                      this.myIsShow = true
                      this.styleIsShow = false
                      setTimeout(() => {
                        this.action = false
                        _this.isShow = true
                      }, 4000)
                  }else if(resData.data.data.awardGroup[0].award.isExpress == null){
                    this.styleIsShow = true
                    this.myIsShow = false
                    setTimeout(() => {
                      this.action = false
                      _this.isShowNo = true
                  },4000)
                  }else if(resData.data.data.awardGroup[0].award.isExpress === 2){
                    console.log(78979879);
                    this.myIsShow = false
                     this.styleIsShow = true
                    setTimeout(() => {
                        this.action = false
                        _this.isShow = true
                    }, 4000)
                  }
              }
             
            const contentparams = resData.data.data
            _this.prizeData = contentparams.awardGroup
            _this.myPrize = contentparams.prize
            _this.myCountParams = contentparams.prizeSerialNo

            console.log('_this.myCountParams',_this.myCountParams);
            _this.prizeData.forEach((item)=>{
              _this.myAwardName = item.awardName
              _this.myAwardImgUrl =item.awardImgUrl
            })
            _this.index = _this.myCountParams - 1
            console.log("_this.index",_this.index);
            // 减少剩余抽奖次数
            // _this.dayLastCount--
            // 开始旋转
            
            _this.rotating()
            }else {
              // 抽奖状态不为200
              this.$toast(resData.data.msg)
              this.action = false
            }
            // history.go(0)
        }else if (resData.data.code == 1) {
            console.log("状态为1，重新请求");
            let _this = this
            let res = await api.getFindLotteryById(this.ysfPayHtml)
            //  console.log('res第一次请求2222', res)
         if (res.status == 200) {
            let resData = await api.getGoLottery({ pageRoute: this.ysfPayHtml })
            // console.log('res第二次请求222', resData)
            if (resData.status == 200) {
              _this.textInfo = resData.data.address
              this.myNowTime = resData.data.nowTime
              _this.dayLastCount = resData.data.dayLastCount


                 if (resData.data.data.prize === "谢谢惠顾") {
                if (resData.data.dayLastCount == null || resData.data.dayLastCount == undefined || resData.data.dayLastCount == "") {
                  this.dayLastContent = 0
                }
                  this.dayLastContent = resData.data.dayLastCount
                  setTimeout(() => {
                      this.action = false
                      _this.isNo = true
                  }, 4000)
                
              }else {
                 if (resData.data.data.awardGroup[0].award.isExpress === 1) {
                      this.myIsShow = true
                      this.styleIsShow = false
                      setTimeout(() => {
                        this.action = false
                        _this.isShow = true
                      }, 4000)
                  }else if(resData.data.data.awardGroup[0].award.isExpress == null){
                    this.styleIsShow = true
                    this.myIsShow = false
                    setTimeout(() => {
                      this.action = false
                      _this.isShowNo = true
                  },4000)
                  }else if(resData.data.data.awardGroup[0].award.isExpress === 2){
                    console.log(78979879);
                    this.myIsShow = false
                     this.styleIsShow = true
                    setTimeout(() => {
                        this.action = false
                        _this.isShow = true
                    }, 4000)
                  }
              }
              const contentparams = resData.data.data
              _this.prizeData = contentparams.awardGroup
              _this.myPrize = contentparams.prize
              _this.myCountParams = contentparams.prizeSerialNo
              _this.prizeData.forEach((item)=>{
              _this.myAwardName = item.awardName
              _this.myAwardImgUrl =item.awardImgUrl
              })

              _this.index = _this.myCountParams - 1
              // 减少剩余抽奖次数
              // _this.dayLastCount--
              // 开始旋转
              _this.rotating()
            } else {
              // 抽奖状态不为200
              this.$toast(resData.data.msg)
              this.action = false
            }
         }
        }else if (resData.data.code == 2) {
            this.$toast(resData.data.msg)
            this.action = false
            this.dayLastCount = 0
        }
          
        } catch (error) {
            this.$toast('您的网络异常，请刷新后重试')
            this.action = false
        }
    },
    random(max, min = 0) {
      return parseInt(Math.random() * (max - min + 1) + min)
    },
    rotating() {
      this.$toast("正在获取抽奖结果")
      const { isRotating, angleList, config, rotateAngle, index } = this
      if (isRotating) return
      this.isRotating = true
      // 计算角 度 
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
      console.log("旋转完成");
      this.isRotating = false

      this.prize = prizeList[this.index]

      // console.log(this.prize, this.index);
    },
    // 关闭弹窗
    closeToast() {
      this.prize = null
    },
    // 倒计时
    countdown() {
      const end = Date.parse(new Date(this.luckstartdate))
      const now = Date.parse(new Date())
      if (end - now > 0) {
        this.isMyClassLuky = true
        this.isShowNotice = false
        return 
      }
      // if (end - now < 0) {
      //   alert('活动开始时间不能小于现在时间!')
      //   return false
      // }
      const msec = end - now
      let day = parseInt(msec / 1000 / 60 / 60 / 24)
      let hr = parseInt((msec / 1000 / 60 / 60) % 24)
      let min = parseInt((msec / 1000 / 60) % 60)
      let sec = parseInt((msec / 1000) % 60)
      this.day = day
      let hrs = parseInt(day * 24) + hr
      // console.log(hrs);
      this.hr = hrs > 9 ? hrs : '0' + hrs
      this.min = min > 9 ? min : '0' + min
      this.sec = sec > 9 ? sec : '0' + sec
      const that = this
      this._interval = setTimeout(() => {
        that.countdown()
      }, 1000)
    },
    async getCjData() {
      let res = await api.getCjData({ pageRoute: this.ysfPayHtml })
      console.log('res请求返回的数据 ', res)
      if (res.status == 200) {
        // 结束时间
        const ends = Date.parse(new Date(res.data.activitesLuck.luckenddate))
          const nows = Date.parse(new Date())
          if (ends - nows < 0) {
            this.showEnds = "clos"
          }
          
        // 开始时间
         const end = Date.parse(new Date(res.data.activitesLuck.luckstartdate))
          const now = Date.parse(new Date())
           const msec = end - now
          let day = parseInt(msec / 1000 / 60 / 60 / 24)
          let hr = parseInt((msec / 1000 / 60 / 60) % 24)
          let min = parseInt((msec / 1000 / 60) % 60)
          let sec = parseInt((msec / 1000) % 60)
        if(end - now > 0) {
          this.myStyleTopShow = true
          this.showMyTime = true
          this.myTime = "noTime"
          if(day > 0) {
            this.dayTian = day
            this.dayDhms = "天"
          }
          if (day == 0 && hr >0) {
            this.dayTian = hr
              this.dayDhms = "小时"
          }
          if(day == 0 && hr == 0 && min >0 ) {
            this.dayTian = min
            this.dayDhms = "分钟"
          }
            if(day == 0 && hr == 0 && min == 0 && sec >0 ) {
            this.dayTian = sec
            this.dayDhms = "秒"
          }
        }else {
          this.showMyTime = false
        }
        // this.dayLastCount = res.data.dayLastCount
        this.luckstartdate = res.data.activitesLuck.luckstartdate
        this.luckenddate = res.data.activitesLuck.luckenddate
        this.myDataList = JSON.parse(res.data.activitesLuck.awards)
        console.log('this.myDataList',this.myDataList);
        

        // 播放中奖数据 myTextPa
       res.data.prizelog.forEach((item,index)=>{
        //  console.log("item.isPrize",item.isPrize);
         switch(item.isPrize) {
           case 1:
           this.myTextPa +='\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'+ "恭喜 " + item.phone + " 抽中 " + "特等奖"
           break;
           case 2:
           this.myTextPa +='\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'+ "恭喜 " + item.phone + " 抽中 " + "一等奖"
           break;
           case 3:
           this.myTextPa +='\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'+ "恭喜 " + item.phone + " 抽中 " + "二等奖"
           break;
           case 4:
           this.myTextPa +='\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'+ "恭喜 " + item.phone + " 抽中 " + "三等奖"
           break;
           case 5:
           this.myTextPa +='\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'+ "恭喜 " + item.phone + " 抽中 " + "四等奖"
           break;
           case 6:
           this.myTextPa +='\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'+ "恭喜 " + item.phone + " 抽中 " + "五等奖"
           break;
           case 7:
           this.myTextPa +='\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'+ "恭喜 " + item.phone + " 抽中 " + "六等奖"
           break;
           case 8:
           this.myTextPa +='\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'+ "恭喜 " + item.phone + " 抽中 " + "七等奖"
           break;
           case 9:
           this.myTextPa +='\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'+ "恭喜 " + item.phone + " 抽中 " + "八等奖"
           break;
           case 10:
           this.myTextPa +='\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'+ "恭喜 " + item.phone + " 抽中 " + "九等奖"
           break;
           case 11:
           this.myTextPa +='\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'+ "恭喜 " + item.phone + " 抽中 " + "十等奖"
           break;
           case 12:
          //  this.myTextPa +='\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'+ "恭喜 " + item.phone + " 抽中 " + " 特等奖"
           break;
           default:
           return "";
           break;
         }
        //  this.myTextPa +='\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'+ "恭喜 " + item.phone + " 抽中 " + item.isPrize +  " 等奖"
       })

        this.countdown()
      } else {
        // this.$toast(res.data.msg)
      }
    },
    timestampToTime(timestamp) {
      // 计算年月日时分的函 数
      let date = new Date(timestamp)
      let Y = date.getFullYear() + '-'
      let M = date.getMonth() + 1 + '-'
      let D = date.getDate() + ' '
      let h = date.getHours() + ':'
      let m = date.getMinutes() + ':'
      let s = date.getSeconds()
      return Y + M + D + h + m + s
    },
    wxShare(params) {
      // 点击分享
      if (params == 1 && this.getUrl != "") {
        // 此处使用安卓方法，并将路径返回 去
        this.goParams()
        // window.location.href = this.getUrl ; 
      }else if (params == 2 && this.getUrl != "") {
        this.getInfoParams()
      }else {
          var u = navigator.userAgent;
          var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
          var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
          if (isiOS) {
          window.webkit.messageHandlers.androidWxShare.postMessage('ysfPayHtml'); 
      
          }else if (isAndroid) {
          window.android.androidWxShare('ysfPayHtml')
          }
      }
      



    
   
      /*
       * this.$toast("点击了分享");
       * try {
       *   window.android.androidWxShare()    ;
       * } catch (e) {
       *   console.log("出现错误, 如果在非android环境下访问, 出现该警告是正常的");
       * }
       */
    },
    // 点击签到触发事件
    clickQd() {
      console.log("签到");
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isiOS) {
      window.webkit.messageHandlers.androidWxShare.goToSigIn(); 
  
      }else if (isAndroid) {
      window.android.goToSigIn()
      }
    },
    // 跳转中奖记录页面
    WinningRecord() {
      this.$router.push({ name: 'myprize' })
      // this.$router.push({ name: 'syx' })
    },
    onClickLeft() {
      Toast('返回')
    },
    onClickRight() {
      Toast('按钮')
    }
  }
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
  overflow-x: hidden;
  color: #fff;
  background-color: #d4131a;
  position: relative;
}
.fixed-right {
  position: fixed;
  top: 35%;
  right: 0;
  transform: translateY(-50%);
  width: 200px;
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
  box-sizing: border-box;
  /* height: 1300px; */
  background-image: url('../assets/img/contentbgys.png');
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
.wheel-bgpan {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 200px;
  height: 200px;
  background-color: yellow;
  background: url('../assets/img/qianqian.png') no-repeat;
  background-size: 100% 100%;
  z-index: 999;
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
.wheel-pointers {
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
.wheel-pointers p {
  font-size: 30.8px;
  color: #fff;
}
.wheel-pointers .wheel-p2 {
  padding-top: 148.5px;
  margin-bottom: 5px;
}
.wheel-pointers .wheel-p4 {
  padding-top:170px;
  margin-bottom: 5px;
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
  background: url('../assets/img/panpanys.png') no-repeat center top;
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
/* 中奖记录 */
.prize-rig {
  position: absolute;
  right: 0;
  bottom: 20px;
  color: #c8201e;
  font-weight: 700;
  width: 140px;
  height: 50px;
  line-height: 55px;
  border-radius: 25px 0 0 25px;
  background-color: orange;
}
.prize-k {
  position: absolute;
  right: -140px;
  top: 0;
  width: 150px;
  height: 50px;
  line-height: 55px;
  background-color: orange;
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
  margin-top: 0;
}
.jpsm {
  padding-bottom: 10px;
}
.jpsm-div12 {
  width: 666px;
  /* height: 483px; */
  background: #ffffff;
  border-radius: 40px;
  margin: 0 auto;
  margin-top: 0px;
  padding-top: 48px;
  padding-bottom: 20px;
}
.jpsm-div12 .img-t {
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
.jpsm-div12 .p-b1 {
  font-size: 32px;
  font-family: PingFang SC, PingFang SC-Regular;
  font-weight: 400;
  text-align: left;
  color: #999999;
  padding: 0 10px;
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
/* 添加新增样式start */
.kjName {
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 1.8;
  margin: auto;
  border: 5px solid #e0261b;
  border-radius: 25px;
  margin-top: 20px;
}
.jpsm-info {
  width: 666px;
  /* height: 483px; */
  background: #ffffff;
  border-radius: 40px;
  margin: 0 auto;
  margin-top: -80px;
  padding-top: 48px;
  padding-bottom: 30px;
}
.jpsm-div ul {
  margin-top: 20px;
  width: 100%;
  height: 100%;
}
.jpsm-div ul li {
  width: 100%;
  text-align: left;
  color: black;
}
.jpsm-le {
  text-align: center;
  font-weight: 700;
  color: #b1562e;
  font-size: 36px;
}
.jpsm-ri {
  width: 50%;
  height: 50px;
  float: left;
  margin-bottom: 20px;
}
.jpsm_can {
  float: left;
  width: 75%;
}
.jpsm-ri span {
  width: 100%;
  height: 50px;
  display: inline-block;
  margin-bottom: 40px;
  overflow: hidden; /*自动隐藏文字*/
  text-overflow: ellipsis;/*文字隐藏后添加省略号*/
  white-space: nowrap;/*强制不换行*/
}
.jpsm-ri span img {
  display: inline-block;
  width: 30px;
  height: 50px;
  vertical-align: middle;
}
.kjName-scro {
  width: 90%;
  border-radius: 25px;
  overflow: hidden;
  margin: 20px auto 40px;
}

.popup-content {
  width: 80%;
  /* height: 700px;  */
  border-radius: 20px;
  padding-bottom: 70px;
}
.popupContent-img {
  position: relative;
  z-index: 2004;
  position: relative;
  width: 100%;
  height: 150px;
  text-align: center;
}
.img-popup {
 margin-top: -150px;
  width: 350px;
}
.popupContent-img .img-2{
  z-index: 2005;
  position: absolute;
  top: 30px;
  left: 50%;
  width: 100px;
  height: 100px;
  transform: translateX(-40%);
}
.popupContent-img .img-1 {
  z-index: 2004;
  position: absolute;
  left: 50%;
  top: -105%;
  transform: translate(-50%, 0);
  width: 330px;
  height: 224px;
}
.popupContent-img1 {
  z-index: 2004;
  position: relative;
  width: 100%;
  height: 100px;
  text-align: center;
}
.popupContent-img1 img {
  z-index: 2004;
  position: absolute;
  left: 50%;
  top: -200%;
  transform: translate(-50%, 0);
  width: 330px;
  height: 224px;
}
/deep/ .van-popup {
  overflow-y: visible;
}
/deep/ .van-field--min-height .van-field__control {
  min-height: 27px;
}
.popupImg-list {
  width: 100%;
  padding: 0 10px;
  text-align: left;
}
.my-flowul {
  width: 100%;
  height: 400px;
  padding: 0 10px;
}
.my-flowuls1 {
  width: 100%;
  height: 200px;
  padding: 0 10px;
}
.popupImg-list h3 {
  width: 100%;
  height: 30px;
}

.popupImg-list ul {
  width: 100%;
  height: 350px;
  padding: 0 20px;
}
.popupImg-list ul li {
  text-align: center;
  float: left;
  width: 25%;
  height: calc(50%);
  margin-bottom: 8px;
}
.popupImg-list ul li p {
  margin-top: 10px;
}
.popupImg-list ul li img {
  display: block;
  width: 50%;
  height: 50%;
  margin: auto;
}
.radio-btn {
  width: 50px;
  height: 50px;
  margin-left: 57%;
  margin-top: 0px;
  transform: translate(-50%, 0);
}
.btn-commit {
  width: 90%;
  margin: auto;
  margin-top: 10px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  font-size: 40px;
  background-image: url(../assets/img/btn.png) !important;
  background-repeat: no-repeat;
  /* background: url(../assets/img/btn.png) no-repeat; */
  background-size: 100% 80px;
}
.btn-commit1 {
  width: 90%;
  margin: auto;
  margin-top: 10px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  color: bla;
  font-size: 40px;
  background-image: url(../assets/img/btn.png) !important;
  background-repeat: no-repeat;
  /* background: url(../assets/img/btn.png) no-repeat; */
  background-size: 100% 80px;
  background-position: center;
}
.myStyleCl {
  margin-top: 80px !important;
}
.btn-commit img {
  width: 100%;
  height: 100%;
}
.close-btn {
  margin-top: 200px;
  margin-left: 50%;
  transform: translateX(-50%);
  width: 70px;
  height: 100px;
  background: url(../assets/img/close.png) no-repeat;
  background-position: bottom;

  background-size: 70px 150px;
}
.close-btn img {
  margin-top: 150px;
  display: block;
  width: 70px;
  height: 150px;
}

.popup-noprize {
  width: 80%;
  /* height: 400px; */
  border-radius: 20px;
  padding-top: 50px;
}

.close-btn1 {
  margin-top: 30px;
  margin-left: 50%;
  transform: translateX(-50%);
  width: 70px;
  height: 150px;
  background-image: url(../assets/img/close.png);
  background-size: 70px 150px;
}
.van-nav-bar .van-icon {
  color: #fff;
}
.van-nav-bar__title {
  color: #fff;
}
.van-notice-bar {
  border-radius: 25px;
}
.isShowPup {
  pointer-events: none;
  cursor:pointer
}
.van-cell {
  background-color: #F3F0F3;
  border-radius: 10px;
  width: 90%;
  margin: auto;
  height: 60px;
}
.myStyleTop {
  margin-top: 0px !important;
}
.myStyleB {
  margin-bottom: 50px;
}
.kjName-scro[data-v-ca6f4308] {
      margin: 0.53333rem auto 0.6rem;
}
.myClassLuky{
   background-size: 100% 120%;
}
.box-ul {
  width: 100%;
}
.box-li {
    float: left;
    width: 100%;
}
.jpsm-le {
  text-align: center;
}
.jpsm_can1 {
  width: 100%;
}
.jpsm-ri1 {
  width: 100%;
}
.sp-box1 {
    box-sizing: border-box;
    margin: 20px 0;
    padding: 0 20px;
    text-align: center;
    float: left;
    display: inline-block;
    width: 33%;
}
.jpsm-ri1 span img {
  display: block;
  border-radius: 10%;
  margin: auto;
  width: 111px;
  height: 111px;
  vertical-align: middle;
}
.spa-box {
  display: inline-block;
  width: 100%;
  height: 80px;
  overflow:hidden;
  text-overflow:ellipsis; 
  /* white-space:nowrap;  */
  display:-webkit-box;        
  -webkit-box-orient:vertical;   
  -webkit-line-clamp:2;  
}
.myStyleTop1 {
    margin-top: 50px;
}
/* 添加新增样式end */

.jpsm1 {
  padding-top: 90px;
  /* padding-bottom: 60px; */
}
.jpsm-div11 {
  width: 666px;
  height: 816px;
  background-image: url('../assets/img/jianping.png');
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  margin: 0 auto;
  margin-top: -90px;
}
.jpsm-div {
  width: 666px;
  /* height: 483px; */
  background: #ffffff;
  border-radius: 40px;
  margin: 0 auto;
  padding-top: 48px;
  padding-bottom: 30px;
}
.jpsm-divBox {
  width: 100%;
  height: 50px;
  color: #000;
  font-size: 20px;
  margin-bottom: 10px;
  /* background-color: skyblue; */
}
.jpsm-divBox1 {
  display: inline-block;
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 30px;
  text-align: center;
  color: #fff;
  /* background-color: skyblue; */
}
.jpsm-divBox2 {
  display: inline-block;
  width: 30%;
  height: 50px;
  line-height: 50px;
  font-size: 30px;
  color: #16B6E8;
  /* background-color:  skyblue;   */
}
.toppara {
  margin-top: 20px;
}
.jpsm1class {
  padding-top: 140px;
}
</style>
