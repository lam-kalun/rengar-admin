<template>
  <div class="h-full text-2xl text-primary flex items-center">
    <SvgIcon icon="i-local-logo"></SvgIcon>
    <div class="flex-1 text-center">{{ title }}</div>
  </div>
</template>

<script setup lang="ts">
const title = import.meta.env.VITE_APP_TITLE
</script>

<style scoped></style>
