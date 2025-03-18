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
  }

  namespace Auth {
    interface User {
      username?: string
      id?: number
      token?: string
    }
  }

  namespace Store {
    interface Tab {
      title: string
      fullPath: string
      icon?: string
      localIcon?: string
      fixedInTab?: boolean
    }
  }
}
