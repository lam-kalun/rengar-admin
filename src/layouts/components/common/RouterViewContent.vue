<template>
  <RouterView v-slot="{ Component }">
    <Transition name="fade-slide" mode="out-in" appear>
      <KeepAlive :include="['home']">
        <component :is="Component" />
      </KeepAlive>
    </Transition>
  </RouterView>
</template>

<script setup lang="ts"></script>

<style scoped>
/* fade-slide */
.fade-slide-leave-active,
.fade-slide-enter-active {
  transition: all 0.3s;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
