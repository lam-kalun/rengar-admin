import { presets } from './src/presets'
import { shortcuts } from './src/shortcuts'
import { theme } from './src/theme'
import { preflights } from './src/preflights'

export function createUnocssConfig() {
  return {
    presets,
    theme,
    shortcuts,
    preflights
  }
}
