<script setup lang="ts">
const iconRef = ref()
</script>

<template>
  <div>
    <el-badge is-dot class="notification-badge">
      <i-carbon-notification ref="iconRef" />
    </el-badge>
  </div>
</template>
