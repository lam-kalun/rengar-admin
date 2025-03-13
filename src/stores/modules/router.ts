import { routes } from '@/router/routes'
import { useAuthStore } from './auth'
import { filterRoutes } from '@/router/utils'
import type { RouteRecordRaw } from 'vue-router'

export const useRouterStore = defineStore('router', () => {
  const rolesRoutes = filterRoutes(routes, (node) => {
    return Array.isArray(node.meta?.roles) && node.meta?.roles.length > 0
  })

  const authStore = useAuthStore()

  async function filterRouterByRoles() {
    const codes = authStore.user.codes ?? []
    function filterByRoles(routes: RouteRecordRaw[]): RouteRecordRaw[] {
      return routes.reduce<RouteRecordRaw[]>((acc, route) => {
        // 检查当前路由是否有权限要求
        const roles = route.meta?.roles as string[] | undefined

        // 如果没有权限要求，或者用户拥有所需权限
        const hasPermission = !roles || roles.some((role) => codes.includes(role))

        if (hasPermission) {
          const filteredRoute = { ...route }

          // 如果有子路由，递归过滤
          if (route.children?.length) {
            const filteredChildren = filterByRoles(route.children)
            if (filteredChildren.length) {
              filteredRoute.children = filteredChildren
            } else {
              delete filteredRoute.children
            }
          }

          acc.push(filteredRoute)
        }

        return acc
      }, [])
    }

    return filterByRoles(rolesRoutes)
  }

  return {
    filterRouterByRoles,
  }
})
