<script>
export default {

  name: 'Index',
}
</script>

<template>
  <el-container>
    <el-header>Header</el-header>
    <el-main>Main</el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<style scoped>
html,
body,
#app,
.el-container {
  height: 100%;
}

.el-header,
.el-footer {

  background-color: #B3C0D1;
  color: #333;
  text-align: center;
}

.el-main {

  background-color: #E9EEF3;
  color: #333;
  text-align: center;

}
</style>
