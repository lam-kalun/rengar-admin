import { generateThemeColor } from '@rengar/theme'
import type { GlobalThemeOverrides } from 'naive-ui'
export const useThemeStore = defineStore('theme', () => {
  const config = reactive<App.Theme.Config>({
    asideShadow: '2px 0 8px 0 rgb(29, 35, 41, 0.05)',
    headerShadow: '0 1px 2px rgb(0, 21, 41, 0.08)',
    tabShadow: '0 1px 2px rgb(0, 21, 41, 0.08)'
  })

  const primaryColorKey = import.meta.env.VITE_PRIMARY_COLOR_KEY
  const themeColors = generateThemeColor(primaryColorKey)

  const themeOverrides: GlobalThemeOverrides = {
    Layout: {
      colorEmbedded: 'rgb(247, 250, 252)',
      footerColor: 'rgb(247, 250, 252)'
    },
    common: {
      primaryColor: themeColors.primary.DEFAULT,
      primaryColorHover: themeColors.primary[400],
      primaryColorPressed: themeColors.primary[800],
      primaryColorSuppl: themeColors.primary[400]
    }
  }

  return {
    config,
    themeOverrides
  }
})
