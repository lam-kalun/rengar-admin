import { generateThemeColor } from '@rengar/theme'
import type { Preflight } from 'unocss'

export function createPreflights(primaryColorKey: TailwindColorKey): Preflight[] {
  const themeColors = generateThemeColor(primaryColorKey)
  return [
    {
      getCSS() {
        return `
         :root {
            ${generateColorVariables(themeColors)}
          }
        `
      }
    }
  ]
}

function generateColorVariables(colors: ThemeColor) {
  let cssVariables = ''
  for (const [colorName, colorShades] of Object.entries(colors)) {
    for (const [shade, value] of Object.entries(colorShades)) {
      cssVariables += `--color-${colorName}${shade === 'DEFAULT' ? '' : '-' + shade}: ${value};\n`
    }
  }
  return cssVariables
}
