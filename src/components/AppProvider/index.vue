<template>
  <NConfigProvider>
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
import App from '@/App.vue'
import { createTextVNode } from 'vue'

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
