<template>
  <NDrawer v-model:show="show" :width="400" :native-scrollbar="true" :auto-focus="false">
    <NDrawerContent title="主题配置" :native-scrollbar="false" closable>
      <div>
        <NDivider>布局模式</NDivider>

        <NGrid :cols="3" :x-gap="16">
          <NGridItem>
            <div
              class="flex flex-col cursor-pointer items-center gap-4 rounded p-2"
              :class="[layoutStore.layoutMode === 'aside' ? ' border border-primary' : '']"
              @click="handleChangeLayout('aside')"
            >
              <div class="h-[80px] w-full flex gap-2">
                <div class="w-5 rounded bg-primary"></div>
                <div class="flex flex-1 flex-col gap-2">
                  <div class="h-5 rounded bg-primary-300"></div>
                  <div class="flex-1 rounded bg-primary-300"></div>
                </div>
              </div>
              <div>经典布局</div>
            </div>
          </NGridItem>
          <NGridItem>
            <div
              class="flex flex-col cursor-pointer items-center gap-4 rounded p-2"
              :class="[layoutStore.layoutMode === 'top' ? ' border border-primary' : '']"
              @click="handleChangeLayout('top')"
            >
              <div class="h-[80px] w-full flex flex-col gap-2">
                <div class="h-5 rounded bg-primary"></div>
                <div class="flex-1 rounded bg-primary-300"></div>
              </div>
              <div>顶部菜单布局</div>
            </div>
          </NGridItem>

          <NGridItem>
            <div
              class="flex flex-col cursor-pointer items-center gap-4 rounded p-2"
              :class="[layoutStore.layoutMode === 'top-aside' ? ' border border-primary' : '']"
              @click="handleChangeLayout('top-aside')"
            >
              <div class="h-[80px] w-full flex gap-2">
                <div class="w-5 rounded bg-primary"></div>
                <div class="flex flex-1 flex-col gap-2">
                  <div class="h-5 rounded bg-primary"></div>
                  <div class="flex-1 rounded bg-primary-300"></div>
                </div>
              </div>
              <div>一级菜单顶部</div>
            </div>
          </NGridItem>
        </NGrid>
      </div>
      <div>
        <NDivider>布局模式</NDivider>

        <div>1111</div>
      </div>
    </NDrawerContent>
  </NDrawer>
</template>

<script setup lang="ts">
import { useLayoutStore } from '@/stores'
const show = defineModel<boolean>('show', {
  required: true,
})

const layoutStore = useLayoutStore()

function handleChangeLayout(layoutMode: App.Layout.LayoutMode) {
  layoutStore.layoutModeChangeAction(layoutMode)
}
</script>

<style scoped></style>
