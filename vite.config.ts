import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'

import { setupVitePlugins } from './build/plugins'

export default defineConfig(({ mode }) => {
  const vitEnv = loadEnv(mode, process.cwd(), '') as unknown as ImportMetaEnv
  return {
    server: {
      port: Number(vitEnv.VITE_APP_PORT),
    },
    plugins: setupVitePlugins(),
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
