import { routes } from '@/router/routes'
import { useAuthStore } from './auth'
import { filterRoutes } from '@/router/utils'
import type { RouteRecordRaw } from 'vue-router'
import { cloneDeep } from 'es-toolkit'

export const useMenuStore = defineStore('menu', () => {
  const authStore = useAuthStore()
  const menuRoutes = ref<RouteRecordRaw[]>([])
  function sortMenus(menus: RouteRecordRaw[]): RouteRecordRaw[] {
    // 对当前层级的菜单进行排序
    const sortedMenus = menus.sort((a, b) => {
      const sortA = a.meta?.order || 0
      const sortB = b.meta?.order || 0
      return sortA - sortB
    })

    // 递归处理子菜单
    sortedMenus.forEach((menu) => {
      if (menu.children) {
        menu.children = sortMenus(menu.children)
      }
    })

    return sortedMenus
  }

  function gernerateMenus() {
    const roleMap = authStore.roleMap
    const filterMenus = filterRoutes(routes, (route) => {
      if (route.meta?.hideInMenu) return false
      const roles = route.meta?.role
      if (Array.isArray(roles) && roles.length > 0) {
        return roles.some((role) => roleMap.has(role))
      }
      return true
    })
    const menus = sortMenus(filterMenus)
    menuRoutes.value = menus
  }

  const topMenusRoutes = computed(() => {
    return menuRoutes.value.map((item) => {
      const menu = cloneDeep(item)
      Reflect.deleteProperty(menu, 'children')
      return menu
    })
  })

  return {
    menuRoutes,
    topMenusRoutes,
    gernerateMenus,
  }
})
