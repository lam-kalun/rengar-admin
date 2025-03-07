<template>
  <NConfigProvider
    :theme-overrides="themeStore.themeOverrides"
    :theme="themeStore.theme === 'light' ? lightTheme : darkTheme"
  >
    <NMessageProvider>
      <NDialogProvider>
        <NNotificationProvider>
          <NLoadingBarProvider>
            <InjectNaiveProvider />
            <slot></slot>
          </NLoadingBarProvider>
        </NNotificationProvider>
      </NDialogProvider>
    </NMessageProvider>
  </NConfigProvider>
</template>

<script setup lang="ts">
import { darkTheme, lightTheme } from 'naive-ui'
import { createTextVNode } from 'vue'
import { useThemeStore } from '@/stores'

defineOptions({
  name: 'AppProvider'
})
const themeStore = useThemeStore()

const InjectNaiveProvider = defineComponent({
  name: 'InjectNaiveProvider',
  setup() {
    window.$loadingBar = useLoadingBar()
    window.$dialog = useDialog()
    window.$message = useMessage()
    window.$notification = useNotification()
    return () => createTextVNode()
  }
})
</script>

<style scoped></style>
