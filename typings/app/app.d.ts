declare namespace App {
  namespace Layout {
    interface Config {
      asideWidth: number
      headerHeight: number
      footerHeight: number
      tabHeight: number
      gap: number
      asideCollapse: boolean
      asideCollapseWidth: number
    }

    interface Tab {
      title: string
      fullPath: string
      icon?: string
      localIcon?: string
      fixedInTab?: boolean
    }

    type LayoutMode = 'aside' | 'top' | 'top-aside'
  }

  namespace Auth {
    interface User {
      username?: string
      id?: number
      token?: string
    }
  }

  namespace Theme {
    type ThemeMode = 'light' | 'dark' | 'auto'
  }
}
