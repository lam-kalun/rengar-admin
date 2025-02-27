<template>
  <Icon v-if="icon" :icon="icon" v-bind="$attrs"></Icon>
  <svg v-if="local" v-bind="$attrs">
    <use :xlink:href="`#${local}`"></use>
  </svg>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{
  // Iconify图标名称
  icon?: string
  // 本地SVG图标ID
  local?: string
}>()
</script>

<style scoped></style>
