<template>
  <RouterView v-slot="{ Component }">
    <KeepAlive :include="['home']">
      <component :is="Component" />
    </KeepAlive>
  </RouterView>
</template>

<script setup lang="ts"></script>

<style scoped></style>
