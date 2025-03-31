import { traverseRoutes } from '@/router/utils'
import { routes } from '@/router/routes'
import { useAuthStore } from './auth'
import { cloneDeep, uniqBy } from 'es-toolkit'

export const useTabStore = defineStore(
  'tab',
  () => {
    const authStore = useAuthStore()
    const tabsList = ref<App.Tab[]>([])
    const fixedTabList: App.Tab[] = []
    const activeFullPath = ref('')
    const router = useRouter()
    watch(
      () => router.currentRoute.value,
      (val) => {
        const meta = val.matched.find((item) => item.name === val.name)?.meta
        if (!meta) return
        if (meta.layout && meta.layout !== 'base') return
        if (meta.hideInTab) {
          activeFullPath.value = ''
          return
        }
        addTabsAction({
          title: meta.title,
          fullPath: val.fullPath,
          icon: meta.icon,
          localIcon: meta.localIcon,
        })
        activeFullPath.value = val.fullPath
      },
    )
    function addTabsAction(tab: App.Tab) {
      const index = tabsList.value.findIndex((item) => item.fullPath === tab.fullPath)
      if (index !== -1) {
        return
      }
      tabsList.value.push(tab)
    }

    function removeTabsAction(tab: App.Tab) {
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

    function closeOtherTabsAction(tab: App.Tab) {
      tabsList.value = [...fixedTabList, tab]
      router.replace(tab.fullPath)
    }
    function closeLeftTabsAction(tab: App.Tab) {
      const index = tabsList.value.findIndex((item) => item.fullPath === tab.fullPath)
      if (index === -1) return
      tabsList.value = uniqBy([...fixedTabList, ...tabsList.value.slice(index)], (item: App.Tab) => item.fullPath)
      if (activeFullPath.value === tab.fullPath) return
      router.replace(tab.fullPath)
    }
    function closeRightTabsAction(tab: App.Tab) {
      const index = tabsList.value.findIndex((item) => item.fullPath === tab.fullPath)
      if (index === -1) return
      tabsList.value = uniqBy(
        [...fixedTabList, ...tabsList.value.slice(0, index + 1)],
        (item: App.Tab) => item.fullPath,
      )
      router.replace(tab.fullPath)
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
          fullPath: route.path,
          icon: route.meta.icon,
          localIcon: route.meta.localIcon,
          fixedInTab: true,
        })
      })
      tabsList.value = uniqBy([...list, ...tabsList.value], (item: App.Tab) => item.fullPath)
      fixedTabList.push(...list)
    }

    return {
      tabsList,
      activeFullPath,
      removeTabsAction,
      initTabs,
      closeOtherTabsAction,
      closeLeftTabsAction,
      closeRightTabsAction,
      closeAllTabsAction,
    }
  },
  {
    persist: {
      storage: sessionStorage,
      pick: ['tabsList'],
    },
  },
)
