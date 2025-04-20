declare namespace App {
  type ThemeMode = 'light' | 'dark' | 'auto'

  type LayoutMode = 'aside' | 'top' | 'top-aside'
  interface LayoutConfig {
    asideWidth: number
    headerHeight: number
    footerHeight: number
    tabHeight: number
    gap: number
    asideCollapse: boolean
    asideCollapseWidth: number
    showTabs: boolean
    showBreadcrumb: boolean
    showFooter: boolean
  }

  interface BaseLayoutConfig extends Omit<LayoutConfig, 'asideCollapse' | 'asideCollapseWidth'> {
    layoutMode: LayoutMode
  }

  interface Tab {
    title: string
    name: string
    icon?: string
    localIcon?: string
    fixedInTab?: boolean
  }

  interface BaseConfig {
    layout: BaseLayoutConfig
    theme: {
      primaryColor: string
    }
  }

  namespace Auth {
    interface User {
      username?: string
      id?: number
      token?: string
    }
  }
}
