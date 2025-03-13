import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
    roles?: string[]
    icon?: string
    localIcon?: string
    keepAlive?: boolean
    hideInMenu?: boolean
    activeMenu?: RouterName
    constant?: boolean
    order?: number
    href?: string
    multiTab?: boolean
    fixedInTab?: number
  }
}
