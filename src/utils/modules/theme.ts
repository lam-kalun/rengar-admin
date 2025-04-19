import { generateTailwindColorByColor } from '@rengar/color'

export function injectTailwindCssVarToGlobal(color: string, key = 'primary') {
  const colors = generateTailwindColorByColor(color)

  const root = document.documentElement
  for (const colorKey in colors) {
    root.style.setProperty(
      `--color-${key}${colorKey === 'DEFAULT' ? '' : `-${colorKey}`}`,
      colors[colorKey as ThemeColorValue],
    )
  }
  return colors
}
