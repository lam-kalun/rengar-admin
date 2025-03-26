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

      <ColorSelect v-model:value="primaryColorValue" name="主题色设置" @change="handlePrimaryColorChange" />

      <div>
        <NDivider>网站配置</NDivider>
        <NSpace vertical :size="20">
          <div class="flex items-center justify-between">
            <div>头部高度</div>
            <NInputNumber v-model:value="layoutStore.config.headerHeight" :precision="0" />
          </div>
          <div class="flex items-center justify-between">
            <div>标签栏高度</div>
            <NInputNumber v-model:value="layoutStore.config.tabHeight" :precision="0" />
          </div>
          <div class="flex items-center justify-between">
            <div>侧边栏宽度</div>
            <NInputNumber v-model:value="layoutStore.config.asideWidth" :precision="0" />
          </div>

          <div class="flex items-center justify-between">
            <div>底部高度</div>
            <NInputNumber v-model:value="layoutStore.config.footerHeight" :precision="0" />
          </div>

          <div class="flex items-center justify-between">
            <div>显示面包屑</div>
            <NSwitch v-model:value="layoutStore.config.showBreadcrumb" />
          </div>

          <div class="flex items-center justify-between">
            <div>显示标签栏</div>
            <NSwitch v-model:value="layoutStore.config.showTabs" />
          </div>

          <div class="flex items-center justify-between">
            <div>显示底部</div>
            <NSwitch v-model:value="layoutStore.config.showFooter" />
          </div>
        </NSpace>
      </div>
    </NDrawerContent>
  </NDrawer>
</template>

<script setup lang="ts">
import { useLayoutStore, useThemeStore } from '@/stores'
import ColorSelect from './ColorSelect.vue'
const show = defineModel<boolean>('show', {
  required: true,
})

const layoutStore = useLayoutStore()

function handleChangeLayout(layoutMode: App.Layout.LayoutMode) {
  layoutStore.layoutModeChangeAction(layoutMode)
}

const themeStore = useThemeStore()

const primaryColorValue = ref(themeStore.themeOverrides.common!.primaryColor as string)
function handlePrimaryColorChange(colors: ThemeColorItem) {
  themeStore.themeOverrides.common = {
    primaryColor: colors.DEFAULT,
    primaryColorHover: colors['400'],
    primaryColorPressed: colors['700'],
    primaryColorSuppl: colors['400'],
  }

  const root = document.documentElement
  for (const colorKey in colors) {
    root.style.setProperty(
      `--color-primary${colorKey === 'DEFAULT' ? '' : `-${colorKey}`}`,
      colors[colorKey as ThemeColorValue],
    )
  }
}
</script>

<style scoped></style>
