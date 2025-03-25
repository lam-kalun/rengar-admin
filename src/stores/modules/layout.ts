import { useMediaQuery } from '@vueuse/core'

export const useLayoutStore = defineStore(
  'layout',
  () => {
    const layoutMode = ref<App.Layout.LayoutMode>('aside')

    const showAsideMode = computed(() => layoutMode.value === 'aside')
    const showTopMode = computed(() => layoutMode.value === 'top')
    const showTopAsideMode = computed(() => layoutMode.value === 'top-aside')
    function layoutModeChangeAction(mode: App.Layout.LayoutMode) {
      layoutMode.value = mode
      localStorage.setItem(saveKey, mode)
    }

    const isPc = useMediaQuery('(min-width: 1025px)')
    const isPad = useMediaQuery('(min-width: 768px) and (max-width: 1024px)')
    const isMobile = useMediaQuery('(max-width: 767px)')

    const saveKey = 'layoutMode'
    const config = reactive<App.Layout.Config>({
      asideWidth: 220,
      headerHeight: 56,
      footerHeight: 46,
      tabHeight: 44,
      gap: 12,
      asideCollapse: isPad.value,
      asideCollapseWidth: 64,
    })

    watch(
      [isPc, isPad, isMobile],
      ([isPcVal, isPadVal, isMobileVal]) => {
        if (isPcVal) {
          config.asideCollapse = false
        }
        if (isPadVal) {
          config.asideCollapse = true
        }

        console.log(isMobileVal)
      },
      {
        immediate: true,
      },
    )

    function toggleAsideCollapse() {
      config.asideCollapse = !config.asideCollapse
    }

    const showConfigDrawer = ref(false)
    function toggleConfigDrawer() {
      showConfigDrawer.value = !showConfigDrawer.value
    }

    return {
      config,
      showConfigDrawer,
      layoutMode,
      showAsideMode,
      showTopMode,
      showTopAsideMode,
      isPc,
      isMobile,
      isPad,
      toggleAsideCollapse,
      toggleConfigDrawer,
      layoutModeChangeAction,
    }
  },
  {
    persist: {
      storage: localStorage,
      pick: ['layoutMode', 'config'],
      omit: ['config.asideCollapse'],
    },
  },
)
