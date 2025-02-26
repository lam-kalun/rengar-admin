import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
    auths?: string[]
    icon?: string
    hideMenu?: boolean
    active?: RouterKey
  }
}
