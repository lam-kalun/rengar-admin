<template>
  <div class="h-full flex items-center gap-3">
    <div class="min-w-0 flex-1">
      <NScrollbar x-scrollable>
        <nav class="h-full flex px-4 pb-0 pt-2 text-sm">
          <div
            v-for="item in tabsList"
            :key="item.fullPath"
            :ref="(el) => setItemRef(el as HTMLElement, item.fullPath)"
            class="tab-item flex items-center gap-2"
            :class="[
              item.fullPath === activeFullPath
                ? 'text-primary dark:text-white bg-primary-100 dark:bg-primary-700'
                : 'hover:bg-zinc-100 dark:hover:bg-zinc-700',
            ]"
            @click="handleJump(item.fullPath)"
          >
            <SvgIcon v-if="item.icon || item.localIcon" :icon="item.icon" :local-icon="item.localIcon" />
            <SvgIcon v-else icon="ic:baseline-menu" />
            <div class="w-max-[60px] overflow-hidden whitespace-nowrap">{{ item.title }}</div>
            <div
              v-if="!item.fixedInTab"
              class="i-material-symbols:close-rounded hover:i-material-symbols:cancel-rounded cursor-pointer text-lg"
              @click.stop="tabStore.removeTabsAction(item)"
            ></div>
          </div>
        </nav>
      </NScrollbar>
    </div>

    <div class="flex items-center gap-4 px-4 text-lg">
      <NTooltip placement="bottom">
        <template #trigger>
          <div class="flex-center cursor-pointer rounded-sm p-1 hover:bg-zinc-100 dark:hover:bg-zinc-700">
            <SvgIcon icon="ooui:reload"></SvgIcon>
          </div>
        </template>
        <span>刷新</span>
      </NTooltip>

      <NTooltip placement="bottom">
        <template #trigger>
          <div
            class="flex-center cursor-pointer rounded-sm p-1 hover:bg-zinc-100 dark:hover:bg-zinc-700"
            @click="toggle"
          >
            <SvgIcon :icon="isFullscreen ? 'ooui:exit-fullscreen' : 'ooui:full-screen'"></SvgIcon>
          </div>
        </template>
        <span>内容全屏</span>
      </NTooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTabStore, useLayoutStore } from '@/stores'
import { useWindowSize, useDebounceFn, useFullscreen } from '@vueuse/core'

const tabStore = useTabStore()

const { tabsList, activeFullPath } = storeToRefs(tabStore)

const router = useRouter()

const tabRefs = ref<Record<string | number, HTMLElement>>({})

function setItemRef(el: HTMLElement | null, path: string) {
  if (el) {
    tabRefs.value[path] = el
  }
}

function scrollIntoView() {
  nextTick(() => {
    const element = tabRefs.value[activeFullPath.value]
    if (!element) return
    element.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
    })
  })
}

const debouncedScrollIntoView = useDebounceFn(scrollIntoView, 400)

watch(activeFullPath, () => debouncedScrollIntoView(), {
  immediate: true,
})

const { width } = useWindowSize()

function handleJump(fullPath: string) {
  router.push(fullPath)
}
watch(width, () => scrollIntoView())

const layoutStore = useLayoutStore()
const { layoutContentRef } = storeToRefs(layoutStore)
const { isFullscreen, toggle } = useFullscreen(layoutContentRef)
</script>

<style scoped>
.tab-item {
  padding: 8px 24px;
  margin: 0 -12px;
  cursor: pointer;
  -webkit-mask-image:
    url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M100 100C44.772 100 0 55.228 0 0v100h100z' fill='%23F8EAE7'/%3E%3C/svg%3E"),
    url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 100c55.228 0 100-44.772 100-100v100H0z' fill='%23F8EAE7'/%3E%3C/svg%3E"),
    url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><rect rx='12' width='100%' height='100%' fill='%23F8EAE7'/></svg>");
  -webkit-mask-size:
    12px 12px,
    12px 12px,
    calc(100% - 24px) calc(100% + 12px);
  -webkit-mask-position:
    right bottom,
    left bottom,
    center top;
  -webkit-mask-repeat: no-repeat;
}
.tab-item.active {
  background: var(--color-primary-100);
}
</style>
