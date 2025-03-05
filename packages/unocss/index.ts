import { presets } from './src/presets'
import { shortcuts } from './src/shortcuts'
import { createTheme } from './src/theme'
import { createPreflights } from './src/preflights'

export function createUnocssConfig(primaryColorKey: TailwindColorKey) {
  return {
    presets,
    theme: createTheme(primaryColorKey),
    shortcuts,
    preflights: createPreflights(primaryColorKey)
  }
}
