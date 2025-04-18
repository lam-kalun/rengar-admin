export function generateCssColorVariables(colors: TailWindColor) {
  let cssVariables = ''
  for (const [colorName, colorShades] of Object.entries(colors)) {
    for (const [shade, value] of Object.entries(colorShades)) {
      cssVariables += `--color-${colorName}${shade === 'DEFAULT' ? '' : '-' + shade}: ${value};\n`
    }
  }
  return cssVariables
}

export function generateUnocssColor(colors: ThemeColor, key: ThemeColorKey) {
  const primaryColor: Recordable = {}
  for (const [shade] of Object.entries(colors[key])) {
    primaryColor[`primary${shade === 'DEFAULT' ? '' : '-' + shade}`] =
      `var(--color-${key}${shade === 'DEFAULT' ? '' : '-' + shade})`
  }

  return primaryColor
}
