<script setup lang="ts">
const i18n = useI18n()
function handleCommand(command: string) {
  i18n.locale.value = command
}
</script>

<template>
  <el-dropdown trigger="click" @command="handleCommand">
    <span>

      <div i-mdi-translate />

    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="zh-CN">
          简体中文
        </el-dropdown-item>
        <el-dropdown-item command="en">
          English
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
