import 'virtual:uno.css'
import 'virtual:svg-icons-register'
import './assets/styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import AppProvider from '@/components/AppProvider/index.vue'
import AppLoading from '@/components/AppLoading/index.vue'
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
