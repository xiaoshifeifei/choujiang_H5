<template>
  <!-- :style="{ height: bodyHeight + 'px' }" -->
  <div class="Box1 wraps">
    <div class="mains">
      <img class="imgone" src="../../assets/img/iibg1.png" alt />
      <!-- <img class="imgtwo" src="../../assets/img/nd.png" alt /> -->
      <div class="from-box flex middle center">
        <div v-if="!isEnd" class="from">
          <div class="input-box flex middle center">
            <div class="from-input" style="flex:1;">
              <van-field v-model="phone" type="number" placeholder="请输入手机号" error-message />
              <!-- <input class="new-input" placeholder="请输入手机号" type="text" /> -->
            </div>
          </div>

          <div class="input-box flex middle center">
            <div class="from-input" style="flex:1;">
              <van-field v-model="code" type="number" placeholder="请输入验证码" error-message />
              <!-- <input class="new-input" placeholder="请输入手机号" type="text" />  -->
            </div>
            <div v-if="isShowGetCode" @click="getCode()" class="code-btn">获取验证码</div>
            <div v-else class="code-btn">已获取({{ countdown }}s)</div>
          </div>

          <div class="input-box flex middel center">
            <!-- <div id="copy-txt">
              <span>
                {{itemVal}}
              </span>
              haizhiliao前方高能预警，朋友圈文案在这里哦：**放大招，一分坐公交，还能领红包 ！
            </div> -->
            <div @click="signUp" class="from-inputh flex middle center">立即注册</div>
          </div>
        </div>
        <div v-else class="activity-no">
          <p style="color:#fff;">{{ text }}</p>
          <img src="../../assets/img/noactivity.png" alt />
        </div>
      </div>
      <!-- <img class="imgthree" src="../../assets/img/ch.png" alt /> -->
    </div>
    <!-- 弹窗 -->
    <div class="message" v-if="isSuccess">
      <div class="message-dialog">
        <div class="message-content">
          <div class="message-header">
            <img src="../../assets/img/titleicon.png" alt />
          </div>
          <div class="message-body">
            <div class="message-body-content">
              <p class="message-title">参与成功</p>
              <p class="message-xq">下载木知了app注册登录即可抽奖啦，注册需与提交用户信息一致哦！</p>
            </div>
          </div>
          <div class="message-footer flex middle center">
            <div @click="goToDown()" class="message-bg-box message-bg">立即下载</div>
          </div>
        </div>
        <img @click.prevent="closeBtn()" class="close" src="../../assets/img/close.png" alt />
      </div>
    </div>
    <!-- 弹窗2 -->
    <div class="message" v-if="isCanjia">
      <div class="message-dialog">
        <div class="message-content">
          <div class="message-header">
            <img src="../../assets/img/titleicon.png" alt />
          </div>
          <div class="message-body">
            <div class="message-body-content">
              <p class="message-title">该手机号已经报名成功啦</p>
              <p class="message-xq">下载木知了app注册登录即可抽奖啦，注册需与提交用户信息一致哦！</p>
            </div>
          </div>
          <div class="message-footer flex middle center">
            <div @click="closeMsg()" class="message-bg-box message-new flex-1">重新输入用户信息</div>
            <div @click="goToDown()" class="message-bg-box message-new-xz">立即下载</div>
          </div>
        </div>
        <img @click.prevent="closeMsg1()" class="close" src="../../assets/img/close.png" alt />
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/user'
import validate from '../../utils/validate'
export default {
  data() {
    return {
      id: '',
      intermeId: '',
      huoDongSm: '',
      phone: '',
      code: '',
      countdown: 60,
      timer: '',
      isShowGetCode: true,
      isSuccess: false,
      isCanjia: false,
      isEnd: false,
      tel: '18060703873',
      text: '暂无活动!',
      type: '',
      yqCode: '',
      qdId: '',
      ysfexclusivelink: '',
      downUrl: '',
      isStatus: false,  //显示状态
      itemVal: '',  // 邀请码
      loading: false,
    }
  },
  mounted() {
    // var yqCode = validate.getQueryVariable('yqCode')
    // this.bodyHeight = document.documentElement.clientHeight + 50
    var qdCode = validate.getQueryVariable('qdCode')

    this.qdId = qdCode
    if (qdCode != null) {
      this.intermeId = qdCode.substring(0, qdCode.length - 4)
    }

    this.id = validate.getQueryVariable('activitesId')
    this.type = validate.getQueryVariable('type')
    this.yqCode = validate.getQueryVariable('yqCode')
    // this.getInfoBox()
    // this.getUrl()
  },
  methods: {
    closeBtn() {
      this.isSuccess = false
      this.phone = ''
      this.code = ''
    },
    async getInfoBox() {
      let res = await api.getInfo({ id: this.id })
      if (res.status == 200) {
        if (res.data.existence == 0) {
          this.isEnd = false
        } else if (res.data.existence == 1) {
          this.isEnd = true
          this.text = '来早啦，活动还未开始'
        } else {
          this.isEnd = true
          this.text = '很遗憾，来晚了，活动已结束了'
        }
        this.huoDongSm = res.data.remarks
      } else {
        if (res.msg) {
          this.$toast(res.msg)
        }
      }
    },
    async getCode() {
      if (!validate.mobile(this.phone, this)) {
      } else {
        this.countDown()
        this.isShowGetCode = false
        let res = await api.getCode({ phone: this.phone, type: '' })
        if (res.status == 200) {
          this.$toast({
            message: res.data,
            duration: 2000,
          })
        } else {
          this.$toast(res.data)
        }
      }
    },
    countDown() {
      const self = this
      this.timer = setInterval(() => {
        self.countdown--
        if (self.countdown === 0) {
          clearInterval(self.timer)
          self.countdown = 60
          self.isShowGetCode = true
        }
      }, 1000)
    },
    async getUrl() {
      let res = await api.getUrl({ intermeCode: this.qdId })
      if (res.status == 200) {
        this.ysfexclusivelink = res.data.ysfexclusivelink
      } else {
        this.$toast(res.msg)
      }
    },
    async signUp() {
      console.log("this.yqCode",this.yqCode);
      if (this.code == '') {
        this.$toast('请输入验证码')
        return false
      }
      if (!validate.mobile(this.phone, this)) {
      } else {
        console.log("this.yqCode",this.yqCode);
        if (this.yqCode ==null || this.yqCode == undefined || this.yqCode == '') {
          this.$toast("邀请码不能为空");
          return false
        }
        this.loading = true

        await api
          .newSignUp({
            account: this.phone,
            captcha: this.code,
            inviteesCode: this.yqCode,
            password: '88888888',
          })
          .then((res) => {
            if (res.msg == '验证码错误'||res.msg=='请先获取验证码') {
              this.$toast(res.msg)
              return false
            }
            if (process.env.NODE_ENV == 'development') {
              this.loading = false
              window.location.href = 'http://lutuchoujiangwebtest.qmwlxcx.com/#/down'
            } else {
              this.loading = false
              window.location.href = 'http://lutuchoujiangweb.hizhiliao.cn/#/down'
            }
          })
          .catch(() => {
             if (res.msg == '验证码错误'||res.msg=='请先获取验证码') {
              this.$toast(res.msg)
              return false
            }
          
            if (process.env.NODE_ENV == 'development') {
              this.loading = false
              window.location.href = 'http://lutuchoujiangwebtest.qmwlxcx.com/#/down'
            } else {
              this.loading = false
              window.location.href = 'http://lutuchoujiangweb.hizhiliao.cn/#/down'
            }
          })
          .finally((res) => {
            // console.log('res',res);
            //   if (res.msg == '验证码错误'||  res.msg=='请先获取验证码') {
            //   this.$toast(res.msg)
            //   return false
            // }
          
            // if (process.env.NODE_ENV ==  'development') {
            //   window.location.href = 'http://lutuchoujiangwebtest.qmwlxcx.com/#/down'
            // } else {
            //   window.location.href = 'http://lutuchoujiangweb.hizhiliao.cn/#/down'
            // }
          })
      }
    },
    closeMsg() {
      this.isCanjia = false
      this.phone = ''
      this.code = ''
    },
    closeMsg1() {
      this.isCanjia = false
    },
    goToDown() {
      window.location.href = this.downUrl
      // this.$router.push({ path: `/mzldown?qdId=${this.qdId}` })
    },
    callPhone() {
      // window.location.href = "tel://" + phoneNumber ;
      this.$router.push({
        path: `/huodonglc/${this.id}/${this.qdId}`,
      })
    },
  },
}
</script>
<style>
.Box1 .van-field__control {
  color: #fff !important;
}
.Box1 input[type='text']::placeholder {
  color: #fff !important;
}
</style>
<style scoped lang="less" type="text/less">
.Box {
  width: 100%;
  height: 100%;
  background-color: #fff1b6 !important;
  .title {
    padding-top: 40px;
    position: relative;
    z-index: 1;
    background-image: url('../../assets/img/ibg2.png');
    background-position: center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 730px;
    .pc {
      background: linear-gradient(180deg, #ffffff, #ffc280);
      -webkit-background-clip: text;
      color: transparent;
      font-weight: bold;
      letter-spacing: 5px;
      // text-shadow: 5px 2px 2px #fff #ffc280;
    }
    .p1 {
      font-size: 105px;
    }
    .p2 {
      font-size: 80px;
      // margin-top: 10px;
      margin-bottom: 30px;
    }
    .pcx {
      font-size: 37px;
      font-family: HYYakuHei, HYYakuHei-75W;
      font-weight: bold;
      color: #ffcf9b;
      text-shadow: 0px 9px 8px 0px rgba(240, 51, 40, 0.5);
      letter-spacing: 5px;
    }
    .p3 {
      margin-bottom: 20px;
    }
    .p4 {
      margin-bottom: 100px;
    }
    .bannerBox {
      padding: 0 60px;
      .banner {
        height: 117px;
        line-height: 100px;
        text-align: center;
        background-image: url('../../assets/img/banner.png');
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        font-size: 26px;
        font-family: FZLanTingHei-B-GBK, FZLanTingHei-B-GBK-Regular;
        font-weight: bold;
        color: #ffea97;
        letter-spacing: 2px;
      }
    }
    .phone-btn {
      position: absolute;
      // top: -120px;
      right: 0;
      width: 110px;
      height: 110px;
      background-image: url('../../assets/img/btnphone.png');
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    }
  }
  .mains {
    background-color: #fff1b6 !important;
    .huodong {
      margin-top: 120px;
      .title-huodong {
        font-size: 40px;
        font-family: Source Han Sans CN, Source Han Sans CN-Bold;
        font-weight: bold;
        text-align: center;
        color: #e74435;
      }
      .text-box {
        padding-left: 111px;
        padding-right: 100px;
        padding-top: 20px;
        letter-spacing: 10px;
        .div-html {
          font-size: 32px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: bold;
          text-align: left;
          color: #e74435;
          line-height: 39px;
        }
        p {
          font-size: 32px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: bold;
          text-align: left;
          color: #e74435;
          line-height: 39px;
        }
        .p-middle {
          margin-top: 10px;
          margin-bottom: 10px;
        }
      }
    }
    .from-box {
      margin-top: 80px;
      position: relative;
      img {
        display: block;
      }
      .activity-no {
        img {
          width: 346px;
          height: 286px;
        }
        p {
          margin-top: 35px;
          font-size: 26px;
          font-family: Source Han Sans CN, Source Han Sans CN-Bold;
          font-weight: 700;
          text-align: center;
          color: #e74435;
        }
      }
      .from {
        width: 750px;
        // height: 546px;
        background-image: url('../../assets/img/frombg.png');
        background-position: center;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        .from-title {
          margin-top: 70px;
          img {
            width: 32px;
            height: 32px;
          }
          .from-text {
            margin-left: 20px;
            margin-right: 20px;
            font-size: 35px;
            font-family: PingFang SC, PingFang SC-Bold;
            font-weight: bold;
            color: #333333;
          }
        }
        .input-box {
          margin-top: 30px;
          padding: 0 80px !important;
          .from-input {
            width: 580px;
            // height: 76px;
            background: #f0f4ff !important;
            font-size: 26px;
            .van-cell {
              background: #f0f4ff !important;
              height: 38px;
              padding: 0;
              padding-top: 7px;
              padding-left: 10px;
              border-radius: 15px;
            }
          }
          .from-inputh {
            width: 580px;
            height: 80px;
            background: #ffa63d !important;
            color: #fff;
            border-radius: 10px;
            font-size: 32px !important;
          }
          .code-btn {
            width: 200px;
            height: 76px;
            line-height: 76px;
            text-align: center;
            background: #ffa63d;
            border-radius: 10px;
            color: #ffffff;
            margin-left: 10px;
            font-size: 32px;
           
          }
          .new-input {
            padding-left: 20px;
            width: 100%;
            height: 76px;
            border-radius: 10px;
          }
        }
      }
    }
  }

  // 弹窗
  // 弹窗
  .message {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: table;
    visibility: visible;
    background-color: rgba(0, 0, 0, 0.6);
    .message-dialog {
      width: 622px;
      height: 495px;
      background: #ffffff;
      border-radius: 20px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 9999;
      .close {
        position: absolute;
        left: 50%;
        bottom: -120px;
        transform: translateX(-50%);
        z-index: -1;
        height: 200px;
      }
      .message-content {
        max-width: 540px;
        margin: 0px auto;
        background-color: #fff;
        border-radius: 20px;
        box-sizing: border-box;
        .message-header {
          img {
            margin-top: -112px;
            width: 320px;
            height: 224px;
          }
        }
        .message-body {
          position: relative;
          max-height: 300px;
          overflow: auto !important;
          .message-body-content {
            .message-title {
              text-align: center;
              font-size: 32px;
              font-family: PingFang SC, PingFang SC-Bold;
              font-weight: bold;
              text-align: center;
              color: #333333;
              margin-bottom: 32px;
              margin-top: 35px;
            }
            .message-xq {
              margin-bottom: 70px;
              font-size: 24px;
              font-family: PingFang SC, PingFang SC-Regular;
              text-align: center;
              color: #333333;
            }
          }
        }
        .message-footer {
          margin-bottom: 46px;
          .message-bg-box {
            height: 76px;
            line-height: 76px;
            background-image: url('../../assets/img/btn.png');
            background-position: center;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            color: #fff;
            font-size: 28px;
            font-family: PingFang SC, PingFang SC-Bold;
            font-weight: bold;
            text-align: center;
          }
          .message-bg {
            width: 542px;
          }
          .message-new {
            width: 311px;
          }
          .message-new-xz {
            width: 200px;
            margin-left: 20px;
          }
        }
      }
    }
  }
}
.Box1 {
  width: 100%;
  min-height: 100%;
  z-index: 1;
  background-color: #e84143;

  background-image: url('../../assets/img/ibgb1.png');

  // background-image: url('../../assets/img/hdbg.png')  ;

  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
  .title {
    padding-top: 40px;
    position: relative;
    height: 730px;
    .pc {
      background: linear-gradient(180deg, #ffffff, #ffc280);
      -webkit-background-clip: text;
      color: transparent;
      font-weight: bold;
      letter-spacing: 5px;
      // text-shadow: 5px 2px 2px #fff #ffc280;
    }
    .p1 {
      font-size: 105px;
    }
    .p2 {
      font-size: 80px;
      // margin-top: 10px;
      margin-bottom: 30px;
    }
    .pcx {
      font-size: 37px;
      font-family: HYYakuHei, HYYakuHei-75W;
      font-weight: bold;
      color: #ffcf9b;
      text-shadow: 0px 9px 8px 0px rgba(240, 51, 40, 0.5);
      letter-spacing: 5px;
    }
    .p3 {
      margin-bottom: 20px;
    }
    .p4 {
      margin-bottom: 100px;
    }
    .bannerBox {
      padding: 0 60px;
      .banner {
        height: 117px;
        line-height: 100px;
        text-align: center;
        background-image: url('../../assets/img/banner.png');
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        font-size: 26px;
        font-family: FZLanTingHei-B-GBK, FZLanTingHei-B-GBK-Regular;
        font-weight: bold;
        color: #ffea97;
        letter-spacing: 2px;
      }
    }
    .phone-btn {
      position: absolute;
      // top: -120px;
      right: 0;
      width: 110px;
      height: 110px;
      background-image: url('../../assets/img/btnphone.png');
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    }
  }
  .mains {
    // background-color: #fff1b6 !important;
    .imgone {
      margin-top: 130px;
      width: 622px;
      height: 400px;
      margin-bottom: 40px;
    }
    .imgtwo {
      margin-top: 50px;
      width: 709px;
      height: 113px;
      margin-bottom: 67px;
    }
    .imgthree {
      width: 610px;
      height: 376px;
      margin-top: 30px;
    }
    .zanw {
      height: 600px;
      width: 100%;
    }
    .huodong {
      margin-top: 120px;
      .title-huodong {
        font-size: 40px;
        font-family: Source Han Sans CN, Source Han Sans CN-Bold;
        font-weight: bold;
        text-align: center;
        color: #e74435;
      }
      .text-box {
        padding-left: 111px;
        padding-right: 100px;
        padding-top: 20px;
        letter-spacing: 10px;
        .div-html {
          font-size: 32px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: bold;
          text-align: left;
          color: #e74435;
          line-height: 39px;
        }
        p {
          font-size: 32px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: bold;
          text-align: left;
          color: #e74435;
          line-height: 39px;
        }
        .p-middle {
          margin-top: 10px;
          margin-bottom: 10px;
        }
      }
    }
    .from-box {
      // margin-top:10px;
      // position: relative;
      .activity-no {
        img {
          width: 346px;
          height: 286px;
        }
        p {
          margin-top: 35px;
          font-size: 26px;
          font-family: Source Han Sans CN, Source Han Sans CN-Bold;
          font-weight: 700;
          text-align: center;
          color: #e74435;
        }
      }
      .from {
        // width: 750px;
        // height: 546px;
        // background-image: url("../../assets/img/frombg.png");
        // background-position: center;
        // background-size: 100% 100%;
        // background-repeat: no-repeat;
        width: 550px;
        // height: 199px;
        background: #ff8a8b;
        border-radius: 10px;
        background-color: #FF8C6E;
        // position:absolute;
        // top: 50%;
        // left: 50%;
        // transform: translate(-50%,-50%);
        .from-title {
          margin-top: 70px;
          img {
            width: 32px;
            height: 32px;
          }
          .from-text {
            margin-left: 20px;
            margin-right: 20px;
            font-size: 35px;
            font-family: PingFang SC, PingFang SC-Bold;
            font-weight: bold;
            color: #333333;
          }
        }
        .input-box {
          margin-top: 15px;
          padding: 0 20px !important;
          margin-bottom: 15px;
          .from-input {
            width: 580px;
            // height: 76px;
            // background: #f0f4ff !important;
            background: #FF9A80 !important;
            font-size: 26px;
            .van-cell {
              // background: #ff9798 !important;
               background: #FF9A80 !important;
              height: 30px;
              padding: 0;
              padding-top: 3px;
              padding-left: 10px;
              color: #fff !important;
              // border-radius: 15px;
            }
          }
          .from-inputh {
            width: 580px;
            height: 60px;
            // background: #9e2b31 !important;
            background: #FF724D !important;
            color: #fff;
            border-radius: 10px;
            font-size: 28px !important;
          }
          .code-btn {
            width: 200px;
            height: 60px;
            line-height: 60px;
            text-align: center;
            background: #9e2b31;
            border-radius: 10px;
            color: #ffffff;
            margin-left: 10px;
            font-size: 28px;
            background-color: #FF724D;
          }
          .new-input {
            padding-left: 20px;
            width: 100%;
            height: 76px;
            border-radius: 10px;
          }
        }
      }
    }
  }

  // 弹窗
  // 弹窗
  .message {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: table;
    visibility: visible;
    background-color: rgba(0, 0, 0, 0.6);
    .message-dialog {
      width: 622px;
      height: 495px;
      background: #ffffff;
      border-radius: 20px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 9999;
      .close {
        position: absolute;
        left: 50%;
        bottom: -120px;
        transform: translateX(-50%);
        z-index: -1;
        height: 200px;
      }
      .message-content {
        max-width: 540px;
        margin: 0px auto;
        background-color: #fff;
        border-radius: 20px;
        box-sizing: border-box;
        .message-header {
          img {
            margin-top: -112px;
            width: 320px;
            height: 224px;
          }
        }
        .message-body {
          position: relative;
          max-height: 300px;
          overflow: auto !important;
          .message-body-content {
            .message-title {
              text-align: center;
              font-size: 32px;
              font-family: PingFang SC, PingFang SC-Bold;
              font-weight: bold;
              text-align: center;
              color: #333333;
              margin-bottom: 32px;
              margin-top: 35px;
            }
            .message-xq {
              margin-bottom: 70px;
              font-size: 24px;
              font-family: PingFang SC, PingFang SC-Regular;
              text-align: center;
              color: #333333;
            }
          }
        }
        .message-footer {
          margin-bottom: 46px;
          .message-bg-box {
            height: 76px;
            line-height: 76px;
            background-image: url('../../assets/img/btn.png');
            background-position: center;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            color: #fff;
            font-size: 28px;
            font-family: PingFang SC, PingFang SC-Bold;
            font-weight: bold;
            text-align: center;
          }
          .message-bg {
            width: 542px;
          }
          .message-new {
            width: 311px;
          }
          .message-new-xz {
            width: 200px;
            margin-left: 20px;
          }
        }
      }
    }
  }
}
.wraps {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  width: 100%;
  // height: 100%;
}
//  /deep/ .Box1 .mains .from-box .from .input-box .from-input .van-cell[data-v-f1609a66] {

// }
</style>
