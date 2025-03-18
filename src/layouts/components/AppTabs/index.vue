<template>
  <nav class="h-full flex px-4 pb-0 pt-2 text-sm">
    <div
      v-for="item in tabStore.tabsList"
      :key="item.fullPath"
      class="tab-item flex items-center gap-2"
      :class="[
        item.fullPath === tabStore.activeFullPath
          ? 'text-primary dark:text-white bg-primary-100 dark:bg-primary-700'
          : '',
      ]"
      @click="handleJump(item.fullPath)"
    >
      <SvgIcon v-if="item.icon || item.localIcon" :icon="item.icon" :local-icon="item.localIcon" />
      <SvgIcon v-else icon="ic:baseline-menu" />
      <div class="w-[60px] overflow-hidden whitespace-nowrap">{{ item.title }}</div>
      <div
        v-if="!item.fixedInTab"
        class="i-material-symbols:close-rounded hover:i-material-symbols:cancel-rounded cursor-pointer text-lg"
        @click.stop="tabStore.removeTabsAction(item)"
      ></div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useTabStore } from '@/stores'
const tabStore = useTabStore()

const router = useRouter()
function handleJump(fullPath: string) {
  router.push(fullPath)
}
</script>

<style scoped>
.tab-item {
  padding: 8px 24px;
  margin: 0 -10px;
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
