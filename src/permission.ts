import type { Router } from 'vue-router'
import NProgress from 'nprogress'
import { useUserStore } from '@/stores/user'
import { getToken } from '@/utils/auth'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })
const whiteList = ['/login', '/register']

export function setupRouterGuard(router: Router) {
  createPermissionGurad(router)
  createProgressGuard(router)
}

function createPermissionGurad(router: Router) {
  router.beforeEach(async (to) => {
    const userStore = useUserStore()
    const permissionStore = usePermissionStore()
    if (getToken()) {
      // 已登录用户
      if (to.path === '/login') {
        return ({ path: '/' })
      }
      else {
        // 如果没获取登录用户数据
        if (!userStore.userInfo) {
          await userStore.getInfo()
          await permissionStore.generateRoutes(router)
          return true
        }
        else {
          return true
        }
      }
    }
    else {
      if (whiteList.includes(to.path))

        return true

      else
        return ({ path: '/login' })
    }
  })
}

function createProgressGuard(router: Router) {
  router.beforeEach(async () => {
    NProgress.start()
    return true
  })

  router.afterEach(async () => {
    NProgress.done()
    return true
  })
}
