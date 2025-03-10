<template>
  <header class="h-full flex items-center gap-4 px-4">
    <AsideControl />
    <div class="flex-1">111</div>
    <ToolBtn />
    <UserCard />
  </header>
</template>

<script setup lang="ts">
import AsideControl from './AsideControl.vue'
import ToolBtn from './ToolBtn.vue'
import UserCard from './UserCard.vue'
</script>

<style scoped></style>
