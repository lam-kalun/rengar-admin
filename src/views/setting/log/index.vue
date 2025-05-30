<template>
  <NCard title="本地日志">
    {{ logInfo }}
  </NCard>
</template>

<script setup lang="tsx">
import { useTabStore } from '@/stores/modules/tab.ts'

const tabStore = useTabStore()
const logInfo = reactive<Api.Setting.LogInfo>({
  tabList: tabStore.tabsList,
})
</script>

<style lang="scss" scoped></style>
