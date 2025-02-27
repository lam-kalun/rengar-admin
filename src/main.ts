import 'virtual:uno.css'
import './assets/styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { AppProvider, AppLoading } from '@/components'
import router from './router'

function bootstrap() {
  const appLoading = createApp(AppLoading)
  appLoading.mount('#app-loading')
  const app = createApp(AppProvider)
  app.use(createPinia())
  app.use(router)
  appLoading.unmount()
  app.mount('#app')
}

bootstrap()
