import { themeColors } from '@rengar/color'
import type { Preflight } from 'unocss'
function generateColorVariables(colors: Recordable) {
  let cssVariables = ''
  for (const [colorName, colorShades] of Object.entries(colors)) {
    for (const [shade, value] of Object.entries(colorShades)) {
      cssVariables += `--color-${colorName}-${shade}: ${value};\n`
    }
  }
  return cssVariables
}

export const preflights: Preflight[] = [
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
