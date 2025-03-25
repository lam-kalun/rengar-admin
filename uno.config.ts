import { defineConfig, presetIcons } from 'unocss'
import { presetRengarAdmin } from '@rengar/unocss'
import presetWind3 from '@unocss/preset-wind3'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import path from 'node:path'

const svgFilePath = path.resolve(process.cwd(), 'src/assets/svg-icons')
export default defineConfig({
  content: {
    pipeline: {
      exclude: ['node_modules', 'dist'],
    },
  },
  presets: [
    presetWind3,
    presetIcons({
      scale: 1,
      extraProperties: {},
      warn: true,
      collections: {
        local: FileSystemIconLoader(svgFilePath),
      },
    }),
    presetRengarAdmin(),
  ],
})
