<template>
  <header class="h-full flex items-center gap-4 px-4">
    <AppLogo
      v-if="showTopMode || showTopAsideMode"
      :style="{
        width: numberToPx(config.asideWidth),
      }"
    />
    <AsideControl v-if="showTopAsideMode" />
    <div class="min-w-0 flex-1">
      <AppBreadcrumb v-if="showAsideMode" />
      <AppMenu v-if="showTopMode" mode="horizontal" :data="menuStore.menuRoutes" />
      <AppMenu
        v-if="showTopAsideMode"
        mode="horizontal"
        :data="menuStore.menuRoutes"
        :is-top-menu="true"
        children-field="list"
      />
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
const { showAsideMode, showTopAsideMode, showTopMode, config } = storeToRefs(layoutStore)

const menuStore = useMenuStore()
</script>

<style scoped></style>
