<template>
  <div class="flex items-center gap-3 text-xl">
    <NTooltip placement="bottom">
      <template #trigger>
        <div
          v-if="appStore.themoMode === 'light'"
          class="flex-center cursor-pointer rounded-sm p-1 hover:bg-zinc-100 dark:hover:bg-zinc-700"
          @click="appStore.toggleTheme"
        >
          <SvgIcon icon="line-md:sunny"></SvgIcon>
        </div>

        <div
          v-else-if="appStore.themoMode === 'dark'"
          class="flex-center cursor-pointer rounded-sm p-1 hover:bg-zinc-700"
          @click="appStore.toggleTheme"
        >
          <SvgIcon icon="line-md:moon-filled"></SvgIcon>
        </div>

        <div
          v-else
          class="cursor-pointe flex-center rounded-sm p-1 hover:bg-zinc-100 dark:hover:bg-zinc-700"
          @click="appStore.toggleTheme"
        >
          <SvgIcon icon="material-symbols:hdr-auto"></SvgIcon>
        </div>
      </template>
      <span>主题</span>
    </NTooltip>

    <NTooltip placement="bottom">
      <template #trigger>
        <div
          class="cursor-pointe flex-center rounded-sm p-1 hover:bg-zinc-100 dark:hover:bg-zinc-700"
          @click="appStore.toggleConfigDrawer"
        >
          <SvgIcon icon="clarity:settings-line"></SvgIcon>
        </div>
      </template>
      <span>系统配置</span>
    </NTooltip>

    <NTooltip placement="bottom">
      <template #trigger>
        <div class="flex-center cursor-pointer rounded-sm p-1 hover:bg-zinc-100 dark:hover:bg-zinc-700" @click="toggle">
          <SvgIcon :icon="isFullscreen ? 'ooui:exit-fullscreen' : 'ooui:full-screen'"></SvgIcon>
        </div>
      </template>
      <span>{{ isFullscreen ? '退出全屏' : '全屏' }}</span>
    </NTooltip>
  </div>
</template>

<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'
import { useAppStore } from '@/stores'
const { isFullscreen, toggle } = useFullscreen()

const appStore = useAppStore()
</script>

<style scoped></style>
