import process from 'node:process'
import path from 'node:path'
import unocss from 'unocss/vite'
import { presetIcons } from 'unocss'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

export function setupUnocssPlugin(viteEnv: ImportMetaEnv) {
  const { VITE_ICON_PREFIX, VITE_ICON_LOCAL_PREFIX } = viteEnv
  const localIconPath = path.join(process.cwd(), 'src/assets/svg-icons')
  const collectionName = VITE_ICON_LOCAL_PREFIX.replace(`${VITE_ICON_PREFIX}-`, '')

  return unocss({
    presets: [
      presetIcons({
        prefix: `${VITE_ICON_PREFIX}-`,
        scale: 1,
        extraProperties: {
          display: 'inline-block',
          'vertical-align': 'middle'
        },
        collections: {
          [collectionName]: FileSystemIconLoader(localIconPath, (svg) =>
            svg.replace(/^<svg /, '<svg width="1em" height="1em" fill="currentColor"')
          )
        },
        warn: true
      })
    ]
  })
}
