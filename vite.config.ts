import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'

import { setupVitePlugins } from './build/plugins'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const vitEnv = loadEnv(mode, process.cwd(), '') as ImportMetaEnv

  return {
    server: {
      port: Number(vitEnv.VITE_APP_PORT)
    },
    plugins: setupVitePlugins(vitEnv),
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        cmp: fileURLToPath(new URL('./src/components', import.meta.url)),
        views: fileURLToPath(new URL('./src/views', import.meta.url)),
        utils: fileURLToPath(new URL('./src/utils', import.meta.url)),
        assets: fileURLToPath(new URL('./src/assets', import.meta.url)),
        api: fileURLToPath(new URL('./src/api', import.meta.url))
      }
    }
  }
})
