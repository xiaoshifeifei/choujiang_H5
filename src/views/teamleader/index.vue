<template>
  <div class="dataPro">
    <!-- 列表部分 -->
    <div class="footerAll">
      <div class="footerAll1">
        <div class="footerAll2">
          <input type="text" placeholder="请输入团队长名称/手机号" v-model="form.inputTel" />
        </div>
        <div class="footerAll3" :class="{ active1: isActions4 }" @click="show = true">
          请选择加入时间
          <img src="../../assets/img/ixx.png" alt="">
        </div>
        <div class="btns" @click="clickCx">查询</div>
        <div class="footerAll9" v-if="teamUsers">共 <span style="color:#ebd092">{{teamUsers}}</span> 位团队长</div>
        <!-- <div class="footerAll10" v-if="startTimes"> 查询时间: {{startTimes}} 至 {{endTimes}}</div> -->
        <div class="footer-foo">
          <!--  表格部分  -->
          <div class="content-2">
            <div class="label-t">
              <div class="fh fontS1">团队长名称</div>
              <div class="lc fontS1 contentshoptext">手机号</div>
              <div class="wfmc fontS1 contentshoptext">推广用户数</div>
              <div class="wfmm fontS1 contentshoptext">加入时间</div>
            </div>
            <!-- 此处循环    -->
            <div class="label-box">
              <div>
                <van-list
                  v-model="loading"
                  :finished="finished"
                  :immediate-check="false"
                  finished-text="没有更多了"
                  @load="onLoad"
                  :offset="10"
                >
                  <div class="label-b1" v-for="item in itemList" :key="item.id">
                    <div class="fhx" style="color:#A7A7A7">{{ item.teamName || '暂无名称' }}</div>
                    <div class="lcx" style="color:#A7A7A7">{{ item.phone || '暂无手机号' }}</div>
                    <div class="wfmcx" style="color:#A7A7A7">{{ item.users == '' ? '0' : item.users }}</div>
                    <div class="wfmmx" style="color:#A7A7A7">{{ item.dataTime == '' ? '' : item.dataTime }}</div>
                  </div>
                </van-list>
                <div class="no-data" v-if="!this.itemList">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 日期弹出 组 件  -->
    <van-calendar
      v-model="show"
      :min-date="minDate"
      :max-date="maxDate"
      color="#EBD092"
      type="range"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import api from '@/api/user'
