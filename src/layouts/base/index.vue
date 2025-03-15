<template>
  <NLayout embedded has-sider style="height: 100vh">
    <NLayoutSider
      bordered
      :style="{
        width: numberToPx(layoutConfig.asideWidth),
      }"
    >
      <NLayout position="absolute">
        <NLayoutHeader
          :style="{
            height: numberToPx(layoutConfig.headerHeight),
          }"
        >
          <AppLogo />
        </NLayoutHeader>
        <NLayoutContent
          :native-scrollbar="false"
          position="absolute"
          :style="{
            top: numberToPx(layoutConfig.headerHeight),
            bottom: 0,
          }"
        >
          <div v-for="item in 100" :key="item">{{ item }}</div>
        </NLayoutContent>
      </NLayout>
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
  </NLayout>
</template>

<script setup lang="ts">
import { useLayoutStore } from '@/stores'
import { numberToPx } from '@/utils/tools'
import AppFooter from '../components/AppFooter/index.vue'
import AppLogo from '../components/AppLogo/index.vue'
import AppTabs from '../components/AppTabs/index.vue'
import AppHeader from '../components/AppHeader/index.vue'
import AppMain from '../components/AppMain/index.vue'
const layoutStore = useLayoutStore()
const { config: layoutConfig } = storeToRefs(layoutStore)
</script>

<style scoped></style>
