import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import type { Plugin } from 'vite'
export function setupAutoImportPlugin(): Plugin[] {
  const plugins: Plugin[] = [
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
        {
          'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar']
        }
      ],
      dts: path.resolve(process.cwd(), 'typings/app/auto-imports.d.ts')
    }),
    Components({
      resolvers: [NaiveUiResolver()],
      dts: path.resolve(process.cwd(), 'typings/app/components.d.ts'),
      directoryAsNamespace: true
    })
  ]
  return plugins
}
