import { useAuthStore, useRouterStore } from '@/stores'
import { to as awaitTo } from '@/utils'
import type { Router } from 'vue-router'

export function setupRouterGuard(router: Router) {
  const authStore = useAuthStore()
  const routerStore = useRouterStore()

  router.beforeEach(async (to) => {
    // 常量路由直接通过（除登录页外）
    if (to.meta.constant && to.path !== '/login') {
      return true
    }

    const isAuthenticated = Boolean(authStore.user.token && authStore.user.id)
    const shouldGetUserInfo = Boolean(authStore.user.token && !authStore.user.id)

    if (to.path === '/login') {
      if (shouldGetUserInfo || isAuthenticated) {
        return '/'
      }
      return true
    }

    if (shouldGetUserInfo) {
      // 有token但是没有用户信息，重新获取用户信息
      const [err] = await awaitTo(authStore.authDetailAction())

      if (err) {
        return '/login'
      }

      const codes = authStore.user.codes
      if (!codes) return true
      const routes = await routerStore.filterRouterByRoles(codes)
      await routerStore.gernerateMenuTree(codes)
      // 移除所有动态路由
      router.getRoutes().forEach((route) => {
        if ((Array.isArray(route.meta.roles) && route.meta?.roles?.length > 0) || route.name === 'not-found') {
          router.removeRoute(route.name as string)
        }
      })

      // 添加过滤后的动态路由
      routes.forEach((route) => {
        router.addRoute(route)
      })
      router.addRoute({
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        redirect: '/404',
      })

      // 重定向到完整的路由路径
      return { ...to, replace: true }
    }

    // 处理需要登录的页面
    if (!isAuthenticated) {
      // 未登录，重定向到登录页
      return '/login'
    }

    // 已登录且访问其他页面，允许访问
    return true
  })
}
