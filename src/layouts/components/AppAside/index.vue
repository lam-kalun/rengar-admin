<template>
  <NLayout position="absolute">
    <NLayoutHeader
      :style="{
        height: numberToPx(config.headerHeight),
      }"
    >
      <AppLogo :show-title="!config.asideCollapse" />
    </NLayoutHeader>
    <NLayoutContent
      :native-scrollbar="false"
      position="absolute"
      :style="{
        top: numberToPx(config.headerHeight),
        bottom: 0,
      }"
    >
      <AppMenu
        :data="showAsideMode ? menuStore.menuRoutes : menuStore.subMenuRoutes"
        :collapsed="config.asideCollapse"
      />
    </NLayoutContent>
  </NLayout>
</template>

<script setup lang="ts">
import { useLayoutStore, useMenuStore } from '@/stores'
import { numberToPx } from '@rengar/utils'
import AppLogo from '../common/AppLogo.vue'
import AppMenu from '../common/AppMenu.vue'
const layoutStore = useLayoutStore()
const { config, showAsideMode } = storeToRefs(layoutStore)

const menuStore = useMenuStore()
</script>

<style scoped></style>
