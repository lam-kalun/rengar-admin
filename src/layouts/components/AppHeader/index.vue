<template>
  <header class="h-full flex items-center gap-4 px-4">
    <AsideControl />
    <div class="flex-1">
      <AppBreadcrumb />
    </div>
    <ToolBtn />
    <UserCard />
  </header>
</template>

<script setup lang="ts">
import AsideControl from '../common/AsideControl.vue'
import ToolBtn from '../common/ToolBtn.vue'
import UserCard from '../common/UserCard.vue'
import AppBreadcrumb from '../common/AppBreadcrumb.vue'
</script>

<style scoped></style>
