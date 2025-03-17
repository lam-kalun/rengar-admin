import type { App } from 'vue'

export { useLayoutStore } from './modules/layout'
export { useThemeStore } from './modules/theme'
export { useAuthStore } from './modules/auth'
export { useRouterStore } from './modules/router'

export function setupPinia(app: App) {
  const pinia = createPinia()
  app.use(pinia)
}
