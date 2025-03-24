export const useLayoutStore = defineStore('layout', () => {
  const config = reactive<App.Layout.Config>({
    asideWidth: 220,
    headerHeight: 56,
    footerHeight: 46,
    tabHeight: 44,
    gap: 12,
    asideCollapse: false,
    asideCollapseWidth: 64,
  })

  function toggleAsideCollapse() {
    config.asideCollapse = !config.asideCollapse
  }

  const showConfigDrawer = ref(false)
  function toggleConfigDrawer() {
    showConfigDrawer.value = !showConfigDrawer.value
  }

  const layoutMode = ref<App.Layout.LayoutMode>('aside')
  function layoutModeChangeAction(mode: App.Layout.LayoutMode) {
    layoutMode.value = mode
  }

  return {
    config,
    showConfigDrawer,
    layoutMode,
    toggleAsideCollapse,
    toggleConfigDrawer,
    layoutModeChangeAction,
  }
})
