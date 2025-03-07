import { useOsTheme } from 'naive-ui'
import type { GlobalThemeOverrides } from 'naive-ui'
export const useThemeStore = defineStore('theme', () => {
  const osTheme = useOsTheme()
  const theme = ref<'light' | 'dark'>(osTheme.value || 'light')
  watch(osTheme, (newValue) => {
    theme.value = newValue || 'light'
  })
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
        primaryColor: 'var(--color-primary',
        primaryColorHover: 'var(--color-primary-400)',
        primaryColorPressed: 'var(--color-primary-700)',
        primaryColorSuppl: 'var(--color-primary-400)'
      }
    }
  })

  return {
    themeOverrides,
    theme,
    toggleTheme
  }
})
