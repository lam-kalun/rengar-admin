<template>
  <header class="h-full flex items-center gap-4 px-4">
    <AppLogo
      v-if="showLogo"
      :style="{
        width: numberToPx(config.asideWidth),
      }"
    />
    <AsideControl v-if="showAsideControl" />
    <div class="min-w-0 flex-1">
      <AppBreadcrumb v-if="showAsideMode" />
      <AppMenu v-if="showTopMode" mode="horizontal" :data="menuStore.menuRoutes" />
      <AppMenu v-if="showTopAsideMode" mode="horizontal" :data="menuStore.menuRoutes" :is-top-menu="true" />
    </div>
    <ToolBtn />
    <UserCard />
  </header>
</template>

<script setup lang="ts">
import AsideControl from '../common/AsideControl.vue'
import ToolBtn from '../common/ToolBtn.vue'
import UserCard from '../common/UserCard.vue'
import AppBreadcrumb from '../common/AppBreadcrumb.vue'
import { useLayoutStore, useMenuStore } from '@/stores'
import AppMenu from '../common/AppMenu.vue'
import AppLogo from '../common/AppLogo.vue'
import { numberToPx } from '@rengar/utils'
const layoutStore = useLayoutStore()
const { showAsideMode, showTopAsideMode, showTopMode, config, isPc, isMobile } = storeToRefs(layoutStore)

const menuStore = useMenuStore()
const { subMenuRoutes } = storeToRefs(menuStore)

const showLogo = computed(() => {
  if (isMobile.value) return false
  if (showTopMode.value) return true
  if (showAsideMode.value) return false
  if (showTopAsideMode.value && subMenuRoutes.value.length === 0) return true
  return false
})

const showAsideControl = computed(() => {
  if (!isPc.value) return false
  if (showAsideMode.value) return true
  if (showTopAsideMode.value && menuStore.subMenuRoutes.length > 0) return true
  return false
})
</script>

<style scoped></style>
