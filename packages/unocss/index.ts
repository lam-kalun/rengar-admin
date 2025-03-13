import { themeColors } from '@rengar/theme'
import { generateColorVariables, generateUnocssColor } from './src/utils'
import type { Preset } from 'unocss'

export function presetRengarAdmin(): Preset {
  const preset: Preset = {
    name: 'rengar-admin',
    theme: {
      colors: generateUnocssColor(themeColors, 'primary'),
    },
    preflights: [
      {
        getCSS() {
          return `
           :root {
              ${generateColorVariables(themeColors)}
            }
          `
        },
      },
    ],
    shortcuts: [
      {
        'flex-center': 'flex justify-center items-center',
        'flex-center-x': 'flex items-center',
        'flex-center-y': 'flex justify-center',
        'flex-y': 'flex flex-col',
      },
    ],
  }
  return preset
}
