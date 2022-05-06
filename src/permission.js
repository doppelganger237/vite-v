import router from "./router";
import { useUserStore } from "@/stores/user";
import { getToken } from "@/utils/auth";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false });
const whiteList = ["/login", "/register"];
router.beforeEach((to, from, next) => {
  NProgress.start();
  const userStore = useUserStore();
  if (getToken()) {
    // 已登录用户
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done();
    } else {
      // 界玩意刷新页面会丢失
      if (!userStore.username) {
        userStore
          .getInfo()
          .then(() => {
            const permissionStore = usePermissionStore();
            permissionStore
              .generateRoutes(router.options.routes)
              .then((accessRoutes) => {
                // 根据roles权限生成可访问的路由表
                //console.log(accessRoutes);
                // TODO, 路由有重复, 代码代优化
                accessRoutes.forEach((route) => {
                  router.addRoute(route); // 动态添加可访问路由表
                });
                next({ ...to, replace: false }); // hack方法 确保addRoutes已完成
              });
          })
          .catch((err) => {
            // 获取用户信息失败
            userStore.logout();
            next({ path: "/login" });
          });
      } else {
        next();
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else {
      next({ path: "/login" });
      NProgress.done();
    }
  }
});
router.afterEach(() => {
  NProgress.done();
});
