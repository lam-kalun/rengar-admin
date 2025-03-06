<template>
  <Icon v-if="icon" :icon="formatIcon" :="$attrs"></Icon>
  <div v-if="localIcon" :class="localIcon" :="$attrs"></div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
const { icon } = defineProps<{
  icon?: string
  localIcon?: string
}>()

const formatIcon = computed(() => {
  if (!icon) return ''
  if (icon.startsWith('i-')) {
    return icon.slice(2)
  }
  return icon
})
</script>

<style scoped></style>
