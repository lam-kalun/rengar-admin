import type { RouteLocationNormalizedLoadedGeneric } from 'vue-router'

interface Tab {
  title: string
  fullPath: string
  icon?: string
  localIcon?: string
}

export const useRouterStore = defineStore('router', () => {
  const tabsList = ref<Tab[]>([])
  const router = useRouter()
  watch(
    () => router.currentRoute.value,
    (val) => {
      const meta = val.matched.find((item) => item.name === val.name)!.meta
      addTabsAction({
        title: meta.title,
        fullPath: val.fullPath,
        icon: meta.icon,
        localIcon: meta.localIcon,
      })
    },
    { immediate: true, deep: true },
  )
  function addTabsAction(tab: Tab) {
    console.log(tab)
    const index = tabsList.value.findIndex((item) => item.fullPath === tab.fullPath)
    if (index !== -1) {
      return
    }
    tabsList.value.push(tab)
  }

  function removeTabsAction(tab: RouteLocationNormalizedLoadedGeneric) {
    const index = tabsList.value.findIndex((item) => item.fullPath === tab.fullPath)
    if (index !== -1) {
      tabsList.value.splice(index, 1)
    }
  }

  return {
    tabsList,
    removeTabsAction,
  }
})
