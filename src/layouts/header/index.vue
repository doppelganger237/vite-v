<script setup lang="ts">
import { Breadcrumb, FullScreen, Hamburger } from './components'
import LocalePicker from './components/LocalePicker.vue'
import UserAvatar from './components/UserAvatar.vue'
import Notification from './components/Notification.vue'
const appStore = useAppStore()
</script>

<template>
  <div class="navbar">
    <Hamburger id="hamburger-container" :is-active="appStore.sidebar.opened" class="hamburger-container"
      @toggleClick="appStore.toggleSideBar" />
    <Breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <!-- 手机端不显示全屏按钮 -->
      <FullScreen v-if="appStore.device !== 'mobile'" id="screenfull" class="right-menu-item" />

      <Notification class="right-menu-item" />

      <LocalePicker class="right-menu-item" />

      <UserAvatar class="right-menu-item" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .topmenu-container {
    position: absolute;
    left: 50px;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    display: flex;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: flex;
      align-items: center;
      padding: 0 8px;
      font-size: 1.2em;
      color: #5a5e66;

      cursor: pointer;

      &:hover {
        transition: background 0.3s;

        background-color: rgba(8, 4, 4, 0.025);

      }
    }

    // .notification-badge {
    //   line-height: 1;
    // }

  }
}
</style>
