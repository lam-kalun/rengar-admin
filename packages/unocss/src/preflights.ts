import { colorVariables } from '@rengar/theme'
import type { Preflight } from 'unocss'

export function createPreflights(): Preflight[] {
  return [
    {
      getCSS() {
        return `
         :root {
            ${colorVariables}
          }
        `
      }
    }
  ]
}
