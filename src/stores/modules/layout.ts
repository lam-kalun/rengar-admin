import { useMediaQuery } from '@vueuse/core'
import { useMenuStore } from './menu'
export const useLayoutStore = defineStore(
  'layout',
  () => {
    const menuStore = useMenuStore()
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

    const showAppAside = computed(() => {
      if (isMobile.value) return false
      if (showAsideMode.value) return true
      if (showTopAsideMode.value && menuStore.subMenuRoutes.length > 0) return true
      return false
    })

    const showAppBreadcrumb = computed(() => {
      if (isMobile.value) return false
      if (showAsideMode.value) return true
      return false
    })

    const showHeaderLogo = computed(() => {
      if (showAsideMode.value && !isMobile.value) return false
      if (!isMobile.value && showTopAsideMode.value && menuStore.subMenuRoutes.length > 0) return false
      return true
    })

    const showAsideControl = computed(() => {
      if (!isPc.value) return false
      if (showAsideMode.value) return true
      if (showTopAsideMode.value && menuStore.subMenuRoutes.length > 0) return true
      return false
    })

    const showHeaderMenu = computed(() => {
      if (isMobile.value) return false
      if (!showTopMode.value) return false
      return true
    })

    const showHeaderTopMenu = computed(() => {
      if (isMobile.value) return false
      if (!showTopAsideMode.value) return false
      return true
    })

    watch([isPad, isPc], ([padVal, pcVal]) => {
      if (padVal && showAppAside.value) {
        config.asideCollapse = true
      }

      if (pcVal) {
        config.asideCollapse = false
      }
    })

    function toggleAsideCollapse() {
      config.asideCollapse = !config.asideCollapse
    }

    const showConfigDrawer = ref(false)
    function toggleConfigDrawer() {
      showConfigDrawer.value = !showConfigDrawer.value
    }

    const showMenuDrawer = ref(false)
    function toggleMenuDrawer(val: boolean) {
      showMenuDrawer.value = val
    }

    const layoutContentRef = ref<HTMLElement>()

    function setLayoutContentRef(el: HTMLElement) {
      layoutContentRef.value = el
    }

    const showRouterView = ref(true)

    function refreshRouterView() {
      showRouterView.value = false
      nextTick(() => {
        showRouterView.value = true
      })
    }

    return {
      config,
      showConfigDrawer,
      showMenuDrawer,
      layoutMode,
      showAsideMode,
      showTopMode,
      showTopAsideMode,
      isPc,
      isMobile,
      isPad,

      showAppAside,
      showAppBreadcrumb,
      showHeaderLogo,
      showAsideControl,
      showHeaderMenu,
      showHeaderTopMenu,
      layoutContentRef,
      showRouterView,
      toggleAsideCollapse,
      toggleConfigDrawer,
      layoutModeChangeAction,
      toggleMenuDrawer,
      setLayoutContentRef,
      refreshRouterView,
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
