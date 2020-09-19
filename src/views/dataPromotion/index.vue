<template>
  <div class="dataPro">
    <!-- tab切换部分 -->
    <div class="data_title">
      <div class="title-l" :class="{ active: isAction }" @click="clickSr">我是渠道商</div>
      <div class="title-r" :class="{ active: isActions }" @click="clickTg">我是推广者</div>
    </div>
    <div class="dataSho" v-if="intermeName || isTeamLeader">
      <div class="dataSho1"></div>
      <div class="dataAllDf" v-if="intermeName">您好，"{{intermeName}}" 渠道商!</div>
      <div class="dataAllDf" v-if="isTeamLeader">您好，团队长!</div>
    </div>
    <!-- 非渠道商展示页面 -->
    <div class="noData" v-if="isNoShow">
      <div class="noData1">
        {{ this.resDatapa }}
      </div>
    </div>
    <!-- 累计用户部分  -->
    <div class="dataAll" v-if="!isNoShow">
      
      <!-- tabs切换 -->
      <div class="dataAll0">
        <div class="dataAll1 fontS" :class="{ active1: isActions1 }" @click="clickLg">累计</div>
        <div class="dataAll2 fontS" :class="{ active1: isActions2 }" @click="clickToday">今日</div>
        <div class="dataAll3 fontS" :class="{ active1: isActions3 }" @click="clickYesToday">昨日</div>
        <div class="dataAll4 fontS" :class="{ active1: isActions4 }" @click="show = true">
          自定义
        </div>
      </div>
      <!-- 展示用户数量 -->
      <div class="numberAll">
        <div class="numberAll1 paddingTB">
          <div class="img"></div>
          <div class="content">
            <p class="content1">{{ arrayData.users || 0 }}</p>
            <div class="content2 ">
              <span class="contentshoptext fontS ">{{isActions1==true ? '累计':'新增'}}用户数</span>
            </div>
          </div>
        </div>
        <div class="numberAll2 paddingTB">
          <div class="img"></div>
          <div class="content ">
            <p class="content1">{{ arrayData.dowloadLtUsers || 0 }}</p>
            <div class="content2 ">
              <span class="contentshoptext fontS ">{{isActions1==true ? '累计':'新增'}}下载木知了用户数</span>
            </div>
          </div>
        </div>
        <div class="numberAll3 paddingTB">
          <div class="img"></div>
          <div class="content ">
            <p class="content1">{{ arrayData.dowloadYsfUsers || 0 }}</p>
            <div class="content2 ">
              <span class="contentshoptext fontS" style="padding-right:5px">{{isActions1==true ? '累计':'新增'}}获得云闪付抽奖支付资格用户数</span>
            </div>
          </div>
        </div>
        <div class="numberAll4 paddingTB">
          <div class="img"></div>
          <div class="content ">
            <p class="content1">{{ arrayData.cumulativeUsers || 0 }}</p>
            <div class="content2 ">
              <span class="contentshoptext fontS ">{{isActions1==true ? '累计':'新增'}}支付1元参与云闪付抽奖用户数</span>
            </div>
          </div>
        </div>
        <div class="numberAll5 paddingTB">
          <div class="img"></div>
          <div class="content ">
            <p class="content1">{{ arrayData.newYsfUsers || 0 }}</p>
            <div class="content2 ">
              <span class="contentshoptext fontS ">{{isActions1==true ? '累计':'新增'}}云闪付拉新用户数</span>
            </div>
          </div>
        </div>
         <!-- v-if="isTeamLeader"  -->
        <div class="numberAll6 paddingTB" v-if="type != 1" @click="teamClick">
          <div class="img"></div>
          <div class="content">
            <p class="content1">{{ arrayData.teamUsers || 0 }}</p>
            <div class="content2 ">
              <span class="contentshoptext fontS ">{{isActions1==true ? '累计':'新增'}}团队长</span>
              <span class="contentshoptext1">查看 <img src="../../assets/img/ixy.png" alt=""></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 列表部分 -->
    <div class="footerAll" v-if="!isNoShow">
      <div class="footerAll1">
        <div class="footerAll2">
          <input type="text" placeholder="请输入手机号" v-model="form.inputTel" />
        </div>
        <div class="footerAll3">
          <select id="group" v-model="form.selectItemContain" @change="changeCantion">
            <option value=null>{{num1}}</option>
            <option value=1>是</option>
            <option value=0>否</option>
          </select>
        </div>
        <div class="footerAll4">
          <select id="group1" v-model="form.selectItemPayment" @change="changePayment">
            <option value=null>{{num2}}</option>
            <option value=1>是</option>
            <option value=0>否</option>
          </select>
        </div>
        <div class="footerAll5">
          <select id="group2" v-model="form.selectItemNew" @change="changeItemNew">
            <option value=null>{{num3}}</option>
            <option value=1>是</option>
            <option value=0>否</option>
          </select>
        </div>
        <div class="btns" @click="clickCx">查询</div>
        <div class="footer-foo">
          <!-- 表格部分 -->
          <div class="content-2">
            <div class="label-t">
              <div class="fh fontS1">手机号</div>
              <div class="lc fontS1 contentshoptext">是否下载木知了APP</div>
              <div class="wfmc fontS1 contentshoptext">是否已支付1元参与抽奖</div>
              <div class="wfmm fontS1 contentshoptext">是否云闪付拉新用户</div>
            </div>
            <!-- 此处循环   -->
            <div class="label-box">
              <!-- <PlatForm></PlatForm> -->
              <div>
                <van-list
                  v-model="loading"
                  :finished="finished"
                  :immediate-check="false"
                  finished-text="没有更多了"
                  @load="onLoad"
                  :offset="10"
                >
                  <div class="label-b" v-for="item in itemList" :key="item.id">
                    <div class="fhx">{{ item.phone || '暂无手机号' }}</div>
                    <div class="lcx">{{ item.isDowloadLt == 1 ? '是' : '否' }}</div>
                    <div class="wfmcx">{{ item.isPay == 1 ? '是' : '否' }}</div>
                    <div class="wfmmx">{{ item.isYsfUsers == 1 ? '是' : '否' }}</div>
                  </div>
                </van-list>
                <div class="no-data" v-if="!this.itemList">
                  <!--  <img src="../assets/images/null.png" alt= "暂无记录" class="img"  />  -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 日期弹出 组件  -->
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
      isNoShow: false,
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
        teamUsers:''
      },

      loading: false,
      finished: false,
      // pageNo: 1, //请求第几页
      pageSize: 10, //每页请求的数量
      total: 0, //总共的数据条 数
      itemList: [],
      intermeName: '',  // 渠道商名称
      isTeamLeader: '', //推广者是否是团长
      teamUsers: '', //团长数量
    }
  },
  mounted() {},
  created() {
    this.getData()
    this.getDataDetail()
  },
  methods: {
    // 新增团队长详情页
    teamClick() {
      this.$router.push({ name: 'teamleader',query:{teamUsers:this.teamUsers} })
    },
    changeCantion(e) {
      this.num1= '全部';
      if (e.target.value == 'null') {
        console.log('进来了')
        this.num1= '全部';
      }
    },
    changePayment(e) {
      this.num2= '全部';
      if (e.target.value == 'null') {
        console.log('进来了')
        this.num2= '全部';
      }
    },
    changeItemNew(e) {
      this.num3= '全部';
      if (e.target.value == 'null') {
        console.log('进来了')
        this.num3= '全部';
      }
    },
    //总数据
    async getData() {
      const params = {}
      // console.log('this.endTime', this.endTime)
      // console.log('this.startTime', this.startTime)

      // console.log('this.selectItemContain', this.form.selectItemContain)
      // console.log('this.selectItemNew', this.form.selectItemNew)
      // console.log('this.selectItemPayment', this.form.selectItemPayment)
      // if(this.endTime != '' ){
      //    params.endTime = this.endTime
      // }
      // if(this.startTime != ''){
      //    params.startTime = this.startTime
      // }
      // if(this.isDowloadLt != ''){
      //    params.isDowloadLt = this.form.selectItemContain
      // }
      // if(this.isYsfUsers != ''){
      //    params.isYsfUsers = this.form.selectItemNew
      // }
      // if(this.isPay != ""){
      //    params.isPay = this.form.selectItemPayment
      // }
      // if(this.phone != ''){
      //    params.phone = this.form.inputTel
      // }

      params.type = this.type
      params.pageNo = this.pageNo
      params.pageSize = this.pageSize
      console.log('params', params)

      params.endTime = this.endTime
      params.startTime = this.startTime
      console.log("this.form.selectItemContain",this.form.selectItemContain);

      if (this.form.selectItemContain != null) {
        params.isDowloadLt =Number(this.form.selectItemContain) 
      }else{
        params.isDowloadLt =this.form.selectItemContain
      }
      if (this.form.selectItemNew != null) {
        params.isNewYsf =Number(this.form.selectItemNew) 
      }else {
        params.isNewYsf =this.form.selectItemNew
      }
      if (this.form.selectItemPayment != null) {
        params.isPay =Number(this.form.selectItemPayment) 
      }else {
        params.isPay =this.form.selectItemPayment
      }

      // params.isDowloadLt = this.form.selectItemContain //是否下载木知了
      // params.isYsfUsers = this.form.selectItemNew //是否云闪付拉新用户
      // params.isPay = this.form.selectItemPayment //是否已支付一元
      params.phone = this.form.inputTel //手机号码
      let res = await api.getInfoDataCount(params)
      console.log('res111总数居', res)
      if (res.data == 1) {
        console.log(888888)
        this.isAction = true
        this.isActions = false
        this.resDatapa = '您还不是渠道商哦!'
        this.isNoShow = true
        return
      }
      // if (res.data.list.length == 0) {
      //   console.log(11111111);
      //   this.isAction = true
      //   this.isActions = false
      //   this.resDatapa = "你好没有任何推广数据哦!"
      //   this.isNoShow = true
      //   return
      // }else if (res.data == 1) {
      //   this.isAction = true
      //   this.isActions = false
      //   this.resDatapa = "你还不是渠道商哦!"
      //   this.isNoShow = true
      //   return
      // }
      if (res.status == 200) {
        this.arrayData.cumulativeUsers = res.data.cumulativeUsers
        this.arrayData.dateTime = res.data.dateTime
        this.arrayData.dowloadLtUsers = res.data.dowloadLtUsers
        this.arrayData.dowloadYsfUsers = res.data.dowloadYsfUsers
        this.arrayData.newYsfUsers = res.data.newYsfUsers
        this.arrayData.users = res.data.users
        this.arrayData.teamUsers = res.data.teamUsers

        this.intermeName = res.data.intermeName //渠道商名称
        this.isTeamLeader = res.data.isTeamLeader  //推广者是否是团长
        this.teamUsers = res.data.teamUsers  //团长数量
        
      }
    },
    // 获取列 表
    async getDataDetail() {
      console.log(1111);
      const params = {}

      // if(this.endTime != ''){
      //    params.endTime = this.endTime
      // }
      // if(this.startTime != ''){
      //    params.startTime = this.startTime
      // }
      // if(this.isDowloadLt != ''){
      //    params.isDowloadLt = this.form.selectItemContain
      // }
      // if(this.isYsfUsers != ''){
      //    params.isYsfUsers = this.form.selectItemNew
      // }
      // if(this.isPay != ''){
      //    params.isPay = this.form.selectItemPayment
      // }
      // if(this.phone != ''){
      //    params.phone = this.form.inputTel
      // }

      params.type = this.type
      params.pageNo = this.pageNo
      params.pageSize = this.pageSize
      params.endTime = this.endTime
      params.startTime = this.startTime

      if (this.form.selectItemContain != null) {
        params.isDowloadLt =Number(this.form.selectItemContain) 
      }else{
        params.isDowloadLt =this.form.selectItemContain
      }
      if (this.form.selectItemNew != null) {
        params.isNewYsf =Number(this.form.selectItemNew) 
      }else {
        params.isNewYsf =this.form.selectItemNew
      }
      if (this.form.selectItemPayment != null) {
        params.isPay =Number(this.form.selectItemPayment) 
      }else {
        params.isPay =this.form.selectItemPayment
      }
      // params.isDowloadLt = this.form.selectItemContain //是否下载木知了
      // params.isYsfUsers = this.form.selectItemNew //是否云闪付拉新用户
      // params.isPay = this.form.selectItemPayment //是否已支付一元
      params.phone = this.form.inputTel //手机号码

      let res = await api.getDataDetail(params).then((res) => {
        // if (res.data.list.length == 0 &&  this.type == 1) {
        //     this.resDatapa = "您还没有任何推广数据哦!"
        //   this.isNoShow = true
        //   return
        // }else {
        //   this.isNoShow = false
        // }
        //this.$api.pay.schedule(params) 是我自己封装的get请求接
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
      this.isTeamLeader = ''
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
      this.getData()
      this.getDataDetail()
    },
    //点击获取推广者信息
    async clickTg() {
      this.isNoShow = false
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


      this.getData()
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

      this.getData()
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
      
      this.getData()
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
      this.getData()
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
      this.getData()
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
      this.getData()
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
  .dataSho {
    width: 90%;
    height: 60px;
    background-color: #fff;
    border-radius: 25px;
    margin:0 auto 30px;
    text-align: left;
    padding: 0 20px;
    .dataSho1 {
      display: inline-block;
      width: 50px;
      height: 100%;
      background-color: skyblue;
      background: url('../../assets/img/isx.png');
      background-repeat: no-repeat;
      background-position: center;
      margin-right: 10px;
    }
    .dataAllDf {
      display: inline-block;
      text-align: left;
      width: calc(100% - 60px);
      height: 60px;
      line-height: 60px;
      font-weight: 700;
      font-size: 28px;
      vertical-align: text-bottom;
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
    padding: 20px 20px 40px;
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
            font-size: 45px;
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
            font-size: 45px;
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
            font-size: 45px;
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
            font-size: 45px;
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
            font-size: 45px;
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
      .numberAll6 {
        width: 50%;
        display: inline-block;
        height: 150px;
        .img {
          width: 100px;
          height: 150px;
          display: inline-block;
          background: url('../../assets/img/ikx.png');
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
            font-size: 45px;
            font-weight: 700;
            line-height: 75px;
          }
          .content2 {
            width: 100%;
            height: 75px;
            // padding-right: 20px;
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
            .contentshoptext1 {
              // display: inline-block;
              width: 100%;
              height: 35px;
              color: #EBD092;
              text-align: center;
              font-size: 28px;
              border-radius:25px ;
              img {
                margin-left: 10px;
              }
            }
          }
        }
      }
    }
  }
  .footerAll {
    width: 100%;
    // height: 900px;
    background-color: #fff;
    margin-top: 40px;
    padding: 40px;
    .footerAll1 {
      width: 100%;
      // height: 200px;
      // background-color: yellow;
      .footerAll2 {
        display: inline-block;
        width: 48%;
        height: 90px;
        input {
          width: 100%;
          height: 70px;
          border-radius: 10px;
          border: 2px solid #dddddd;
          padding: 5px 10px 0;
          font-size: 28px;
          color: #999999;
        }
      }
      .footerAll3 {
        display: inline-block;
        width: 48%;
        height: 90px;
        margin-left: 4%;
        select {
          height: 70px;
          width: 100%;
          border-radius: 10px;
          border: 2px solid #dddddd;
          font-size: 28px;
          color: #999999;
          background-color: #fff;
          padding: 5px 10px 0;
        }
      }
      .footerAll4 {
        display: inline-block;
        width: 48%;
        height: 90px;
        select {
          height: 70px;
          width: 100%;
          border-radius: 10px;
          border: 2px solid #dddddd;
          font-size: 28px;
          color: #999999;
          background-color: #fff;
          padding: 5px 10px 0;
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
          border: 2px solid #dddddd;
          font-size: 28px;
          color: #999999;
          background-color: #fff;
          padding: 5px 10px 0;
        }
      }
      .btns {
        width: 100%;
        height: 70px;
        background-color: #ebd092;
        border-radius: 10px;
        color: #fff;
        line-height: 70px;
        font-size: 34px;
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
              width: 29%;
              display: inline-block;
              height: 150px;
              // line-height:  150px;
              font-size: 30px;
              font-weight: 700;
              text-align: center;
              border: 1px solid #dedede;
              vertical-align: top;
            }
            .lc {
              width: 22%;
              display: inline-block;
              height: 150px;
              line-height: 70px;
              font-size: 30px;
              font-weight: 700;
              text-align: center;
              border: 1px solid #dedede;
              border-left: transparent;
            }
            .wfmc {
              width: 27%;
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
              width: 22%;
              display: inline-block;
              height: 150px;
              line-height: 70px;
              font-size: 30px;
              font-weight: 700;
              text-align: center;
              border: 1px solid #dedede;
              border-left: transparent;
            }
          }
          .label-box {
            width: 100%;
            height: 280px;
            overflow: hidden;
            overflow-x: visible;
            overflow-y: auto;
            .label-b {
              width: 100%;
              height: 70px;
              border-bottom: 1px solid #f4f4f4;
              color: #a0a0a0;
              .fhx {
                width: 29%;
                display: inline-block;
                height: 70px;
                line-height: 70px;
                font-size: 30px;
                text-align: center;
                border: 1px solid #dedede;
              }
              .lcx {
                width: 22%;
                display: inline-block;
                height: 70px;
                line-height: 70px;
                font-size: 30px;
                text-align: center;
                border: 1px solid #dedede;
                border-left: transparent;
              }
              .wfmcx {
                width: 27%;
                display: inline-block;
                height: 70px;
                line-height: 70px;
                font-size: 30px;
                text-align: center;
                border: 1px solid #dedede;
                border-left: transparent;
              }
              .wfmmx {
                width: 22%;
                display: inline-block;
                height: 70px;
                line-height: 70px;
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
</style>
