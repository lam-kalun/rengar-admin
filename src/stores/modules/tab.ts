import { traverseRoutes } from '@/router/utils'
import { routes } from '@/router/routes'
import { useAuthStore } from './auth'
export const useTabStore = defineStore('tab', () => {
  const authStore = useAuthStore()
  const tabsList = ref<App.Store.Tab[]>([])
  const activeFullPath = ref('')
  const router = useRouter()
  watch(
    () => router.currentRoute.value,
    (val) => {
      const meta = val.matched.find((item) => item.name === val.name)?.meta
      if (!meta) return
      if (meta.layout && meta.layout !== 'base') return
      addTabsAction({
        title: meta.title,
        fullPath: val.fullPath,
        icon: meta.icon,
        localIcon: meta.localIcon,
      })
      activeFullPath.value = val.fullPath
    },
  )
  function addTabsAction(tab: App.Store.Tab) {
    const index = tabsList.value.findIndex((item) => item.fullPath === tab.fullPath)
    if (index !== -1) {
      return
    }
    tabsList.value.push(tab)
  }

  function removeTabsAction(tab: App.Store.Tab) {
    const index = tabsList.value.findIndex((item) => item.fullPath === tab.fullPath)
    const isLast = tabsList.value.length === index + 1
    if (index === -1) return
    tabsList.value.splice(index, 1)

    if (activeFullPath.value === tab.fullPath) {
      if (isLast) {
        router.push(tabsList.value[index - 1].fullPath)
      } else {
        router.push(tabsList.value[index].fullPath)
      }
    }
  }

  function initTabs() {
    const roleMap = authStore.roleMap
    traverseRoutes(routes, (route) => {
      const roles = route.meta?.role
      if (Array.isArray(roles) && roles.length > 0 && !roles.some((role) => roleMap.has(role))) {
        return
      }
      if (!route.meta?.fixedInTab) return
      if (route.meta.layout && route.meta.layout !== 'base') return
      tabsList.value.push({
        title: route.meta.title,
        fullPath: route.path,
        icon: route.meta.icon,
        localIcon: route.meta.localIcon,
        fixedInTab: true,
      })
    })
  }

  return {
    tabsList,
    activeFullPath,
    removeTabsAction,
    initTabs,
  }
})
