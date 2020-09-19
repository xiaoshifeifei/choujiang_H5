
<template>
  <!-- :style="{ height: bodyHeight + 'px' }" -->
  <div class="Box1 wraps">
    <div id="copy-txt">
      haizhiliao前方高能预警，朋友圈文案在这里哦：**放大招，一分坐公交，还能领红包！
    </div>
    <button @click="copyTXT()">复制</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false
    }
  },
  mounted() {

  },
  methods: {
    copyTXT(){
      var copyDOM = document.querySelector('#copy-txt'); //指定的D OM元素
      // console.log('copyDOM',copyDOM);
      //  copyDOM.innerHTML = '123465'
      // alert(copyDOM.innerHTML)
      var range = document.createRange(); // 创建容器
      range.selectNode(copyDOM); // 选中需要复制的节点
      window.getSelection().addRange(range); // 执行选中元素
      var successful = document.execCommand('copy');// 执行 copy 操作
      try {
          var msg = successful ? 'successful' : 'unsuccessful';
          console.log('Copy was ' + msg);
      } catch(err) {
          console.log('unable to copy');
      }
      window.getSelection().removeAllRanges(); // 移除选中的元素
      }
  }
}
</script>
<style></style>
