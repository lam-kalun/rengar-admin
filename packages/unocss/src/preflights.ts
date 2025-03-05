import { cloneDeep } from 'es-toolkit'
import { themeColors } from '@rengar/theme'
import type { Preflight } from 'unocss'

type ThemeColorWithPrimary = ThemeColor & { primary: Record<ThemeColorValue, string> }
function generateColorVariables(colors: ThemeColorWithPrimary) {
  let cssVariables = ''
  for (const [colorName, colorShades] of Object.entries(colors)) {
    for (const [shade, value] of Object.entries(colorShades)) {
      cssVariables += `--color-${colorName}${shade === 'DEFAULT' ? '' : '-' + shade}: ${value};\n`
    }
  }
  return cssVariables
}

export function createPreflights(primaryColorKey: ThemeColorKey): Preflight[] {
  const colorMap = cloneDeep(themeColors) as ThemeColorWithPrimary
  colorMap.primary = colorMap[primaryColorKey]
  return [
    {
      getCSS() {
        return `
         :root {
            ${generateColorVariables(colorMap)}
          }
        `
      }
    }
  ]
}
