import 'virtual:uno.css'
import './assets/styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { AppProvider } from 'cmp/AppProvider'
import router from './router'

const app = createApp(AppProvider)

app.use(createPinia())
app.use(router)

app.mount('#app')
