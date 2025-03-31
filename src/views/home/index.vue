<template>
  <NCard class="h-full">
    <div class="i-mdi-ab-testing text-2xl text-red"></div>
    <!-- <div class="i-local-logo" style="font-size: 40px; color: #f40"></div> -->
    <SvgIcon icon="i-local-logo" class="text-2xl text-red"></SvgIcon>
    <div class="text-red">222</div>
    <NButton type="primary" @click="handleClick">跳转</NButton>
    <div class="text-2xl text-primary">22222222222222</div>
    <NButton type="primary" @click="count++">增加</NButton>
    {{ count }}

    <div>
      <div>{{ appStore.isPc }}</div>
      <div>{{ appStore.isPad }}</div>
      <div>{{ appStore.isMobile }}</div>
    </div>
  </NCard>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores'
const router = useRouter()
const count = ref(0)

const appStore = useAppStore()
function handleClick() {
  router.push('/setting/role')
}
</script>

<style scoped></style>