import validate from '../../utils/validate'
import PlatForm from '../../components/Platform'
export default {
  components: {
    PlatForm,
  },
  data() {
    return {
      num1: "是否下载木知了",
      num2:'是否已支付一元',
      num3:'是否云闪付拉新用户',
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2020, 12, 31),
      type: 0,
      resDatapa: '',
      pageNo: 1,
      pageSize: 10,
      endTime: '',
      startTim: '',
      // isDowloadLt: this.form.selectItemContain, //是否下载木知 了
      // isYsfUsers: this.form.selectItemNew, //是否云闪付拉新用户
      // isPay: this.form.selectItemPayment, //是否已支付一元
      // phone: this.form.inputTel, //手机号码
      id: '',
      dateData: '',
      show: false, //日期弹出状态
      isAction: true, //切换样式状态
      isActions: false,
      isActions1: true,
      isActions2: false,
      isActions3: false,
      isActions4: false,

      endTime: null,
      startTime: null,
      selectItemContain: '',
      form: {
        inputTel: null, //手机号码
        selectItemContain: null, //是否下载木知了
        selectItemPayment: null, //是否已支付一元
        selectItemNew: null, //是否云闪付拉新用户
      },
      arrayData: {
        cumulativeUsers: '',
        dateTime: '',
        dowloadLtUsers: '',
        dowloadYsfUsers: '',
        newYsfUsers: '',
        users: '',
      },

      loading: false,
      finished: false,
      // pageNo: 1, //请求第几页
      pageSize: 10, //每页请求的数量
      total: 0, //总共的数据条 数
      itemList: [],
      teamUsers:null
    }
  },
  mounted() {
  },
  activated() {
    //  console.log(this.$route.query.teamUsers,11111);
     this.teamUsers = this.$route.query.teamUsers
  },
  created() {
    this.getDataDetail()
  },
  methods: {
//     changeCantion(e) {
//       this.num1= '全部';
//       if (e.target.value == 'null') {
//         console.log('进来了')
//         this.num1= '全部';
//       }
//     },
//     changePayment(e) {
//       this.num2= '全部';
//       if (e.target.value == 'null') {
//         console.log('进来了')
//         this.num2= '全部';
//       }
//     },
//     changeItemNew(e) {
//       this.num3= '全部';
//       if (e.target.value == 'null') {
//         console.log('进来了')
//         this.num3= '全部';
//       }
//     },
    //总数据
    // async getData() {
    //   const params = {}
    //   params.type = this.type
    //   params.pageNo = this.pageNo
    //   params.pageSize = this.pageSize
    //   console.log('params', params)

    //   params.endTime = this.endTime
    //   params.startTime = this.startTime
    //   console.log("this.form.selectItemContain",this.form.selectItemContain);

    //   if (this.form.selectItemContain != null) {
    //     params.isDowloadLt =Number(this.form.selectItemContain) 
    //   }else{
    //     params.isDowloadLt =this.form.selectItemContain
    //   }
    //   if (this.form.selectItemNew != null) {
    //     params.isNewYsf =Number(this.form.selectItemNew) 
    //   }else {
    //     params.isNewYsf =this.form.selectItemNew
    //   }
    //   if (this.form.selectItemPayment != null) {
    //     params.isPay =Number(this.form.selectItemPayment) 
    //   }else {
    //     params.isPay =this.form.selectItemPayment
    //   }
    //   params.phone = this.form.inputTel //手机号码
    //   let res = await api.getInfoDataCount(params)
    //   console.log('res111总数居', res)
    //   if (res.data == 1) {
    //     console.log(888888)
    //     this.isAction = true
    //     this.isActions = false
    //     this.resDatapa = '您还不是渠道商哦!'
    //     return
    //   }
     
    //   if (res.status == 200) {
    //     this.arrayData.cumulativeUsers = res.data.cumulativeUsers
    //     this.arrayData.dateTime = res.data.dateTime
    //     this.arrayData.dowloadLtUsers = res.data.dowloadLtUsers
    //     this.arrayData.dowloadYsfUsers = res.data.dowloadYsfUsers
    //     this.arrayData.newYsfUsers = res.data.newYsfUsers
    //     this.arrayData.users = res.data.users
    //   }
    // },
    // 获取列 表
    async getDataDetail() {
      const params = {}
      params.type = this.type
      params.pageNo = this.pageNo
      params.pageSize = this.pageSize
      params.endTime = this.endTime
      params.startTime = this.startTime
     
      params.text = this.form.inputTel //手机号码
      console.log("请求参数",params);
      let res = await api.getFindTeam(params).then((res) => {
     
        let rows = res.data.list //请求返回当页的列表
        this.loading = false
        this.total = res.data.totalItem

        if (rows == null || rows.length === 0) {
          // 加载结束
          this.finished = true
          return
        }

        // 将新数据与老数据进行合 并
        this.itemList = this.itemList.concat(rows)

        //如果列表数据条数>=总条数，不再触发滚动加载  返回的总数字段需要
        if (this.itemList.length >= this.total) {
          this.finished = true
        }
      })
    },

    //滚动加载时触发，list组件定义的方法
    onLoad() {
      console.log('2222')
      this.pageNo++
      this.getDataDetail()
    },
    formatDate(dateData) {
      // console.log("dateData.getMonth() + 1",dateData.getMonth() + 1);
      var numbe1 = ''
      var numbe2 = ''

      if (dateData.getMonth() + 1 < 10) {
        numbe1 = "0" + (dateData.getMonth() + 1)
      }else {
        numbe1 = dateData.getMonth() + 1
      }

      if (dateData.getDate() < 10) {
        numbe2 = "0" + dateData.getDate()
      }else {
        numbe2 =  dateData.getDate()
      }
      // console.log('`${dateData.getFullYear()}-${numbe1}-${numbe2}`',`${dateData.getFullYear()}-${numbe1}-${numbe2}`);
      return `${dateData.getFullYear()}-${numbe1}-${numbe2}`
    },
    onConfirm(dateData) {
      const [start, end] = dateData
      this.show = false
      // this.dateData = `${this.formatDate(start)} - ${this.formatDate(end)}`;
      // console.log(this.formatDate(start))
      // console.log(this.formatDate(end))
      this.endTimes = this.formatDate(end)
      this.startTimes = this.formatDate(start)
      this.clickZdy()
    },
    // 点击获取渠道商信息
    async clickSr() {
      this.isAction = true
      this.isActions = false
      this.isActions1 = true
      this.isActions2 = false
      this.isActions3 = false
      this.isActions4 = false
      this.type = 0
      this.endTime = null
      this.startTime = null
      this.form.selectItemContain = null
      this.form.selectItemNew = null
      this.form.selectItemPayment = null
      this.form.inputTel = null
      this.itemList = []

      // this.loading = false
      this.finished = false
      this.pageNo= 1 //请求第几页
      this.pageSize = 10 //每页请求的数量
      this.total = 0 //总共的数据条 数
      this.getDataDetail()
    },
    //点击获取推广者信息
    async clickTg() {
      this.isAction = false
      this.isActions = true
      this.isActions1 = true
      this.isActions2 = false
      this.isActions3 = false
      this.isActions4 = false
      this.type = 1
      this.endTime = null
      this.startTime = null
      this.form.selectItemContain = null
      this.form.selectItemNew = null
      this.form.selectItemPayment = null
      this.form.inputTel = null
      this.itemList = []

      this.loading = false
      this.finished = false
      this.pageNo= 1 //请求第几页
      this.pageSize = 10 //每页请求的数量
      this.total = 0 //总共的数据条 数
      this.getDataDetail()
    },
    // 累计
    async clickLg() {
      this.isActions1 = true
      this.isActions2 = false
      this.isActions3 = false
      this.isActions4 = false

      this.endTime = null
      this.startTime = null
      // this.form.selectItemContain = ''
      // this.form.selectItemNew = ''
      // this.form.selectItemPayment = ''
      // this.form.inputTel = ''
      this.itemList = []
      this.loading = false
      this.finished = false
      this.pageNo= 1 //请求第几页
      this.pageSize = 10 //每页请求的数量
      this.total = 0 //总共的数据条 数
      this.getDataDetail()
    },
    // 今日
    async clickToday() {
      this.isActions1 = false
      this.isActions2 = true
      this.isActions3 = false
      this.isActions4 = false
      this.endTime = null
      this.startTime = null
      // this.form.selectItemContain = ''
      // this.form.selectItemNew = ''
      // this.form.selectItemPayment = ''
      // this.form.inputTel = ''
      this.itemList = []

      this.loading = false
      this.finished = false
      this.pageNo= 1 //请求第几页
      this.pageSize = 10 //每页请求的数量
      this.total = 0 //总共的数据条 数

      var timestamp = new Date()
      console.log("timestamp111",timestamp);
      // let d = new Date(timestamp)
      // let batchDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
      this.endTime = this.dateFormat('YYYY-mm-dd', timestamp)
      this.startTime = this.dateFormat('YYYY-mm-dd', timestamp)
      
      this.getDataDetail()
    },

    dateFormat(fmt, date) {
      let ret
      const opt = {
        'Y+': date.getFullYear().toString(), // 年
        'm+': (date.getMonth() + 1).toString(), // 月
        'd+': date.getDate().toString(), // 日
        'H+': date.getHours().toString(), // 时
        'M+': date.getMinutes().toString(), // 分
        'S+': date.getSeconds().toString(), // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      }
      for (let k in opt) {
        ret = new RegExp('(' + k + ')').exec(fmt)
        if (ret) {
          fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'))
        }
      }
      return fmt
    },

    // 昨日
    async clickYesToday() {
      this.isActions1 = false
      this.isActions2 = false
      this.isActions3 = true
      this.isActions4 = false
      this.endTime = null
      this.startTime = null
      // this.form.selectItemContain = ''
      // this.form.selectItemNew = ''
      // this.form.selectItemPayment = ''
      // this.form.inputTel = ''
      this.itemList = []
      this.loading = false
      this.finished = false
      this.pageNo= 1 //请求第几页
      this.pageSize = 10 //每页请求的数量
      this.total = 0 //总共的数据条 数

      const timestamp = Date.parse(new Date())
      // console.log(this.dateFormat('YYYY-mm-dd', timestamp))

      const timeStampParams = timestamp - 24 * 60 * 60 * 1000
      //  console.log("timeStampParams",timeStampParams);
      let d = new Date(timeStampParams)
      var dataTi = ""
      if (d.getMonth() + 1 < 10) {
        dataTi = "0" + (d.getMonth() + 1)
      }else {
        dataTi = d.getMonth() + 1
      }
      // console.log("d.getMonth() + 1",d.getMonth() + 1);
      let batchDateTime = d.getFullYear() + '-' + (dataTi) + '-' + d.getDate()
      
      this.endTime = batchDateTime
      this.startTime = batchDateTime
      // console.log('this.endTime222', this.endTime)
      // console.log('this.startTime222', this.startTime)
      this.getDataDetail()
    },
    // 自定义
    async clickZdy() {
      this.isActions1 = false
      this.isActions2 = false
      this.isActions3 = false
      this.isActions4 = true
      this.endTime = null
      this.startTime = null
      // this.form.selectItemContain = ''
      // this.form.selectItemNew = ''
      // this.form.selectItemPayment = ''
      // this.form.inputTel = ''
      this.itemList = []
      this.loading = false
      this.finished = false
      this.pageNo= 1 //请求第几页
      this.pageSize = 10 //每页请求的数量
      this.total = 0 //总共的数据条 数

      this.endTime = this.endTimes
      this.startTime = this.startTimes
      this.getDataDetail()
    },
    // 查 询
    async clickCx() {
      // this.endTime =  null
      // this.startTime = null
      console.log(this.isActions1, this.isActions2, this.isActions3, this.isActions4)
     
      this.itemList = []
      this.loading = false
      this.finished = false
      this.pageNo= 1 //请求第 几页
      this.pageSize = 10 //每页请求的数量
      this.total = 0 //总共的数据条 数
      this.getDataDetail()
    },
  },
}

