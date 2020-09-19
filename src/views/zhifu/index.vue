<template>
  <div class="container main">
    <div class="top-bg">
      <div class="lucky-title">
        <p>0元博豪礼</p>
        <p class="p1">惊喜享不停</p>
      </div>
    </div>
    <div class="input-phone">
      <van-field v-model="phone" placeholder="请输入手机号" error-message />
    </div>
    <div @click="goToPay" class="zhifuzg">支付1元获取抽奖资格</div>
    <div class="lingshi">
      <img src="../../assets/img/lingshi.png" alt />
    </div>
    <div class="jpsm">
      <div class="jpsm-div flex column middle">
        <div class="img-t">奖品说明</div>
        <img class="img-b" src="../../assets/img/noliwu.png" alt />
        <p class="p-b">具体以开奖信息为准</p>
      </div>
    </div>
    <!-- <div @click="callPhone()" class="phone-btn"></div> -->
  </div>
</template>
<script>
import api from "@/api/user";
import validate from "../../utils/validate";
export default {
  data() {
    return {
      phone: "",
      url: "",
      ysfPayHtml: "ysfPayHtml"
    };
  },
  created() {},
  mounted() {},

  methods: {
    callPhone() {
      // window.location.href = "tel://" + phoneNumber;
      this.$router.push({
        path: `/huodonglc/${this.id}`
      });
    },
    async goToPay() {
      if (!validate.mobile(this.phone, this)) {
      } else {
        let res = await api.goToPay({
          account: this.phone,
          pageRoute: this.ysfPayHtml
        });
        if (res.status == 200) {
          switch (res.data.code) {
            case 0:
              this.$toast(`您还未报名,正在前往报名页面...`);
              setTimeout(function() {
                this.url = res.data.url;
                window.location.href = res.data.url;
              }, 1500);

              break;
            case 1:
              this.$toast(res.data.msg);
              break;
            case 2:
              this.$toast(`正在前往支付,请稍等...`);
              setTimeout(function() {
                this.url = res.data.url;
                window.location.href = res.data.url;
              }, 500); 
              break;
            case 3:
              this.$toast(res.data.msg);
              break;
          }

          // console.log("支付", res);
        } else {
          this.$toast(res.data.msg);
        }
      }
    }
  }
};
</script>
<style scoped>
.lingshi {
  margin-bottom: 120px;
}
.lingshi img {
  width: 626px;
  height: 626px;
}
.container {
  width: 100%;
  height: 100%;
  /* overflow: hidden; */
  color: #fff;
  background-color: #d4131a;
  position: relative;
}
.top-bg {
  width: 100%;
  height: 700px;
  background-image: url("../../assets/img/zhifubg.png");
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.lucky-title {
  text-align: center;
  padding-top: 57px;
  font-size: 100px;
  color: #fff;
  font-weight: bold;

  margin-bottom: 380px;
  text-shadow: 0px 1px 0px #c8201e, 0px 2px 0px #c8201e, 0px 3px 0px #c8201e,
    0px 4px 0px #c8201e, 0px 5px 0px #c8201e, 0px 6px 0px #c8201e,
    0px 7px 0px #c8201e, 0px 8px 7px #c8201e;
}
.lucky-title .p1 {
  text-align: center;
  font-size: 80px;
  color: #fff;
  font-weight: bold;
  text-shadow: 0px 1px 0px #c8201e, 0px 2px 0px #c8201e, 0px 3px 0px #c8201e,
    0px 4px 0px #c8201e, 0px 5px 0px #c8201e, 0px 6px 0px #c8201e,
    0px 7px 0px #c8201e, 0px 8px 7px #c8201e;
  margin-bottom: 30px;
}

.jpsm {
  padding-bottom: 60px;
}
.jpsm-div {
  width: 686px;
  height: 483px;
  background: #ffffff;
  border-radius: 40px;
  margin: 0 auto;
  margin-top: -80px;
  padding-top: 48px;
}
.jpsm-div .img-t {
  width: 293px;
  height: 60px;
  display: block;
  line-height: 60px;
  background-image: url("../../assets/img/title.png");
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  font-size: 36px;
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
.input-phone {
  width: 686px;
  height: 98px;
  margin: 0 auto;
  margin-bottom: 30px;
  /* padding-top: 20px; */
  margin-top: -90px;
  box-sizing: border-box;
}
.van-cell {
  width: 100%;
  height: 100%;
  background: #ffffff;
  border-radius: 49px;
  font-size: 16px;
  padding-top: 0.7rem;
}
.zhifuzg {
  width: 686px;
  height: 98px;
  line-height: 98px;
  font-size: 32px;
  font-family: PingFang SC, PingFang SC-Bold;
  font-weight: 700;
  text-align: center;
  color: #a50000;
  background-image: url("../../assets/img/zhifubtn.png");
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  margin: 0 auto;
  margin-bottom: 50px;
}
.phone-btn {
  position: absolute;
  top: 66%;
  right: 0;
  transform: translateY(-50%);
  width: 110px;
  height: 110px;
  background-image: url("../../assets/img/btnphone.png");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>

