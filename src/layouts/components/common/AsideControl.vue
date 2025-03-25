<template>
  <NTooltip placement="bottom">
    <template #trigger>
      <div class="flex-center p-1 hover:bg-primary-100">
        <SvgIcon
          v-if="!layoutStore.config.asideCollapse"
          icon="i-line-md:menu-unfold-left"
          class="cursor-pointer text-xl text-primary"
          @click="layoutStore.toggleAsideCollapse"
        ></SvgIcon>
        <SvgIcon
          v-else
          icon="i-line-md:menu-unfold-right"
          class="cursor-pointer text-2xl text-primary"
          @click="layoutStore.toggleAsideCollapse"
        ></SvgIcon>
      </div>
    </template>
    <span>{{ layoutStore.config.asideCollapse ? '展开菜单' : '收起菜单' }}</span>
  </NTooltip>
</template>

<script setup lang="ts">
import { useLayoutStore } from '@/stores'
const layoutStore = useLayoutStore()
</script>

<style scoped></style>
