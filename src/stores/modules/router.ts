export const useRouterStore = defineStore('router', () => {
  const tabsList = ref<App.Store.Tab[]>([])
  const activeIndex = ref(-1)
  const router = useRouter()
  watch(
    () => router.currentRoute.value,
    (val) => {
      console.log(val)
      const meta = val.matched.find((item) => item.name === val.name)!.meta
      addTabsAction({
        title: meta.title,
        fullPath: val.fullPath,
        icon: meta.icon,
        localIcon: meta.localIcon,
      })
      activeIndex.value = tabsList.value.length - 1
    },
    { immediate: true, deep: true },
  )
  function addTabsAction(tab: App.Store.Tab) {
    const index = tabsList.value.findIndex((item) => item.fullPath === tab.fullPath)
    if (index !== -1) {
      return
    }
    tabsList.value.push(tab)
  }

  function removeTabsAction(index: number) {
    tabsList.value.splice(index, 1)
    if (index)
      if (index === activeIndex.value) {
        activeIndex.value = index - 1
        router.push(tabsList.value[activeIndex.value].fullPath)
      }
  }

  return {
    tabsList,
    activeIndex,
    removeTabsAction,
  }
})
