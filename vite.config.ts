import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'

import { setupVitePlugins } from './build/plugins'

export default defineConfig(({ mode }) => {
  const viteEnv = loadEnv(mode, process.cwd(), '') as unknown as ImportMetaEnv
  return {
    base: '/rengar-admin/', // 确保 base 配置正确
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
        input: {
          main: 'index.html',
          404: '404.html',
        },
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
