<template>
  <div class="app-container">
    这是首页

    <span class="iconify" data-icon="fa:home"></span>
  </div>
</template>
<route lang="yaml">
meta:
  title: "首页"
  icon: "ic:baseline-dashboard"
  menu: true
</route>

<script setup>
const router = useRouter();
</script>
