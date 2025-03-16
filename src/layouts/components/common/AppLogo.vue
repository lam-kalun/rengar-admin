<template>
  <div class="h-full flex-center gap-4 text-xl text-primary">
    <SvgIcon local-icon="i-local-logo" class="text-4xl"></SvgIcon>
    <div v-if="!layoutStore.config.asideCollapse" class="text-center">{{ title }}</div>
  </div>
</template>

<script setup lang="ts">
import { useLayoutStore } from '@/stores'
const title = import.meta.env.VITE_APP_TITLE
const layoutStore = useLayoutStore()
</script>

<style scoped></style>
