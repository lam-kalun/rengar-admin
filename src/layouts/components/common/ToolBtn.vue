<template>
  <div class="flex items-center gap-3 text-xl">
    <div
      v-if="themeStore.themeMode === 'light'"
      class="flex-center rounded-sm p-1 hover:bg-amber-100"
      @click="themeStore.toggleTheme"
    >
      <SvgIcon icon="line-md:sunny" class="cursor-pointer text-amber"></SvgIcon>
    </div>

    <div
      v-else-if="themeStore.themeMode === 'dark'"
      class="flex-center rounded-sm p-1 hover:bg-zinc-700"
      @click="themeStore.toggleTheme"
    >
      <SvgIcon icon="line-md:moon-filled" class="cursor-pointer"></SvgIcon>
    </div>

    <div
      v-else
      class="flex-center rounded-sm p-1 hover:bg-zinc-100 dark:hover:bg-zinc-700"
      @click="themeStore.toggleTheme"
    >
      <SvgIcon icon="material-symbols:hdr-auto" class="cursor-pointer"></SvgIcon>
    </div>

    <div class="flex-center rounded-sm p-1 hover:bg-amber-100 dark:hover:bg-zinc-700">
      <SvgIcon icon="unjs:theme-colors" class="cursor-pointer"></SvgIcon>
    </div>

    <div class="flex-center rounded-sm p-1 hover:bg-zinc-100 dark:hover:bg-zinc-700">
      <SvgIcon
        :icon="isFullscreen ? 'ooui:exit-fullscreen' : 'ooui:full-screen'"
        class="cursor-pointer"
        @click="toggle"
      ></SvgIcon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'
import { useThemeStore } from '@/stores'
const { isFullscreen, toggle } = useFullscreen()

const themeStore = useThemeStore()
</script>

<style scoped></style>
