<template>
  <div class="wrap pad">
    <div class="main content">
      <div class="title-bg">用户协议</div>
      <pre class="proud">   
第1条 本站服务条款的确认和接纳
1.1 .....
1.2 .....
1.3 .....
1.4 .....
第2条 本站服务
2.1......
2.2......
2.3......
第3条 用户信息
3.1......
3.2......
3.3......
第4条 用户依法言行义务
4.1......
4.2......
4.3......
4.4......
4.5......
第5条  商品信息
5.1......
5.2......
5.3......
5.4......
5.5......
第5条  商品信息
5.1......
5.2......
5.3......
5.4......
5.5......
第5条  商品信息
5.1......
5.2......
5.3......
5.4......
5.5......
第5条  商品信息
5.1......
5.2......
5.3......
5.4......
5.5......
第5条  商品信息
5.1......
5.2......
5.3......
5.4......
5.5......
</pre>
      <!-- <div class="div-html" v-html="huoDongSm"></div> -->
      <!-- <div @click="goToLink()" class="fixed-right">新人报道</div> -->
    </div>
  </div>
</template>

<script>
import api from "@/api/user";
import validate from "../../utils/validate";
export default {
  data() {
    return {
      id: "",
      intermeId: "",
      huoDongSm: "",
      qdId: "",
      ysfexclusivelink: ""
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    this.qdId = this.$route.params.qdId;
    // this.getInfoBox();
    // this.getUrl();
  },
  methods: {
    async getInfoBox() {
      let res = await api.getInfo({ id: this.id });
      if (res.status == 200) {
        if (res.data.existence == undefined) {
          this.isEnd = false;
        } else {
          this.isEnd = true;
        }
        this.huoDongSm = res.data.remarks;
      }
    },
    async getUrl() {
      let res = await api.getUrl({ intermeCode: this.qdId });
      if (res.status == 200) {
        this.ysfexclusivelink = res.data.ysfexclusivelink;
      } else {
        this.$toast(res.msg);
      }
    },
    goToLink() {
      if (this.ysfexclusivelink == "" || this.ysfexclusivelink == null) {
        this.$toast("链接不存在");
      } else {
        window.location.href = this.ysfexclusivelink;
      }
    }
  }
};
</script>


   
<style>
.proud {
  font-variant-numeric: normal;
  font-variant-east-asian: normal;
  font-stretch: normal;
  font-size: 0.8rem;
  line-height: 1.5;
  font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
  -webkit-font-smoothing: antialiased;
  margin-top: 0px;
  padding: 0 20px;
  max-width: 100%;
  word-break: normal;
  overflow-wrap: normal;
  overflow: auto;
  text-shadow: white 0px 1px;
  tab-size: 4;
  hyphens: none;
  text-align: left;
}
</style>

<style scoped lang="less" type="text/less">
#id {
  text-align: left !important;
}

.pad {
  padding: 30px;
  background: #f8f8f8;
  .content {
    position: relative;
    background: #fff;
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
    .title-bg {
      width: 215px;
      height: 60px;
      display: block;
      line-height: 60px;
      background-image: url("../../assets/img/title-bg.png");
      background-position: center;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      font-size: 36px;

      font-family: PingFang SC, PingFang SC-Regular;
      font-weight: 400;
      text-align: center;
      color: #ffffff;
      margin-top: 40px;
    //   margin-bottom: 40px;
    }
    .div-html {
      font-size: 46px;
      text-align: left;
      padding: 0 30px;
      font-size: 36px;
      width: 100%;
      word-break: break-all;
      word-wrap: break-word;
    }
  }
}
</style>
