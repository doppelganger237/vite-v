<template>

   <div class="app-container">

  
  <svg-icon icon-class="download"></svg-icon>
  
  <div class="demo-progress">
    <el-progress :percentage="50" />
    <el-progress :percentage="100" :format="format" />
    <el-progress :percentage="100" status="success" />
    <el-progress :percentage="100" status="warning" />
    <el-progress :percentage="50" status="exception" />
  </div>

  </div>
</template>
<route lang="yaml">
meta:
  title: '测试'
  icon: 'dashboard'
</route>

<script setup>
const format = (percentage) => (percentage === 100 ? 'Full' : `${percentage}%`)
</script>

<style scoped>
.demo-progress .el-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
</style>