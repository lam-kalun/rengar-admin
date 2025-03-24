import { useOsTheme } from 'naive-ui'
import { themeColors, primaryColorKey } from '@rengar/theme'
import type { GlobalThemeOverrides } from 'naive-ui'
const themeStorageKey = 'theme'
export const useThemeStore = defineStore('theme', () => {
  const osTheme = useOsTheme()
  const themoMode = ref<App.Theme.ThemeMode>((localStorage.getItem(themeStorageKey) as App.Theme.ThemeMode) || 'light')
  const theme = computed(() => {
    if (themoMode.value === 'light') return 'light'
    if (themoMode.value === 'dark') return 'dark'
    return osTheme.value || 'light'
  })

  watch(
    theme,
    (val) => {
      if (val === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
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

  const themeOverrides = computed<GlobalThemeOverrides>(() => {
    return {
      Layout: {
        colorEmbedded: theme.value === 'light' ? '#f8fafc' : 'transparent',
        footerColor: theme.value === 'light' ? '#f8fafc' : 'transparent',
      },
      common: {
        primaryColor: themeColors[primaryColorKey].DEFAULT,
        primaryColorHover: themeColors[primaryColorKey]['400'],
        primaryColorPressed: themeColors[primaryColorKey]['700'],
        primaryColorSuppl: themeColors[primaryColorKey]['400'],
      },
    }
  })

  return {
    themeOverrides,
    themoMode,
    theme,
    toggleTheme,
  }
})
