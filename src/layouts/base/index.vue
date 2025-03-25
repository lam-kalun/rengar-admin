<template>
  <NLayout embedded has-sider style="height: 100vh">
    <NLayoutSider
      v-if="showAside"
      bordered
      :style="{
        width: numberToPx(layoutConfig.asideWidth),
      }"
      :collapsed="layoutConfig.asideCollapse"
      :collapsed-width="layoutConfig.asideCollapseWidth"
    >
      <AppAside />
    </NLayoutSider>
    <NLayout>
      <NLayoutHeader
        bordered
        :style="{
          height: numberToPx(layoutConfig.headerHeight),
        }"
      >
        <AppHeader />
      </NLayoutHeader>
      <NLayoutHeader
        bordered
        :style="{
          height: numberToPx(layoutConfig.tabHeight),
        }"
      >
        <AppTabs />
      </NLayoutHeader>
      <NLayoutContent
        embedded
        :native-scrollbar="false"
        :content-style="{
          height: '100%',
        }"
        position="absolute"
        :style="{
          top: `calc(${numberToPx(layoutConfig.headerHeight)} + ${numberToPx(layoutConfig.tabHeight)})`,
          bottom: numberToPx(layoutConfig.footerHeight),
          padding: numberToPx(layoutConfig.gap),
        }"
      >
        <AppMain />
      </NLayoutContent>
      <NLayoutFooter
        bordered
        position="absolute"
        :style="{
          height: numberToPx(layoutConfig.footerHeight),
        }"
      >
        <AppFooter />
      </NLayoutFooter>
    </NLayout>

    <AppLayoutDrawer v-model:show="showConfigDrawer" />
  </NLayout>
</template>

<script setup lang="ts">
import { useLayoutStore, useMenuStore } from '@/stores'
import { numberToPx } from '@rengar/utils'
import AppFooter from '../components/AppFooter/index.vue'
import AppTabs from '../components/AppTabs/index.vue'
import AppHeader from '../components/AppHeader/index.vue'
import AppMain from '../components/AppMain/index.vue'
import AppAside from '../components/AppAside/index.vue'
import AppLayoutDrawer from '../components/common/AppLayoutDrawer.vue'
const layoutStore = useLayoutStore()
const { config: layoutConfig, showConfigDrawer, showAsideMode, showTopAsideMode, isMobile } = storeToRefs(layoutStore)

const menuStore = useMenuStore()
const showAside = computed(() => {
  if (isMobile.value) return false
  if (showAsideMode.value) return true
  if (showTopAsideMode.value && menuStore.subMenuRoutes.length > 0) return true
  return false
})
</script>

<style scoped></style>
