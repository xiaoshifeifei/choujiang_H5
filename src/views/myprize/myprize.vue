<template>
  <div class="myprize" >
    <div class="lucky-myprize">
      <!-- <van-nav-bar
        title="我的奖品"
        @click-left="onClickLeft"
        @click-right="onClickRight"
        left-arrow
        style="background-color:#E84241;color:#fff"
      >
        <template #left>
          <van-icon name="arrow-left" size="20px" />
        </template>
        <template #right >
          <van-icon name="weapp-nav" size="20px"  />
        </template>
      </van-nav-bar>  -->
      <!-- 奖杯部分 -->
      <div class="my-trophy">
        <img src="../../assets/img/jbys.png" alt="">
      </div>
      <!-- 奖项部分  -->
      <div class="my-prize">
        <!-- 内容 -->
        <div class="my-mede" style="overflow-y:auto;">
          <div v-if="isContent" class="my-he">
            <div class="my-content" v-for="(item,index) of getDateArr" :key="index">
              <div v-if="item.isexpress == 1">
                <div class="con-t">{{item.prizename }}【{{ item.awardname }}】</div>
                  <div class="con-b">
                    <div class="content-left">
                      <p>
                        状态:  {{item.status == 1 ? "未派奖":"已派奖"}}
                      </p>
                      <p>
                       时间:
                        {{item.createdate}}
                      </p>
                      <!-- <p>
                       快递单号:  <text> {{item.remark}}</text>
                      </p> -->
                      <div class="text-box" >
                        <span class="stro-box">快递单号: </span>
                        <span> {{item.remark}}</span>
                      </div>
                      <div class="text-box1" >
                        <span class="stro-box1">收货地址: </span>
                        <span> {{item.address}}</span>
                        <!-- <van-field :value="item.address"   @input="(value)=>{addressPa=value}" border clearable rows="2" type="textarea" placeholder="请输入收货地址" style="width:100px;height:50px;background-color: #fff9f2;display: inline-block;padding:0" v-if="item.status == 1"/> -->
                        <!-- <span class="span_img"  @click="comiForm(item)"></span> -->
                        <span class="span_img"  @click="comTc(item)" v-if="item.status == 1"></span>
                      </div>
                    </div>
                    <div class="content-right">
                      <img :src="item.awardimgurl" alt />
                    </div>
                  </div>
              </div>
              <div v-else-if="item.isexpress == 2 || item.isexpress == 0">
                <div class="con-t">{{item.prizename }}【{{ item.awardname }}】</div>
                  <div class="con-b1">
                    <div class="content-left">
                      <p>
                        状态:  {{item.status == 1 ? "未派奖":"已派奖"}}
                      </p>
                      <p>
                        时间: 
                        {{item.createdate}}
                      </p>
                    </div>
                    <div class="content-right" >
                      <img :src="item.awardimgurl" alt />
                    </div>
                  </div>
              </div>
            </div>
          </div>
         
          <div v-else class="no-prize">
            <img src="../../assets/img/noliwu.png" alt />
            <p>很遗憾，暂无奖品信息</p>
          </div>
        </div>
        <!-- <div style="clear:both;"></div> -->

        <!-- 按钮 -->
        <!-- <div class="my-btn">邀请好友来一起领奖吧</div> -->
      </div>

    </div>
    <!-- 未中奖弹出层 -->
    <!-- <van-popup v-model="isNo" class="popup-noprize" close-on-click-overlay>
      <div class="popup-div">
        <img src="../../assets/img/xingxing.png" alt />
        <p>点击 “ ... ” 发送给好友</p>
      </div>
    </van-popup> -->

    <!-- 提交地址弹出层 -->
    <van-popup v-model="isTc" class="popup-noprize"  closeable>
      <van-field v-model="myInfoPa" class="field-box" style="background-color: #fff9f2;"  border clearable rows="2" type="textarea" placeholder="请输入收货地址" />
       <div class="btn-commit" style="margin-top:20px;"  @click="clickCommit">确认</div>
    </van-popup>

  </div>
