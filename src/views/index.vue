<template>
  <div class="Boxs">
    <lucky-wheel></lucky-wheel>
  </div>
</template>

<script>
// import LuckyWheel from '../components/luckywheel'
import LuckyWheel from '../components/luckNewWheel'

export default {
  name: 'index',
  components: {
    LuckyWheel
  }
}
</script>
<style>
.Boxs {
  width: 100%;
  height: 100%;
  background-color: #d4131a;
  overflow-x: hidden;
}
</style>
