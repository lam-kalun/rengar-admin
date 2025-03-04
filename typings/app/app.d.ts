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

  namespace Theme {
    interface Config {
      asideShadow: string
      headerShadow: string
      tabShadow: string
    }

    interface Color {
      primary: string
    }
  }
}
