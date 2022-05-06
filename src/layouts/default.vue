<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { onBeforeRouteLeave } from 'vue-router'
// 不区分大小写,这玩意跟下面的状态重复了
import { AppMain, Navbar, Sidebar as SidebarComponent } from './components'

const appStore = useAppStore()

const { sidebar, device } = storeToRefs(appStore)

const classObj = computed(() => ({
  hideSidebar: !sidebar.value.opened,
  openSidebar: sidebar.value.opened,
  withoutAnimation: sidebar.value.withoutAnimation,
  mobile: device.value === 'mobile',
}))

function handleClickOutside() {
  appStore.closeSideBar({ withoutAnimation: false })
}

// 为什么切换路由的时候windowssize没有改变,只能这样关闭菜单了
onBeforeRouteLeave((to, from) => {
  if (device.value === 'mobile' && sidebar.value.opened)
    appStore.closeSideBar({ withoutAnimation: false })
})

const { width } = useWindowSize()
const WIDTH = 992 // refer to Bootstrap's responsive design

watchEffect(() => {
  if (width.value - 1 < WIDTH) {
    appStore.toggleDevice('mobile')
    appStore.closeSideBar({ withoutAnimation: true })
  }
  else {
    appStore.toggleDevice('desktop')
  }
})
</script>

<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <SidebarComponent v-if="!sidebar.hide" class="sidebar-container" />
    <div class="main-container">
      <div :class="{ 'fixed-header': false }">
        <navbar />
      </div>
      <app-main />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
</style>
