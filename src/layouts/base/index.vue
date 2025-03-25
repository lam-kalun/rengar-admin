<template>
  <NLayout embedded has-sider style="height: 100vh">
    <NLayoutSider
      v-if="showAppAside"
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
        :ref="(el) => el && layoutStore.setLayoutContentRef(el as HTMLElement)"
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
    <AppMenuDrawer v-model:show="showMenuDrawer" />
  </NLayout>
</template>

<script setup lang="ts">
import { useLayoutStore } from '@/stores'
import { numberToPx } from '@rengar/utils'
import AppFooter from '../components/AppFooter/index.vue'
import AppTabs from '../components/AppTabs/index.vue'
import AppHeader from '../components/AppHeader/index.vue'
import AppMain from '../components/AppMain/index.vue'
import AppAside from '../components/AppAside/index.vue'
import AppLayoutDrawer from '../components/common/AppLayoutDrawer.vue'
import AppMenuDrawer from '../components/common/AppMenuDrawer.vue'

const layoutStore = useLayoutStore()
const { config: layoutConfig, showConfigDrawer, showAppAside, showMenuDrawer } = storeToRefs(layoutStore)
</script>

<style scoped></style>
