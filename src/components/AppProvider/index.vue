<template>
  <NConfigProvider
    :theme-overrides="appStore.themeOverrides"
    :theme="appStore.theme === 'light' ? lightTheme : darkTheme"
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
import { useAppStore } from '@/stores'

defineOptions({
  name: 'AppProvider',
})
const appStore = useAppStore()

const InjectNaiveProvider = defineComponent({
  name: 'InjectNaiveProvider',
  setup() {
    window.$loadingBar = useLoadingBar()
    window.$dialog = useDialog()
    window.$message = useMessage()
    window.$notification = useNotification()
    return () => createTextVNode()
  },
})
</script>

<style scoped></style>
