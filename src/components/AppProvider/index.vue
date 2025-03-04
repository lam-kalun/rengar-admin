<template>
  <NConfigProvider :theme-overrides="themeOverrides">
    <NMessageProvider>
      <NDialogProvider>
        <NNotificationProvider>
          <NLoadingBarProvider>
            <InjectNaiveProvider />
            <App />
          </NLoadingBarProvider>
        </NNotificationProvider>
      </NDialogProvider>
    </NMessageProvider>
  </NConfigProvider>
</template>

<script setup lang="ts">
import type { GlobalThemeOverrides } from 'naive-ui'
import App from '@/App.vue'
import { colorConfig } from '@rengar/color'
import { createTextVNode } from 'vue'

const themeOverrides: GlobalThemeOverrides = {
  Layout: {
    colorEmbedded: 'rgb(247, 250, 252)',
    footerColor: 'rgb(247, 250, 252)'
  },
  common: {
    primaryColor: colorConfig.primary.DEFAULT
  }
}

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
