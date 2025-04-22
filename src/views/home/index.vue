<template>
  <NCard class="h-full">
    <NSpace vertical :size="20">
      <div>欢迎访问，{{ authStore.user.username }}</div>
      <div>当前时间：{{ now }}</div>
    </NSpace>
  </NCard>
</template>

<script setup lang="ts">
import { useNow } from '@vueuse/core'
import { useAuthStore } from '@/stores'

const authStore = useAuthStore()

const now = useNow()
</script>

<style scoped></style>
