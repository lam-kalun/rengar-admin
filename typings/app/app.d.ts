declare namespace App {
  namespace Layout {
    interface Config {
      asideWidth: number
      headerHeight: number
      footerHeight: number
      tabHeight: number
      gap: number
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
