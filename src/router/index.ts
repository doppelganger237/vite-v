import { createRouter, createWebHistory } from 'vue-router'
// import routes from '~pages'

import { setupLayouts } from 'virtual:generated-layouts'
// import generatedRoutes from '~pages'
import generatedRoutes from 'virtual:generated-pages'

const routes = setupLayouts(generatedRoutes)

const router = createRouter({
  // ...
  history: createWebHistory(),
  routes,
})
export default router
