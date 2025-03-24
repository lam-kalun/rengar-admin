export const useLayoutStore = defineStore(
  'layout',
  () => {
    const saveKey = 'layoutMode'
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

    const showAsideMode = computed(() => layoutMode.value === 'aside')
    const showTopMode = computed(() => layoutMode.value === 'top')
    const showTopAsideMode = computed(() => layoutMode.value === 'top-aside')
    function layoutModeChangeAction(mode: App.Layout.LayoutMode) {
      layoutMode.value = mode
      localStorage.setItem(saveKey, mode)
    }

    return {
      config,
      showConfigDrawer,
      layoutMode,
      showAsideMode,
      showTopMode,
      showTopAsideMode,
      toggleAsideCollapse,
      toggleConfigDrawer,
      layoutModeChangeAction,
    }
  },
  {
    persist: {
      storage: localStorage,
      pick: ['layoutMode', 'config'],
    },
  },
)
