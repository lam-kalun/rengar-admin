import { traverseRoutes } from '@/router/utils'
import { routes } from '@/router/routes'
import { useAuthStore } from './auth'
export const useKeepAliveStore = defineStore('keepAlive', () => {
  const authStore = useAuthStore()
  const keepAliveList = ref<RouteRecordName[]>([])
  function initKeepAliveData() {
    const roleMap = authStore.roleMap
    const list: RouteRecordName[] = []
    traverseRoutes(routes, (route) => {
      const roles = route.meta?.role
      if (Array.isArray(roles) && roles.length > 0 && !roles.some((role) => roleMap.has(role))) {
        return
      }
      if (!route.meta?.keepAlive) return
      list.push(route.name as RouteRecordName)
    })
    keepAliveList.value = list
  }

  return {
    keepAliveList,
    initKeepAliveData,
  }
})
