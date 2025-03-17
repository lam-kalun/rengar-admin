import { useAuthStore } from '@/stores'
import { to as awaitTo } from '@rengar/utils'
import type { RouteLocationGeneric, Router } from 'vue-router'

export function setupRouterGuard(router: Router) {
  const authStore = useAuthStore()

  function needPermission(to: RouteLocationGeneric) {
    return Array.isArray(to.meta.roles) && to.meta.roles.length > 0
  }

  function hasPerssion(to: RouteLocationGeneric) {
    const roles = to.meta.roles
    if (Array.isArray(roles) && roles.length > 0 && !roles.some((role) => authStore.roleMap.has(role))) {
      return false
    }
    return true
  }

  router.beforeEach(async (to) => {
    window.$loadingBar?.start()
    if (to.meta.constant) {
      return true
    }

    const isLogin = Boolean(authStore.user.token)
    const isUserDetail = Boolean(authStore.user.id)
    if (to.path === '/login') {
      return isLogin ? '/' : true
    }

    if (!isLogin) {
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
      if (!needPermission(to.redirectedFrom)) {
        return true
      } else {
        return hasPerssion(to.redirectedFrom) ? true : '/404'
      }
    }

    if (!needPermission(to)) {
      return true
    }

    if (!hasPerssion(to)) {
      return '/404'
    }
    return true
  })

  router.afterEach(() => {
    window.$loadingBar?.finish()
  })

  router.onError(() => {
    window.$loadingBar?.error()
  })
}
