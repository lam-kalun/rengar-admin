<template>
  <NCard>
    <div class="w-full flex items-center justify-center gap-x-4 text-4xl p-2 mt-4">
      <div class="i-vscode-icons:file-type-light-pnpm" />
      <div class="i-local-logo"></div>
      <Icon icon="i-mdi-light:home" />
    </div>
    <div v-for="item in 100" :key="item">{{ item }}</div>
  </NCard>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<style scoped></style>
