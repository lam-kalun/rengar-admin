import { useOsTheme } from 'naive-ui'
import { themeColors, primaryColorKey } from '@rengar/theme'
import type { GlobalThemeOverrides } from 'naive-ui'

const bgColor = '#f8fafc'
const themeStorageKey = 'theme'
export const useThemeStore = defineStore('theme', () => {
  const osTheme = useOsTheme()
  const themoMode = ref<App.Theme.ThemeMode>((localStorage.getItem(themeStorageKey) as App.Theme.ThemeMode) || 'light')
  const theme = computed(() => {
    if (themoMode.value === 'light') return 'light'
    if (themoMode.value === 'dark') return 'dark'
    return osTheme.value || 'light'
  })

  const themeOverrides = reactive<GlobalThemeOverrides>({
    Layout: {
      colorEmbedded: theme.value === 'light' ? bgColor : 'transparent',
      footerColor: theme.value === 'light' ? bgColor : 'transparent',
    },
    common: {
      primaryColor: themeColors[primaryColorKey].DEFAULT,
      primaryColorHover: themeColors[primaryColorKey]['400'],
      primaryColorPressed: themeColors[primaryColorKey]['700'],
      primaryColorSuppl: themeColors[primaryColorKey]['400'],
    },
  })

  watch(
    theme,
    (val) => {
      if (val === 'dark') {
        document.documentElement.classList.add('dark')
        themeOverrides.Layout!.colorEmbedded = 'transparent'
        themeOverrides.Layout!.footerColor = 'transparent'
      } else {
        document.documentElement.classList.remove('dark')
        themeOverrides.Layout!.colorEmbedded = bgColor
        themeOverrides.Layout!.footerColor = bgColor
      }
    },
    {
      immediate: true,
    },
  )

  function toggleTheme() {
    if (themoMode.value === 'auto') {
      themoMode.value = 'light'
    } else if (themoMode.value === 'light') {
      themoMode.value = 'dark'
    } else {
      themoMode.value = 'auto'
    }
    localStorage.setItem(themeStorageKey, themoMode.value)
  }

  return {
    themeOverrides,
    themoMode,
    theme,
    toggleTheme,
  }
})
