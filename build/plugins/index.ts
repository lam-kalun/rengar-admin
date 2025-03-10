import type { PluginOption } from 'vite'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

import { setupUnocssPlugin } from './unocss'
import { setupRouter } from './router'
import { setupAutoImportPlugin } from './import'
export function setupVitePlugins(mode: string) {
  const plugins: PluginOption[] = [vue(), vueJsx(), vueDevTools(), setupUnocssPlugin(), ...setupAutoImportPlugin()]

  if (mode === 'development') {
    plugins.push(setupRouter())
  }
  return plugins
}
