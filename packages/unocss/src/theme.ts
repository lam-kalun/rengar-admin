import { generateThemeColor } from '@rengar/theme'
import type { PresetWind3Theme } from 'unocss'
export function createTheme(primaryColorKey: TailwindColorKey): PresetWind3Theme {
  const themeColors = generateThemeColor(primaryColorKey)
  return {
    colors: generateThemeColorVariables(themeColors)
  }
}

function generateThemeColorVariables(colors: ThemeColor) {
  const themeColorsariables: ThemeColor = {} as ThemeColor
  for (const [colorName, colorShades] of Object.entries(colors)) {
    if (typeof colorName === 'string') {
      themeColorsariables[colorName as keyof ThemeColor] = {} as Record<ThemeColorValue, string>
      for (const [shade] of Object.entries(colorShades)) {
        const variableName = `var(--color-${colorName}${shade === 'DEFAULT' ? '' : '-' + shade})`
        themeColorsariables[colorName as keyof ThemeColor][shade as ThemeColorValue] = variableName
      }
    }
  }
  return themeColorsariables
}
