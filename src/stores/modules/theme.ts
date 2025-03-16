import { useOsTheme } from 'naive-ui'
import { themeColors, primaryColorKey } from '@rengar/theme'
import type { GlobalThemeOverrides } from 'naive-ui'
const themeStorageKey = 'theme'
export const useThemeStore = defineStore('theme', () => {
  const osTheme = useOsTheme()
  const themeMode = ref<ThemeMode>((localStorage.getItem(themeStorageKey) as ThemeMode) || 'light')
  const theme = computed(() => {
    if (themeMode.value === 'light') return 'light'
    if (themeMode.value === 'dark') return 'dark'
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
    if (themeMode.value === 'auto') {
      themeMode.value = 'light'
    } else if (themeMode.value === 'light') {
      themeMode.value = 'dark'
    } else {
      themeMode.value = 'auto'
    }
    localStorage.setItem(themeStorageKey, themeMode.value)
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
    themeMode,
    theme,
    toggleTheme,
  }
})
