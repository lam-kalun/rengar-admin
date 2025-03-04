import { defineConfig, presetIcons } from 'unocss'

import { presetWind3 } from '@unocss/preset-wind3'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

export default defineConfig({
  presets: [
    presetWind3,
    presetIcons({
      extraProperties: {
        display: 'inline-block'
      },
      collections: {
        // 本地svg图标
        local: FileSystemIconLoader('./src/assets/svg-icons', (svg) =>
          svg.replace(/^<svg\s/, '<svg width="1em" height="1em" ')
        )
      }
    })
  ],
  shortcuts: [
    {
      'flex-center': 'flex justify-center items-center',
      'flex-x-center': 'flex items-center',
      'flex-y-center': 'flex justify-center',
      'flex-col': 'flex flex-col'
    },
    {
      'absolute-lt': 'absolute left-0 top-0',
      'absolute-lb': 'absolute left-0 bottom-0',
      'absolute-rt': 'absolute right-0 top-0',
      'absolute-rb': 'absolute right-0 bottom-0',
      'absolute-tl': 'absolute-lt',
      'absolute-tr': 'absolute-rt',
      'absolute-bl': 'absolute-lb',
      'absolute-br': 'absolute-rb',
      'absolute-center': 'absolute-lt flex-center size-full',
      'fixed-lt': 'fixed left-0 top-0',
      'fixed-lb': 'fixed left-0 bottom-0',
      'fixed-rt': 'fixed right-0 top-0',
      'fixed-rb': 'fixed right-0 bottom-0',
      'fixed-tl': 'fixed-lt',
      'fixed-tr': 'fixed-rt',
      'fixed-bl': 'fixed-lb',
      'fixed-br': 'fixed-rb',
      'fixed-center': 'fixed-lt flex-center size-full'
    }
  ]
})
