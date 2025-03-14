import { routes } from '@/router/routes'
import { filterRoutes } from '@/router/utils'
import type { RouteRecordRaw } from 'vue-router'

export const useRouterStore = defineStore('router', () => {
  const rolesRoutes = filterRoutes(routes, (route) => {
    return Array.isArray(route.meta?.roles) && route.meta?.roles.length > 0
  })

  async function filterRouterByRoles(codes: string[]) {
    return filterRoutes(rolesRoutes, (route) => {
      return (
        Array.isArray(route.meta?.roles) &&
        route.meta?.roles.length > 0 &&
        route.meta?.roles.some((role) => codes.includes(role))
      )
    })
  }

  const menuTree = ref<RouteRecordRaw[]>([])
  async function gernerateMenuTree(codes: string[]) {
    menuTree.value = filterRoutes(routes, (route) => {
      if (route.meta?.hideInMenu) return false
      if (Array.isArray(route.meta?.roles) && route.meta?.roles.length > 0) {
        return route.meta?.roles.some((role) => codes.includes(role))
      }
      return true
    })
  }

  return {
    menuTree,
    filterRouterByRoles,
    gernerateMenuTree,
  }
})
