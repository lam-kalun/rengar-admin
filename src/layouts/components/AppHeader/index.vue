<template>
  <header class="h-full flex items-center gap-4 px-4">
    <AsideControl />
    <AppBreadcrumb />
    <div class="flex-1"></div>
    <ToolBtn />
    <UserCard />
  </header>
</template>

<script setup lang="ts">
import AsideControl from './AsideControl.vue'
import ToolBtn from './ToolBtn.vue'
import UserCard from './UserCard.vue'
import AppBreadcrumb from '../common/AppBreadcrumb.vue'
</script>

<style scoped></style>
