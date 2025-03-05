import type { App } from 'vue'

export * from './modules/layout'
export * from './modules/theme'

export function setupPinia(app: App) {
  const pinia = createPinia()
  app.use(pinia)
}
