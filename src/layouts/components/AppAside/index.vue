<template>
  <NLayout position="absolute">
    <NLayoutHeader
      :style="{
        height: numberToPx(config.headerHeight),
      }"
    >
      <AppLogo />
    </NLayoutHeader>
    <NLayoutContent
      :native-scrollbar="false"
      position="absolute"
      :style="{
        top: numberToPx(config.headerHeight),
        bottom: 0,
      }"
    >
      <AppMenu />
    </NLayoutContent>
  </NLayout>
</template>

<script setup lang="ts">
import { useLayoutStore } from '@/stores'
import { numberToPx } from '@rengar/utils'
import AppLogo from '../common/AppLogo.vue'
import AppMenu from '../common/AppMenu.vue'
const layoutStore = useLayoutStore()
const { config } = storeToRefs(layoutStore)
</script>

<style scoped></style>
