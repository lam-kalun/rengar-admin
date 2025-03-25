<template>
  <div class="flex items-center gap-3 text-xl">
    <div
      v-if="themeStore.themoMode === 'light'"
      class="flex-center cursor-pointer rounded-sm p-1 hover:bg-zinc-100 dark:hover:bg-zinc-700"
      @click="themeStore.toggleTheme"
    >
      <SvgIcon icon="line-md:sunny"></SvgIcon>
    </div>

    <div
      v-else-if="themeStore.themoMode === 'dark'"
      class="flex-center cursor-pointer rounded-sm p-1 hover:bg-zinc-700"
      @click="themeStore.toggleTheme"
    >
      <SvgIcon icon="line-md:moon-filled"></SvgIcon>
    </div>

    <div
      v-else
      class="cursor-pointe flex-center rounded-sm p-1 hover:bg-zinc-100 dark:hover:bg-zinc-700"
      @click="themeStore.toggleTheme"
    >
      <SvgIcon icon="material-symbols:hdr-auto"></SvgIcon>
    </div>

    <div
      class="cursor-pointe flex-center rounded-sm p-1 hover:bg-zinc-100 dark:hover:bg-zinc-700"
      @click="layoutStore.toggleConfigDrawer"
    >
      <SvgIcon icon="line-md:cog-filled-loop"></SvgIcon>
    </div>

    <div class="flex-center cursor-pointer rounded-sm p-1 hover:bg-zinc-100 dark:hover:bg-zinc-700" @click="toggle">
      <SvgIcon :icon="isFullscreen ? 'ooui:exit-fullscreen' : 'ooui:full-screen'"></SvgIcon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'
import { useThemeStore, useLayoutStore } from '@/stores'
const { isFullscreen, toggle } = useFullscreen()

const themeStore = useThemeStore()
const layoutStore = useLayoutStore()
</script>

<style scoped></style>
