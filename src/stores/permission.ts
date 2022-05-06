import { getRouters } from '@/api/user'
import Layout from '@/layouts/default.vue'
import InnerLink from '@/components/InnerLink.vue'

// https://vitejs.dev/guide/features.html#glob-import 动态加载模块
// https://blog.csdn.net/qq_28550263/article/details/121987350
const modules = import.meta.glob('./../../views/**/*.vue')

export const usePermissionStore = defineStore('permission', {
  state: () => {
    return {
      routes: [],
      addRoutes: [],
      defaultRoutes: [],
      topbarRouters: [],
      sidebarRouters: [],
    }
  },
  actions: {
    async generateRoutes(constantRoutes) {
      return await getRouters().then((res) => {
        const sdata = JSON.parse(JSON.stringify(res))
        const rdata = JSON.parse(JSON.stringify(res))
        const defaultData = JSON.parse(JSON.stringify(res))
        const sidebarRoutes = filterAsyncRouter(sdata)
        const rewriteRoutes = filterAsyncRouter(rdata, false, true)
        const defaultRoutes = filterAsyncRouter(defaultData)

        this.addRoutes = rewriteRoutes
        this.routes = constantRoutes.concat(rewriteRoutes)

        this.sidebarRouters = constantRoutes.concat(sidebarRoutes)

        this.defaultRoutes = sidebarRoutes

        this.topbarRouters = defaultRoutes

        return rewriteRoutes
      })
    },
  },
})

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap, lastRouter = false, type = false) {
  return asyncRouterMap.filter((route) => {
    if (type && route.children)
      route.children = filterChildren(route.children)

    if (route.component) {
      // Layout ParentView 组件特殊处理
      if (route.component === 'Layout')
        route.component = Layout

      else if (route.component === 'ParentView')
        route.component = ParentView

      else if (route.component === 'InnerLink')
        route.component = InnerLink

      else
        route.component = loadView(route.component)
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, route, type)
    }
    else {
      delete route.children
      delete route.redirect
    }
    return true
  })
}

function filterChildren(childrenMap, lastRouter = false) {
  let children = []
  childrenMap.forEach((el, index) => {
    if (el.children && el.children.length) {
      if (el.component === 'ParentView' && !lastRouter) {
        el.children.forEach((c) => {
          c.path = `${el.path}/${c.path}`
          if (c.children && c.children.length) {
            children = children.concat(filterChildren(c.children, c))
            return
          }
          children.push(c)
        })
        return
      }
    }
    if (lastRouter)
      el.path = `${lastRouter.path}/${el.path}`

    children = children.concat(el)
  })
  return children
}

export const loadView = (view) => {
  let res
  for (const path in modules) {
    const dir = path.split('views/')[1].split('.vue')[0]
    if (dir === view)
      res = () => modules[path]()
  }
  return res
}
