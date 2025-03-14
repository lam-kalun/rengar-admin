<template>
  <RouterView v-slot="{ Component }">
    <KeepAlive :include="['home-index', 'setting-role-list']">
      <component :is="Component" />
    </KeepAlive>
  </RouterView>
</template>

<script setup lang="ts"></script>

<style scoped></style>
