import { themeColors } from '../../theme'
import type { PresetWind3Theme } from 'unocss'

export function createTheme(primaryColorKey: ThemeColorKey): PresetWind3Theme {
  return {
    colors: {
      ...themeColors,
      primary: themeColors[primaryColorKey]
    }
  }
}
