<script setup lang="ts">
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { ElConfigProvider } from 'element-plus'
// size 用于设置表单组件的默认尺寸，zIndex 用于设置弹出组件的层级
const size = ref('default')
const locale = ref(zhCn)
</script>

<template>
  <el-config-provider :size="size" :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<style>
</style>
