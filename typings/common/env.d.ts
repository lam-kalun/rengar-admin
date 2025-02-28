declare interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_PORT: string
  readonly VITE_ICON_PREFIX: string
  readonly VITE_ICON_LOCAL_PREFIX: string
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv
}
