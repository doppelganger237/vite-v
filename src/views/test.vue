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
  <main class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
    <RouterView />
    <Footer />
    <div class="mt-5 mx-auto text-center opacity-25 text-sm">
      [Home Layout]
    </div>
  </main>
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
