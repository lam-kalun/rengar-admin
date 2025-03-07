import type { PluginOption } from 'vite'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

import { setupUnocssPlugin } from './unocss'
import { setupRouter } from './router'
import { setupAutoImportPlugin } from './import'
export function setupVitePlugins() {
  const plugins: PluginOption[] = [
    vue(),
    vueJsx(),
    vueDevTools(),
    setupUnocssPlugin(),
    setupRouter(),
    ...setupAutoImportPlugin()
  ]

  return plugins
}
