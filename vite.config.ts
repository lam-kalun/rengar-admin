import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'

import { setupVitePlugins } from './build/plugins'

export default defineConfig(({ mode }) => {
  const viteEnv = loadEnv(mode, process.cwd(), '') as unknown as ImportMetaEnv
  return {
    base: viteEnv.VITE_BASE_URL, // 设置基础路径
    server: {
      port: Number(viteEnv.VITE_APP_PORT),
    },

    plugins: setupVitePlugins(),
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },

    build: {
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia'],
            'naive-ui': ['naive-ui'],
          },
        },
      },
    },
  }
})