</template>

<script>
import { Toast } from 'vant'
import api from '@/api/user'
export default {
  data() {
    return {
      isArray:[],
      myParamsData:"",
      itemParams:[],
      objParams:{},
      myInfoPa:"",
      isTc:false,
      textInfo:"",
      isShowNO:false,
      isShow:true,
      textInfo:"",
      myContent:"",
      isNo: true,
      activeHeight: '500',
      isContent: true,
      getDateArr: [],
      addressPa:"",
      myprizeHeight:100
    };
  },
  created() {
  },
  mounted() {
  },
  activated: function () {
     this.getPupop();
  },
  methods: {
    // 提交地址事件
    comTc(Params) {
      console.log("Params",Params);
      this.isTc = true
      this.myInfoPa = Params.address
      this.objParams = Params
    },
    // 提交事件
    async clickCommit () {
     if (this.myInfoPa == "") {
       return Toast('地址不能为空，请填写地址')
     }
     console.log("this.itemParams",this.itemParams);
     const dataPa = this.itemParams.forEach((item)=>{
        const unixTimestamp = new Date( item * 1000 ) 
        const commonTime = unixTimestamp.toLocaleString().replace("/",".").replace("/",".")
        const mestampTime = commonTime.indexOf("下午") != -1
        // console.log("mestampTime",mestampTime);
        if (mestampTime) {
          const commonTime = unixTimestamp.toLocaleString().replace("/",".").replace("/",".").replace("下午"," ").replace("中午","  ").replace("上午","  ");
          const arr = commonTime.split(":");
          const stringTime  = arr[0].substring(arr[0].length - 2)
          const arr1 = arr[0].replace(arr[0].substring(arr[0].length - 2),Number(stringTime.trim()) + 12) + ":" + arr[1] + ":" + arr[2]
          // console.log('arr1',arr1);
          if (this.objParams.createdate === arr1) {
            this.myParamsData = item
          }
        }else {
          const commonTime = unixTimestamp.toLocaleString().replace("/",".").replace("/",".").replace("下午","  ").replace("中午","  ").replace("上午","  ");
          // console.log('commonTime111',commonTime) ;
          if (this.objParams.createdate === commonTime) {
            this.myParamsData = item
          }
        }
     })
     let myParams = {}
      myParams.id = this.objParams.id
      myParams.address=this.myInfoPa
      myParams.isprize=this.objParams.isprize
      myParams.status=this.objParams.status
      myParams.uid=this.objParams.uid
      myParams.isexpress=this.objParams.isexpress
      myParams.awardtype=this.objParams.awardtype
      myParams.awardname=this.objParams.awardname
      myParams.isaward=this.objParams.isaward
      myParams.prizename=this.objParams.prizename
      myParams.createdate=this.myParamsData

      console.log('myParams',myParams);
      let resContent = await api.getUpdateAdd(myParams)
      if (resContent.status == 200) {
          this.getPupop();
          this.isTc = false
      }
    },

    async getPupop() {
      console.log(
        'document.body.clientWidth',
        document.body.clientWidth,
        document.body.clientHeight
      );
      // if (
      //   document.body.clientWidth == '360' &&
      //   document.body.clientHeight == '640'
      // ) {
      //   this.activeHeight = 450
      // }
      // if (
      //   document.body.clientWidth == '360' &&
      //   document.body.clientHeight == '640'
      // ) {
      //   this.activeHeight = 510
      // } else if (
      //   document.body.clientWidth == '411' &&
      //   document.body.clientHeight == '731'
      // ) {
      //   this.activeHeight = 565;
      // } else if (
      //   document.body.clientWidth == '320' &&
      //   document.body.clientHeight == '568'
      // ) {
      //   this.activeHeight = 450;
      // } else if (
      //   document.body.clientWidth == '375' &&
      //   document.body.clientHeight == '667'
      // ) {
      //   this.activeHeight = 510;
      //   this.myprizeHeight = 104;
      // } else if (
      //   document.body.clientWidth == '414' &&
      //   document.body.clientHeight == '736'
      // ) {
      //   this.activeHeight = 565;
      // } else if (
      //   document.body.clientWidth == '375' &&
      //   document.body.clientHeight == '812'
      // ) {
      //   this.activeHeight = 510;
      // } else if (
      //   document.body.clientWidth == '411' &&
      //   document.body.clientHeight == '823'
      // ) {
      //   this.activeHeight = 565;
      // }

      let res = await api.getWinning({
        pageNo:1,
        pageSize:100
      });
      console.log('res中奖记录', res);
      this.getDateArr = res.data.list;
      
      if (this.getDateArr.length != 0) {
        this.getDateArr.map((item)=>{
          this.itemParams.push(item.createdate)
        // console.log('item',item);
        const unixTimestamp = new Date( item.createdate * 1000 ) 
        // console.log("unixTimestamp",unixTimestamp);
        const commonTime = unixTimestamp.toLocaleString().replace("/",".").replace("/",".")
        const mestampTime = commonTime.indexOf("下午") != -1
        // console.log("mestampTime",mestampTime);
        if (mestampTime) {
          const commonTime = unixTimestamp.toLocaleString().replace("/",".").replace("/",".").replace("下午"," ").replace("中午","  ").replace("上午","  ");
          // console.log(999999,commonTime);
          const arr = commonTime.split(":");
          // console.log("arr",arr);
          const stringTime  = arr[0].substring(arr[0].length - 2)
          // Number(stringTime.trim()) + 12     
          // console.log("Number(stringTime.trim()) + 12",Number(stringTime.trim()) + 12);
          const arr1 = arr[0].replace(arr[0].substring(arr[0].length - 2),Number(stringTime.trim()) + 12) + ":" + arr[1] + ":" + arr[2]
          item.createdate = arr1
        }else {
          const commonTime = unixTimestamp.toLocaleString().replace("/",".").replace("/",".").replace("下午","  ").replace("中午","  ").replace("上午","  ");
          item.createdate = commonTime
        }
        // const commonTime = unixTimestamp.toLocaleString().replace("/",".").replace("/",".").replace("下午","  ").replace("中午","  ").replace("上午","  ");
        // item.createdate = commonTime
        this.textInfo = item.address
      })
      }else {
        this.isContent = false
      }
    },
    // onClickLeft() {
    //   location.reload();
    //   this.$router.go(-1);
    // },
    // onClickRight() {
    //   Toast('按钮');
    // },
    // 修改地址
   async comiForm(params){
     console.log('params',params);
     console.log("this.addressPa",this.addressPa);
     params.address = this.addressPa
     if (this.addressPa == "") {
       return Toast('地址不能为空，请填写地址')
     }
     let myParams = {}
      myParams.id = params.id
      myParams.address=this.addressPa
      myParams.isprize=params.isprize
      myParams.status=params.status
      myParams.uid=params.uid
    //  this.isShow = false
    //  this.isShowNO = true
      let resContent = await api.getUpdateAdd(myParams)
    }
  }
};
</script>

