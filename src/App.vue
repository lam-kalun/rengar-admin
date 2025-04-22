<template>
  <component :is="layoutComponent"></component>
</template>

<script setup lang="ts">
import BasicLayout from '@/layouts/base/index.vue'
import BlankLayout from '@/layouts/blank/index.vue'

import { useUpdateChecker } from '@/hooks/update'

defineOptions({
  name: 'App',
})

const route = useRoute()
const layoutComponent = computed(() => {
  const layout = route.meta.layout
  if (!layout || layout === 'base') return BasicLayout
  return BlankLayout
})

useUpdateChecker()
</script>

<style scoped></style>
