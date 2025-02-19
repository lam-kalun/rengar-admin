import type { PluginOption } from 'vite'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

import { setupHtmlPlugin } from './html'
import { setupUnocssPlugin } from './unocss'
export function setupVitePlugins(viteEnv: ImportMetaEnv) {
  const plugins: PluginOption[] = [vue(), vueJsx(), vueDevTools(), setupHtmlPlugin(viteEnv), setupUnocssPlugin()]

  return plugins
}
