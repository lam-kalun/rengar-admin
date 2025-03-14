import { createRouter, createWebHistory } from 'vue-router'
import { setupRouterGuard } from './guard'
import { routes } from './routes'
import { filterRoutes } from './utils'

import type { App } from 'vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: '/home',
    },
    ...filterRoutes(routes, (route) => !route.meta?.roles || route.meta?.roles.length === 0),
  ],
})

export default router

export function setupRouter(app: App) {
  app.use(router)
  setupRouterGuard(router)
}
