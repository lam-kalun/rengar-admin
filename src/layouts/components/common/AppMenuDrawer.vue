<template>
  <NDrawer
    v-model:show="show"
    :width="400"
    :native-scrollbar="true"
    :auto-focus="false"
    placement="left"
    style="width: 80%"
  >
    <NDrawerContent title="系统菜单" :native-scrollbar="false" closable>
      <AppMenu :data="menuStore.menuRoutes" @change="handleMenuChange" />
    </NDrawerContent>
  </NDrawer>
</template>

<script setup lang="ts">
import AppMenu from './AppMenu.vue'
import { useMenuStore, useLayoutStore } from '@/stores'
const show = defineModel<boolean>('show', {
  required: true,
})

const menuStore = useMenuStore()
const layoutStore = useLayoutStore()

function handleMenuChange() {
  layoutStore.toggleMenuDrawer(false)
}
</script>

<style scoped></style>
