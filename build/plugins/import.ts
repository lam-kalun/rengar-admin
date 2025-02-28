import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

import type { Plugin } from 'vite'
export function setupAutoImportPlugin(viteEnv: ImportMetaEnv): Plugin[] {
  const { VITE_ICON_PREFIX, VITE_ICON_LOCAL_PREFIX } = viteEnv

  const localIconPath = path.join(process.cwd(), 'src/assets/svg-icons')

  /** The name of the local icon collection */
  const collectionName = VITE_ICON_LOCAL_PREFIX.replace(`${VITE_ICON_PREFIX}-`, '')

  const plugins: Plugin[] = [
    Icons({
      compiler: 'vue3',
      customCollections: {
        [collectionName]: FileSystemIconLoader(localIconPath, (svg) =>
          svg.replace(/^<svg\s/, '<svg width="1em" height="1em" ')
        )
      },
      scale: 1,
      defaultClass: 'inline-block'
    }),
    createSvgIconsPlugin({
      iconDirs: [localIconPath],
      symbolId: `${VITE_ICON_LOCAL_PREFIX}-[dir]-[name]`,
      customDomId: '__SVG_ICON_LOCAL__'
      // svgoOptions: {
      //   full: true,
      //   plugins: [
      //     {
      //       name: 'removeAttrs',
      //       params: {
      //         attrs: ['fill']
      //       }
      //     }
      //   ]
      // }
    }),
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
      resolvers: [
        NaiveUiResolver(),
        IconsResolver({ customCollections: [collectionName], componentPrefix: VITE_ICON_PREFIX })
      ],
      dts: path.resolve(process.cwd(), 'typings/app/components.d.ts'),
      directoryAsNamespace: true
    })
  ]
  return plugins
}
