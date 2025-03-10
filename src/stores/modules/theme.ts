import { useOsTheme } from 'naive-ui'
import { themeColors, primaryColorKey } from '@rengar/theme'
import type { GlobalThemeOverrides } from 'naive-ui'
export const useThemeStore = defineStore('theme', () => {
  const osTheme = useOsTheme()
  const theme = ref<'light' | 'dark'>(osTheme.value || 'light')
  watch(osTheme, (newValue) => {
    theme.value = newValue || 'light'
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
      immediate: true
    }
  )

  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  const themeOverrides = computed<GlobalThemeOverrides>(() => {
    return {
      Layout: {
        colorEmbedded: theme.value === 'light' ? '#f8fafc' : 'transparent',
        footerColor: theme.value === 'light' ? '#f8fafc' : 'transparent'
      },
      common: {
        primaryColor: themeColors[primaryColorKey].DEFAULT,
        primaryColorHover: themeColors[primaryColorKey]['400'],
        primaryColorPressed: themeColors[primaryColorKey]['700'],
        primaryColorSuppl: themeColors[primaryColorKey]['400']
      }
    }
  })

  return {
    themeOverrides,
    theme,
    toggleTheme
  }
})
