<template>
  <AppProvider>
    <component :is="layoutComponent"></component>
  </AppProvider>
</template>

<script setup lang="ts">
import BasicLayout from '@/layouts/base/index.vue'
import BlankLayout from '@/layouts/blank/index.vue'

defineOptions({
  name: 'App',
})

const route = useRoute()
const layoutComponent = computed(() => {
  const layout = route.meta.layout
  if (!layout || layout === 'base') return BasicLayout
  return BlankLayout
})
</script>

<style scoped></style>
