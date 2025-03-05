import 'virtual:uno.css'
import './assets/styles/main.css'

import { createApp } from 'vue'

import { setupPinia } from './stores'
import { setupRouter } from './router'

import App from './App.vue'
import AppLoading from '@/components/AppLoading/index.vue'

function bootstrap() {
  const appLoading = createApp(AppLoading)
  appLoading.mount('#app-loading')
  const app = createApp(App)
  setupPinia(app)
  setupRouter(app)
  app.mount('#app')
  appLoading.unmount()
}

bootstrap()
