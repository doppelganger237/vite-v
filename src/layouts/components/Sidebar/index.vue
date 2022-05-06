<template>
  <div
    class="has-logo"
    :style="{ backgroundColor: variables.menuLightBackground }"
  >
    <logo :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :background-color="variables.menuLightBackground"
        :text-color="variables.menuLightColor"
        :collapse="isCollapse"
        :collapse-transition="false"
        mode="vertical"
      >
        <SidebarItem
          v-for="(r, index) in sidebarRouters"
          :key="r.path + index"
          :item="r"
          :base-path="r.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import variables from "@/assets/styles/variables.module.scss";
import Logo from "./Logo.vue";
import SidebarItem from "./SidebarItem.vue";

const route = useRoute();
const appStore = useAppStore();
const permissionStore = usePermissionStore();

// 所有路由
const sidebarRouters = computed(() => permissionStore.sidebarRouters);
console.log(sidebarRouters.value);

const isCollapse = computed(() => !appStore.sidebar.opened);

const activeMenu = computed(() => {
  const { meta, path } = route;
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return path;
});
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
