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
        v-model:active="menuStore.activeMenu"
        :data="showAsideMode ? menuStore.menuRoutes : menuStore.subMenuRoutes"
        :collapsed="config.asideCollapse"
      />
    </NLayoutContent>
  </NLayout>
</template>

<script setup lang="ts">
import { useAppStore, useMenuStore } from '@/stores'
import { numberToPx } from '@/utils/tools'
import AppLogo from '../common/AppLogo.vue'
import AppMenu from '../common/AppMenu.vue'
const appStore = useAppStore()
const { config, showAsideMode } = storeToRefs(appStore)

const menuStore = useMenuStore()
</script>

<style scoped></style>