</script>

<style scoped lang="less" type="text/less">
.dataPro {
  width: 100%;
  height: 100%;

  background: url(../../assets/img/bgye.png);
  background-position: top;
  background-repeat: no-repeat;
  background-size: 100% 30%;
  background-color: #f8f8f8;
  .data_title {
    text-align: left;
    width: 100%;
    height: 110px;
    padding: 30px 40px 0;
    .title-l {
      color: #fff;
      width: 160px;
      height: 50px;
      line-height: 50px;
      display: inline-block;
      font-size: 32px;
      text-align: center;
      font-weight: 700;
    }
    .active {
      border-bottom: 5px solid #fff;
      color: #fff;
    }
    .title-r {
      color: #fff;
      width: 160px;
      height: 50px;
      line-height: 50px;
      display: inline-block;
      font-size: 32px;
      text-align: center;
      margin-left: 30px;
      font-weight: 700;
    }
  }
  .noData {
    width: 80%;
    height: 216px;
    text-align: center;
    background-color: yellow;
    margin: auto;
    margin-top: 50%;
    background: url('../../assets/img/iwu.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .noData1 {
      padding-top: 300px;
      font-size: 36px;
      font-weight: 700;
    }
  }
  .dataAll {
    width: 90%;
    margin: auto;
    background-color: #fff;
    // height: 900px ;
    padding: 40px 20px;
    border-radius: 15px;
    .dataAll0 {
      width: 100%;
      height: 70px;
      .dataAll1 {
        box-sizing: border-box;
        width: 25%;
        height: 70px;
        line-height: 70px;
        display: inline-block;
        border-radius: 15px 0 0 15px;
        border: 2px solid #ececec;
        // margin-left: -2px;
        color: #a4a4a4;
      }
      .dataAll2 {
        width: 25%;
        height: 70px;
        line-height: 70px;
        display: inline-block;
        border: 2px solid #ececec;
        // margin-left: -2px;
        color: #a4a4a4;
      }
      .dataAll3 {
        width: 25%;
        height: 70px;
        line-height: 70px;
        display: inline-block;
        border: 2px solid #ececec;
        // margin-left: -2px;
        color: #a4a4a4;
      }
      .dataAll4 {
        width: 25%;
        height: 70px;
        line-height: 70px;
        display: inline-block;
        border-radius: 0 15px 15px 0;
        border: 2px solid #ececec;
        // margin-left: -2px;
        color: #a4a4a4;
        vertical-align:text-top van-cell {
          width: 100%;
          height: 70px;
          // line-height: 70px;
          // font-size: 1px;
          text-align: center;
        }
      }
      .active1 {
        border: 2px solid #ecd195;
        background-color: #fffbee;
        color: #fcdb63;
      }
    }
    .numberAll {
      width: 100%;
      margin-top: 30px;
      text-align: left;
      .numberAll1 {
        display: inline-block;
        width: 50%;
        // height: 150px;
        border-right: 1px solid #f1f1f1;
        border-bottom: 1px solid #f1f1f1;
        .img {
          width: 100px;
          height: 150px;
          display: inline-block;
          background: url('../../assets/img/idh.png');
          background-position: center;
          background-repeat: no-repeat;
          // vertical-align: top;
        }
        .content {
          display: inline-block;
          width: calc(100% - 100px);
          height: 150px;
          vertical-align: top;
          .content1 {
            width: 100%;
            height: 75px;
            font-size: 38px;
            font-weight: 700;
            line-height: 75px;
          }
          .content2 {
            width: 100%;
            height: 75px;
          }
        }
      }
      .numberAll2 {
        width: 50%;
        display: inline-block;
        // height: 150px;
        border-bottom: 1px solid #f1f1f1;
        .img {
          width: 100px;
          height: 150px;
          display: inline-block;
          background: url('../../assets/img/iyun.png');
          background-position: center;
          background-repeat: no-repeat;
        }
        .content {
          display: inline-block;
          width: calc(100% - 100px);
          height: 150px;
          vertical-align: top;
          .content1 {
            width: 100%;
            height: 75px;
            font-size: 38px;
            font-weight: 700;
            line-height: 75px;
          }
          .content2 {
            width: 100%;
            height: 75px;
          }
        }
      }
      .numberAll3 {
        width: 50%;
        display: inline-block;
        // height: 150px;
        border-right: 1px solid #f1f1f1;
        border-bottom: 1px solid #f1f1f1;

        .img {
          width: 100px;
          height: 150px;
          display: inline-block;
          background: url('../../assets/img/irw1.png');
          background-position: center;
          background-repeat: no-repeat;
        }
        .content {
          display: inline-block;
          width: calc(100% - 100px);
          height: 150px;
          vertical-align: top;
          .content1 {
            width: 100%;
            height: 75px;
            font-size: 38px;
            font-weight: 700;
            line-height: 75px;
          }
          .content2 {
            width: 100%;
            height: 75px;
          }
        }
      }
      .numberAll4 {
        width: 50%;
        // height: 150px ;
        display: inline-block;
        border-bottom: 1px solid #f1f1f1;
        .img {
          width: 100px;
          height: 150px;
          display: inline-block;
          background: url('../../assets/img/ilw.png');
          background-position: center;
          background-repeat: no-repeat;
        }
        .content {
          display: inline-block;
          width: calc(100% - 100px);
          height: 150px;
          vertical-align: top;
          .content1 {
            width: 100%;
            height: 75px;
            font-size: 38px;
            font-weight: 700;
            line-height: 75px;
          }
          .content2 {
            width: 100%;
            height: 75px;
          }
        }
      }
      .numberAll5 {
        width: 50%;
        display: inline-block;
        height: 150px;
        border-right: 1px solid #f1f1f1;
        .img {
          width: 100px;
          height: 150px;
          display: inline-block;
          background: url('../../assets/img/irn.png');
          background-position: center;
          background-repeat: no-repeat;
        }
        .content {
          display: inline-block;
          width: calc(100% - 100px);
          height: 150px;
          vertical-align: top;
          .content1 {
            width: 100%;
            height: 75px;
            font-size: 38px;
            font-weight: 700;
            line-height: 75px;
          }
          .content2 {
            width: 100%;
            height: 75px;
            padding-right: 20px;
            text-align: left;
            .contentshoptext {
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
              text-overflow: ellipsis;
              word-break: break-all;
              // overflow:hidden;            //超出的文本隐 藏
              // text-overflow:ellipsis;     //溢出用省略号显 示
              // white-space:nowrap;
            }
          }
        }
      }
    }
  }
  .footerAll {
    width: 100%;
    // height: 900px ;
    background-color: #fff;
    padding: 40px;
    height: 100%;
    .footerAll1 {
      width: 100%;
      // height: 200px;
      // background-color:yellow;
      .footerAll2 {
        display: inline-block;
        width: 55%;
        height: 70px;
        input {
          width: 100%;
          height: 70px;
          border-radius: 10px;
          line-height: 70px;
          border: 2px solid #dddddd;
          padding: 0 10px;
          font-size: 28px;
          color: #999999;
        }
      }
      .footerAll3 {
        display: inline-block;
        width: 41%;
        height: 70px;
        border: 2px solid #dddddd;
        // padding-top: 15px;
        border-radius: 10px;
        font-size: 28px;
        color: #999999;
        margin-left: 4%;
        text-align: left;
        padding: 0 10px ;
        line-height: 70px;
        img {
          margin-left: 20px;
          vertical-align: middle;
        }
        // select {
        //   height: 70px;
        //   width: 100%;
        //   border-radius: 10px;
        //   border: 1px solid #dddddd;
        //   font-size: 28px;
        //   color: #999999;
        // }
      }
      .footerAll4 {
        display: inline-block;
        width: 48%;
        height: 90px;
        select {
          height: 70px;
          width: 100%;
          border-radius: 10px;
          border: 1px solid #dddddd;
          font-size: 28px;
          color: #999999;
        }
      }
      .footerAll5 {
        display: inline-block;
        width: 48%;
        height: 90px;
        margin-left: 4%;
        select {
          height: 70px;
          width: 100%;
          border-radius: 10px;
          border: 1px solid #dddddd;
          font-size: 28px;
          color: #999999;
        }
      }
      .btns {
        margin-top: 20px;
        width: 100%;
        height: 70px;
        background-color: #ebd092;
        border-radius: 10px;
        color: #fff;
        line-height: 70px;
        font-size: 34px;
      }
      .footerAll9 {
        width: 100%;
        margin: 30px 0 10px 0;
        display: inline-block;
        text-align: left;
        font-size: 30px;
        font-weight: 700;
        color: #A1A1A1;
      }
      .footerAll10 {
        width: 100%;
        height: 40px;
        display: inline-block;
        font-size: 30px;
        vertical-align: middle;
        text-align:left;
        color: #A1A1A1;
      }
      .footer-foo {
        width: 100%;
        // height: 500px;
        // background-color: yellow;
        margin-top: 30px;
        .content-2 {
          margin-top: 20px;
          width: 100%;
          .label-t {
            width: 100%;
            height: 150px;
            border-bottom: 1px solid #f4f4f4;
            line-height: 150px;
            background-color: #f1f1f1;
            .fh {
              width:29%;
              display: inline-block;
              height: 150px;
              // line-height: 150px;
              font-size: 30px;
              font-weight: 700;
              text-align: center;
              border: 1px solid #dedede;
              vertical-align: top;
            }
            .lc {
              width: 30%;
              display: inline-block;
              height: 150px;
              // line-height: 70px;
              font-size: 30px;
              font-weight: 700;
              text-align: center;
              border: 1px solid #dedede;
              border-left: transparent;
            }
            .wfmc {
              width: 15%;
              display: inline-block;
              height: 150px;
              line-height: 70px;
              font-size: 30px;
              font-weight: 700;
              text-align: center;
              border: 1px solid #dedede;
              border-left: transparent;
            }
            .wfmm {
              width: 26%;
              display: inline-block;
              height: 150px;
              // line-height: 70px ;
              font-size: 30px;
              font-weight: 700;
              text-align: center;
              border: 1px solid #dedede;
              border-left: transparent;
            }
          }
          .label-box {
            width: 100%;
            height: 420px;
            overflow: hidden;
            overflow-x: visible;
            overflow-y: auto;
            .label-b1 {
              width: 100%;
              height: 80px;
              border-bottom: 1px solid #f4f4f4;
              color: #a0a0a0;
              .fhx {
                width: 29%;
                display: inline-block;
                height: 80px;
                line-height: 80px;
                font-size: 30px;
                text-align: center;
                border: 1px solid #dedede;
                vertical-align: top;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .lcx {
                width: 30%;
                display: inline-block;
                height: 80px;
                line-height: 80px;
                font-size: 30px;
                text-align: center;
                border: 1px solid #dedede;
                border-left: transparent;
                vertical-align: top;
              }
              .wfmcx {
                width: 15%;
                display: inline-block;
                height: 80px;
                line-height: 80px;
                font-size: 30px;
                text-align: center;
                border: 1px solid #dedede;
                border-left: transparent;
                vertical-align: top;
              }
              .wfmmx {
                width: 26%;
                display: inline-block;
                height: 80px;
                font-size: 30px;
                text-align: center;
                border: 1px solid #dedede;
                border-left: transparent;
              }
            }
          }
          .label-box::-webkit-scrollbar {
            display: none;
          }
        }
      }
    }
  }
}
// 超出两行 隐  藏
.contentshoptext {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
}
.fontS {
  font-size: 28px;
}
.paddingTB {
  padding: 20px 0;
}
.fontS1 {
  font-size: 20px;
}
.color1 {
  color: #A7A7A7;
}
</style>
