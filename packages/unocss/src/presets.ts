import { presetIcons, type Preset } from 'unocss'

import presetWind3 from '@unocss/preset-wind3'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import path from 'node:path'

const svgFilePath = path.resolve(process.cwd(), 'src/assets/svg-icons')
export const presets: Preset[] = [
  presetWind3,
  presetIcons({
    extraProperties: {
      display: 'inline-block'
    },
    collections: {
      local: FileSystemIconLoader(svgFilePath, (svg) => svg.replace(/^<svg\s/, '<svg width="1em" height="1em" '))
    }
  })
]
