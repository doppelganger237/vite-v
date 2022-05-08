<script setup lang="ts">
import Enter from './components/Enter.vue'
import ChatMsg from './components/ChatMsg.vue'
const props = defineProps({
  id: Number | String,
})
</script>

<template>
  <el-container class="pm-container">
    <el-container>
      <el-header class="pm-header">
        聊天对象名称
      </el-header>
      <el-main class="pm-main" />
      <ChatMsg />
      <el-footer class="tool-box">
        <Enter />
      </el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.pm-container {
  height: 100%;
  background-color: white;
  box-shadow: 0px 0px 6px 2px rgb(38 103 166 / 8%);

}

.tool-box {

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.pm-main {
  background-color: rgb(236 235 235);
  border: none;
}
</style>
