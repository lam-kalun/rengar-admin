<template>
  <NTabs type="card">
    <NTab v-for="item in routerStore.tabsList" :key="item.fullPath" :name="item.fullPath" closable>
      {{ item.title }}
    </NTab>
  </NTabs>
</template>

<script setup lang="ts">
import { useRouterStore } from '@/stores'
const routerStore = useRouterStore()
</script>

<style scoped></style>