<style>
.myprize {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-color: #e94341;
}
.lucky-myprize {
  width: 100%;
  height: 100%;
  background-color: #e94341;
  padding-bottom: 50px;
}
.van-nav-bar .van-icon {
  color: #fff !important;
}
.van-nav-bar__title {
  color: #fff !important;
}
.my-trophy {
  width: 100%;
  height: 220px;
}
.my-trophy img {
  width: 100%;
  height: 100%;
}
.my-prize {
  width: 90%;
  margin: auto;
  /* height: 1020px; */
  height: calc(100% - 220px);
  padding: 60px 0 0 0;
  background: url(../../assets/img/bgk.png) no-repeat;
  background-size: 100% 100%;
  background-position: center;
}
.my-content {
  width: 100%;
  margin: auto;
  margin-bottom: 20px;
  background-color: #fff9f2;
  border-radius: 30px;
}
.con-t {
  padding: 20px 35px;
  width: 100%;
  font-size: 32px;
  font-weight: 700;
  text-overflow:ellipsis;
  word-wrap:break-word
}
.con-b {
  position: relative;
  width: 100%;
}
.con-b1 {
  position: relative;
  width: 100%;
}
.con-b1 img {
  position: absolute;
  top: 0;
  right: 10%;
  width: 100px;
  height: 100px;
}
.content-left {
  display: inline-block;
  width: 70%;
  margin-bottom: 20px;
  /* float: left; */
}
.content-left p {
  text-align: left;
  font-size: 27px;
  padding: 0 30px;
  margin: 15px 0;
}
.content-right {
  display: inline-block;
  background-color: yellow;
  width: 30%;
}
.content-right img {
  /* display: inline-block; */
  position: absolute;
  top: 0;
  right: 10%;
  width: 100px;
  height: 100px;
}
.my-btn {
  text-align: center;
  font-size: 35px;
  font-weight: 700;
  color: #ab1c0a;
  position: absolute;
  left: 50%;
  bottom: 40px;
  transform: translate(-50%, 0);
  width: 70%;
  height: 100px;
  line-height: 100px;
  border-radius: 50px;
  background: url(../../assets/img/yellbtn.png) no-repeat;
}
.popup-noprize {
  box-sizing: border-box;
  border-radius: 2%;
  padding: 100px 20px 0px;
  width: 500px;
  height: 400px;
}
.field-box{
  background-color: skyblue;
  border-radius:25px;
}
.btn-commit {
  box-sizing: border-box;
  font-size: 40px;
  width: 100%;
  height: 80px;
  line-height: 80px;
  background: url(../../assets/img/yellbtn.png) no-repeat;
  background-size: 100% 100%;
  background-position: center; 
  /* width: 90%;
  margin: auto;
  margin-top: 10px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  font-size: 40px;
  background: url(../assets/img/btn.png) no-repeat;
  background-size: 100% 80px; */
}
.popup-div {
  position: relative;
  width: 500px;
  height: 400px;
  background-color: #4c4842;
}
.popup-div img {
  position: absolute;
  top: -200px;
  right: -46px;
}
.popup-div p {
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 40px;
  position: absolute;

  top: 250px;
}
.my-mede {
  width: 80%;
  height: 95%;
  margin: auto;
}
.my-he {
  box-sizing: border-box;
  height: 700px;
  margin: auto;
}
.van-popup {
  overflow-y: visible !important;
  transition: 0ms;
}
.no-prize {
  width: 80%;
  height: 400px;
  background-color: transparent;
  margin: auto;
  margin-top: 300px;
}
.no-prize img {
  width: 256px;
  height: 274px;
}
.no-prize p {
  font-weight: 700;
  margin-top: 40px;
  font-size: 30px;
  color: #57524c;
}
.span_img{
  /* position: absolute ;
  right: 0;
  top: 65%; */
  display: inline-block;
  width: 25px;
  height: 25px;
  margin-left: 30px;
  background-color: red;
  background: url(../../assets/img/ljs.png) no-repeat;
}
.content-left input {
  margin-top: 10px;
  border: 1px solid #ccc;
  height: 50px;
}
.content_bot {
    margin-top: 90px;
}

.text-box {
  box-sizing: border-box;
  text-align:left;
  font-size: 27px;
  padding-left:30px;
  position: relative;
  max-width: 100%;
  /* 此处处理数字换行问题 */
  word-break:break-all;
	/* display: inline-block; */
	overflow-wrap: break-word;    /*  css3属性，当内容超过指定容器的边界时是否断行  */
	/* text-align: left; */
}
.text-box1 {
  margin-top: 15px;
  box-sizing: border-box;
  text-align:left;
  font-size: 27px;
  padding-left:30px;
  position: relative;
  max-width: 100%;
	/* display: inline-block; */
	overflow-wrap: break-word;    /*  css3属性，当内容超过指定容器的边界时是否断行  */
	/* text-align: left; */
}

.stro-box {
  /* font-weight: 700; */
  /* position: absolute; */
  font-size:27px;
  margin-bottom: 10px;

}




</style>
