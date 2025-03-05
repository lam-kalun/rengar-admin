import { presets } from './src/presets'
import { shortcuts } from './src/shortcuts'
import { createTheme } from './src/theme'
import { createPreflights } from './src/preflights'

export function createUnocssConfig() {
  return {
    presets,
    theme: createTheme(),
    shortcuts,
    preflights: createPreflights()
  }
}
