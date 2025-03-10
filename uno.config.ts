import { defineConfig, presetIcons } from 'unocss'
import { presetRengarAdmin } from '@rengar/unocss'
import presetWind3 from '@unocss/preset-wind3'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import path from 'node:path'

const svgFilePath = path.resolve(process.cwd(), 'src/assets/svg-icons')
export default defineConfig({
  presets: [
    presetWind3,
    presetIcons({
      scale: 1,
      extraProperties: {
        display: 'inline-block'
      },
      warn: true,
      collections: {
        local: FileSystemIconLoader(svgFilePath, (svg) => svg.replace(/^<svg\s/, '<svg width="1em" height="1em" '))
      }
    }),
    presetRengarAdmin()
  ]
})
