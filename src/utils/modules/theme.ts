import { getColors } from 'theme-colors'

export function generateAndInjectPrimaryColor(color: string) {
  const colors = getColors(color) as ThemeColorItem
  colors.DEFAULT = colors[500]

  const root = document.documentElement
  for (const colorKey in colors) {
    root.style.setProperty(
      `--color-primary${colorKey === 'DEFAULT' ? '' : `-${colorKey}`}`,
      colors[colorKey as ThemeColorValue],
    )
  }
  return colors
}
