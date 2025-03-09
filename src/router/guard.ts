import { useAuthStore } from '@/stores'
import type { Router } from 'vue-router'

export function setupRouterGuard(router: Router) {
  const authStore = useAuthStore()
  console.log(authStore)
  router.beforeEach((to, from, next) => {
    console.log(to, from)
    next()
  })
}
