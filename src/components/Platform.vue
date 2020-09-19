<template>
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
        <div class="fhx">{{item.phone}}</div>
          <div class="lcx">{{item.isDowloadLt}}</div>
          <div class="wfmcx">{{item.isPay}}</div>
        <div class="wfmmx">{{item.isYsUsers}}</div>
      </div>
    </van-list>

    <div class="no-data" v-if="!this.itemList">
      <!-- <img src="../assets/images/null.png" alt="暂无记录" class="img" /> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Platform',
  created() {
    //创建组件时，加载第1页数据
    this.getroadList();
  },

  data() {
    return {
      loading: false,
      finished: false,
      page: 1, //请求第几页
      pageSize: 10, //每页请求的数量
      total: 0, //总共的数据条数
      itemList: [
       {
          phone: '00000000',
          isDowloadLt: "是",
          isPay: "是",
          isYsUsers: "是",
        },
        {
          phone: '00000000',
          isDowloadLt: "是",
          isPay: "是",
          isYsUsers: "是",
        },
        {
          phone: '00000000',
          isDowloadLt: "是",
          isPay: "是",
          isYsUsers: "是",
        },
        {
          phone: '00000000',
          isDowloadLt: "是",
          isPay: "是",
          isYsUsers: "是",
        },
        {
          phone: '00000000',
          isDowloadLt: "是",
          isPay: "是",
          isYsUsers: "是",
        },
        {
          phone: '00000000',
          isDowloadLt: "是",
          isPay: "是",
          isYsUsers: "是",
        },

         {
          phone: '00000000',
          isDowloadLt: "是",
          isPay: "是",
          isYsUsers: "是",
        },
        {
          phone: '00000000',
          isDowloadLt: "是",
          isPay: "是",
          isYsUsers: "是",
        },
        {
          phone: '00000000',
          isDowloadLt: "是",
          isPay: "是",
          isYsUsers: "是",
        },
        {
          phone: '00000000',
          isDowloadLt: "是",
          isPay: "是",
          isYsUsers: "是",
        },
        {
          phone: '00000000',
          isDowloadLt: "是",
          isPay: "是",
          isYsUsers: "是",
        },
        {
          phone: '00000000',
          isDowloadLt: "是",
          isPay: "是",
          isYsUsers: "是",
        },
         {
          phone: '00000000',
          isDowloadLt: "是",
          isPay: "是",
          isYsUsers: "是",
        },
        {
          phone: '00000000',
          isDowloadLt: "是",
          isPay: "是",
          isYsUsers: "是",
        },
        {
          phone: '00000000',
          isDowloadLt: "是",
          isPay: "是",
          isYsUsers: "是",
        },
        {
          phone: '00000000',
          isDowloadLt: "是",
          isPay: "是",
          isYsUsers: "是",
        },
        {
          phone: '00000000',
          isDowloadLt: "是",
          isPay: "是",
          isYsUsers: "是",
        },
        {
          phone: '00000000',
          isDowloadLt: "是",
          isPay: "是",
          isYsUsers: "是",
        },
         {
          phone: '00000000',
          isDowloadLt: "是",
          isPay: "是",
          isYsUsers: "是",
        },
        {
          phone: '00000000',
          isDowloadLt: "是",
          isPay: "是",
          isYsUsers: "是",
        },
        {
          phone: '00000000',
          isDowloadLt: "是",
          isPay: "是",
          isYsUsers: "是",
        },
        {
          phone: '00000000',
          isDowloadLt: "是",
          isPay: "是",
          isYsUsers: "是",
        },
        {
          phone: '00000000',
          isDowloadLt: "是",
          isPay: "是",
          isYsUsers: "是",
        },
        {
          phone: '00000000',
          isDowloadLt: "是",
          isPay: "是",
          isYsUsers: "是",
        },
      ],
    };
  },

  methods: {
    getDataDetail() {
      let params = {
        page: this.page,
        pageSize: this.pageSize,
      };
      //this.$api.pay.schedule(params)是我自己封装的get请求接口
      this.$api.pay.schedule(params).then((res) => {
        let rows = res.data.rows; //请求返回当页的列表

        this.loading = false;
        this.total = res.data.total;

        if (rows == null || rows.length === 0) {
          // 加载结束
          this.finished = true;
          return;
        }

        // 将新数据与老数据进行合并
        this.itemList = this.itemList.concat(rows);

        //如果列表数据条数>=总条数，不再触发滚动加载  返回的总 数字段需要
        if (this.itemList.length >= this.total) {
          this.finished = true;
        }
      });
    },

    //滚动加载时触发，list组件定义的方法
    onLoad() {
      console.log('2222')
      this.page++;
      this.getroadList();
    },
  },
};
</script>
<style lang="less">
.van-list{
  height:100px;
}

 .label-b {
   width: 100%;
   height: 70px;
   border-bottom: 1px solid #F4F4F4;
   color: #A0A0A0;
   .fhx {
     width: 30%;
     display: inline-block;
     height: 70px;
     line-height: 70px;
     font-size: 30px;
     text-align: center;
     border:1px solid #DEDEDE;
   }
   .lcx {
     width: 23%;
     display: inline-block;
     height: 70px;
     line-height: 70px;
     font-size: 30px;
     text-align: center;
     border:1px solid #DEDEDE;
     border-left: transparent;
   }
   .wfmcx {
     width: 28%;
     display: inline-block;
     height: 70px;
     line-height: 70px;
     font-size: 30px;
     text-align: center;
     border:1px solid #DEDEDE;
     border-left: transparent;
   }
   .wfmmx {
     width: 19%;
     display: inline-block;
     height: 70px;
     line-height: 70px;
     font-size: 30px;
     text-align: center;
     border:1px solid #DEDEDE;
     border-left: transparent;
   }
}
</style>
