import { tailWindColor } from '@rengar/color'
import { generateCssColorVariables } from './src/utils'
import type { Preset } from 'unocss'

export function presetRengarAdmin(): Preset {
  const preset: Preset = {
    name: 'rengar-admin',
    theme: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          800: 'var(--color-primary-800)',
          900: 'var(--color-primary-900)',
          950: 'var(--color-primary-950)',
        },
      },
    },
    preflights: [
      {
        getCSS() {
          return `
           :root {
              ${generateCssColorVariables(tailWindColor)}
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
      {
        'absolute-center-x': 'absolute left-1/2 -translate-x-1/2',
        'absolute-center-y': 'absolute top-1/2 -translate-y-1/2',
        'absolute-center': 'absolute-center-x absolute-center-y',
      },
      {
        'no-scrollbar': '[&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]',
      },
    ],
  }
  return preset
}
