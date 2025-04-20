import { traverseRoutes } from '@/router/utils'
import { routes } from '@/router/routes'
import { useAuthStore } from './auth'
import { cloneDeep, uniqBy } from 'es-toolkit'

export const useTabStore = defineStore('tab', () => {
  const authStore = useAuthStore()
  const tabsList = ref<App.Tab[]>([])
  const fixedTabList: App.Tab[] = []
  const activeRouteName = ref('')
  const router = useRouter()
  watch(
    () => router.currentRoute.value,
    (val) => {
      const meta = val.matched.find((item) => item.name === val.name)?.meta
      if (!meta) return
      if (meta.layout && meta.layout !== 'base') return
      if (meta.hideInTab) {
        activeRouteName.value = ''
        return
      }
      addTabsAction({
        title: meta.title,
        name: val.name as string,
        icon: meta.icon,
        localIcon: meta.localIcon,
      })
      activeRouteName.value = val.name as string
    },
  )
  function addTabsAction(tab: App.Tab) {
    const index = tabsList.value.findIndex((item) => item.name === tab.name)
    if (index !== -1) {
      return
    }
    tabsList.value.push(tab)
  }

  function removeTabsAction(tab: App.Tab) {
    const index = tabsList.value.findIndex((item) => item.name === tab.name)
    const isLast = tabsList.value.length === index + 1
    if (index === -1) return
    tabsList.value.splice(index, 1)

    if (activeRouteName.value === tab.name) {
      if (isLast) {
        router.push({ name: tabsList.value[index - 1].name })
      } else {
        router.push({ name: tabsList.value[index].name })
      }
    }
  }

  function closeOtherTabsAction(tab: App.Tab) {
    tabsList.value = uniqBy([...fixedTabList, tab], (item: App.Tab) => item.name)
    router.replace({ name: tab.name })
  }
  function closeLeftTabsAction(tab: App.Tab) {
    const index = tabsList.value.findIndex((item) => item.name === tab.name)
    if (index === -1) return
    tabsList.value = uniqBy([...fixedTabList, ...tabsList.value.slice(index)], (item: App.Tab) => item.name)
    if (activeRouteName.value === tab.name) return
    router.replace({ name: tab.name })
  }
  function closeRightTabsAction(tab: App.Tab) {
    const index = tabsList.value.findIndex((item) => item.name === tab.name)
    if (index === -1) return
    tabsList.value = uniqBy([...fixedTabList, ...tabsList.value.slice(0, index + 1)], (item: App.Tab) => item.name)
    router.replace({ name: tab.name })
  }
  function closeAllTabsAction() {
    tabsList.value = cloneDeep(fixedTabList)
    router.replace('/')
  }

  function initTabs() {
    const roleMap = authStore.roleMap
    const list: App.Tab[] = []
    traverseRoutes(routes, (route) => {
      const roles = route.meta?.role
      if (Array.isArray(roles) && roles.length > 0 && !roles.some((role) => roleMap.has(role))) {
        return
      }
      if (!route.meta?.fixedInTab) return
      if (route.meta.layout && route.meta.layout !== 'base') return
      list.push({
        title: route.meta.title,
        name: route.name as string,
        icon: route.meta.icon,
        localIcon: route.meta.localIcon,
        fixedInTab: true,
      })
    })
    tabsList.value = uniqBy([...list, ...tabsList.value], (item: App.Tab) => item.name)
    fixedTabList.push(...list)
  }

  return {
    tabsList,
    activeRouteName,
    removeTabsAction,
    initTabs,
    closeOtherTabsAction,
    closeLeftTabsAction,
    closeRightTabsAction,
    closeAllTabsAction,
  }
})
