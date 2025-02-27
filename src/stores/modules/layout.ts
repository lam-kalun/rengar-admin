export const useLayoutStore = defineStore('layout', () => {
  const config = reactive<App.Layout.Config>({
    asideWidth: 220,
    headerHeight: 56,
    footerHeight: 46,
    tabHeight: 44,
    gap: 12
  })

  return {
    config
  }
})
