import { useAuthStore } from '@/stores'
import { to as awaitTo } from '@rengar/utils'
import type { Router } from 'vue-router'

export function setupRouterGuard(router: Router) {
  const authStore = useAuthStore()
  // const routerStore = useRouterStore()

  router.beforeEach(async (to) => {
    // 常量路由直接通过（除登录页外）
    if (to.meta.constant) {
      return true
    }

    const isLogin = Boolean(authStore.user.token)
    const isUserDetail = Boolean(authStore.user.id)
    if (to.path === '/login') {
      return isLogin ? '/' : true
    }

    // 处理需要登录的页面
    if (!isLogin) {
      // 未登录，重定向到登录页
      return '/login'
    }

    if (isLogin && !isUserDetail) {
      // 有token但是没有用户信息，重新获取用户信息
      const [err] = await awaitTo(authStore.authDetailAction())
      if (err) {
        authStore.reset()
        return '/login'
      }

      // const codes = authStore.user.codes
      // if (!codes) return true
      // const routes = await routerStore.filterRouterByRoles(codes)
      // await routerStore.gernerateMenuTree(codes)
      // // 移除所有动态路由
      // router.getRoutes().forEach((route) => {
      //   if ((Array.isArray(route.meta.roles) && route.meta?.roles?.length > 0) || route.name === 'not-found') {
      //     router.removeRoute(route.name as string)
      //   }
      // })

      // 添加过滤后的动态路由
      // routes.forEach((route) => {
      //   router.addRoute(route)
      // })
      // router.addRoute({
      //   path: '/:pathMatch(.*)*',
      //   name: 'not-found',
      //   redirect: '/404',
      // })
      // // 重定向到完整的路由路径
      // return { ...to, replace: true }
    }

    if (to.redirectedFrom) {
      const roles = to.redirectedFrom.meta.roles
      if (Array.isArray(roles) && roles.length > 0 && !roles.some((role) => authStore.roleMap.has(role))) {
        return '/404'
      }
    }

    const roles = to.meta.roles
    if (Array.isArray(roles) && roles.length > 0 && !roles.some((role) => authStore.roleMap.has(role))) {
      return '/404'
    }

    // 已登录且访问其他页面，允许访问
    return true
  })
}
