import type { App } from 'vue'

export * from './modules/layout'
export * from './modules/theme'
export * from './modules/auth'

export function setupPinia(app: App) {
  const pinia = createPinia()
  app.use(pinia)
}
