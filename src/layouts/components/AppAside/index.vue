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
      <AppMenu :data="menuStore.menuRoutes" />
    </NLayoutContent>
  </NLayout>
</template>

<script setup lang="ts">
import { useLayoutStore, useMenuStore } from '@/stores'
import { numberToPx } from '@rengar/utils'
import AppLogo from '../common/AppLogo.vue'
import AppMenu from '../common/AppMenu.vue'
const layoutStore = useLayoutStore()
const { config } = storeToRefs(layoutStore)

const menuStore = useMenuStore()
</script>

<style scoped></style>
