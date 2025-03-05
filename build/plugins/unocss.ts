import unocss from 'unocss/vite'
import { createUnocssConfig } from '../../packages/unocss'

export function setupUnocssPlugin(viteEnv: ImportMetaEnv) {
  const primaryColorKey = viteEnv.VITE_PRIMARY_COLOR_KEY
  return unocss(createUnocssConfig(primaryColorKey))
}
