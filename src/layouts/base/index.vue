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
        v-if="layoutConfig.showTabs"
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
        :style="layoutContentStyle"
        :ref="(el) => el && appStore.setLayoutContentRef(el as HTMLElement)"
      >
        <AppMain v-if="showRouterView" />
      </NLayoutContent>
      <NLayoutFooter
        v-if="layoutConfig.showFooter"
        bordered
        position="absolute"
        :style="{
          height: numberToPx(layoutConfig.footerHeight),
        }"
      >
        <AppFooter />
      </NLayoutFooter>
    </NLayout>

    <AppConfigDrawer v-model:show="showConfigDrawer" />
    <AppMenuDrawer v-model:show="showMenuDrawer" />
  </NLayout>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores'
import { numberToPx } from '@/utils/tools'
import AppFooter from '../components/AppFooter/index.vue'
import AppTabs from '../components/AppTabs/index.vue'
import AppHeader from '../components/AppHeader/index.vue'
import AppMain from '../components/AppMain/index.vue'
import AppAside from '../components/AppAside/index.vue'
import AppConfigDrawer from '../components/common/AppConfigDrawer.vue'
import AppMenuDrawer from '../components/common/AppMenuDrawer.vue'

const appStore = useAppStore()
const { config: layoutConfig, showConfigDrawer, showAppAside, showMenuDrawer, showRouterView } = storeToRefs(appStore)

const layoutContentStyle = computed(() => {
  const style = {
    top: `calc(${numberToPx(layoutConfig.value.headerHeight)} + ${layoutConfig.value.showTabs ? numberToPx(layoutConfig.value.tabHeight) : '0px'})`,
    bottom: layoutConfig.value.showFooter ? numberToPx(layoutConfig.value.footerHeight) : '0px',
    padding: numberToPx(layoutConfig.value.gap),
  }
  return style
})
</script>

<style scoped></style>
