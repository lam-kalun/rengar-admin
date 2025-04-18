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

  interface Tab {
    title: string
    name: string
    icon?: string
    localIcon?: string
    fixedInTab?: boolean
  }

  interface BaseConfig {
    layout: {
      config: Partial<App.LayoutConfig>
      layoutMode: App.LayoutMode
    }
    theme: {
      primaryColor?: string
      themeMode: App.App.ThemeMode
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
