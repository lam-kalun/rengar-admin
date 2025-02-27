<template>
  <NLayout has-sider embedded style="height: 100vh">
    <NLayoutSider
      bordered
      :style="{
        width: numberToPx(config.asideWidth)
      }"
    >
      <NLayout position="absolute">
        <NLayoutHeader
          :style="{
            height: numberToPx(config.headerHeight)
          }"
          >233</NLayoutHeader
        >
        <NLayoutContent
          :native-scrollbar="false"
          position="absolute"
          :style="{
            top: numberToPx(config.headerHeight),
            bottom: 0
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
          height: numberToPx(config.headerHeight)
        }"
        >颐和园路</NLayoutHeader
      >
      <NLayoutContent
        embedded
        :native-scrollbar="false"
        :content-style="{
          padding: numberToPx(config.gap)
        }"
        position="absolute"
        :style="{
          top: numberToPx(config.headerHeight),
          bottom: numberToPx(config.footerHeight)
        }"
      >
        <RouterView />
      </NLayoutContent>
      <NLayoutFooter
        bordered
        position="absolute"
        :style="{
          height: numberToPx(config.footerHeight)
        }"
      >
        <AppFooter />
      </NLayoutFooter>
    </NLayout>
  </NLayout>
</template>

<script setup lang="ts">
import { useLayoutStore } from '@/stores'
import { numberToPx } from '@/utils'
import AppFooter from '../components/AppFooter/index.vue'
const layoutStore = useLayoutStore()
const { config } = storeToRefs(layoutStore)
</script>

<style scoped></style>
