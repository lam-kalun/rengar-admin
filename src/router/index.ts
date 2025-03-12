import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { setupRouterGuard } from './guard'

import type { App } from 'vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: '/home',
    },
    ...routes,
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      redirect: '/404',
    },
  ],
})

export default router

export function setupRouter(app: App) {
  app.use(router)
  setupRouterGuard(router)
}
