export const useThemeStore = defineStore('theme', () => {
  const config = reactive<App.Theme.Config>({
    asideShadow: '2px 0 8px 0 rgb(29, 35, 41, 0.05)',
    headerShadow: '0 1px 2px rgb(0, 21, 41, 0.08)',
    tabShadow: '0 1px 2px rgb(0, 21, 41, 0.08)'
  })

  return {
    config
  }
})
