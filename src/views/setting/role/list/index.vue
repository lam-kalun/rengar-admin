<template>
  <NCard>
    <div class="i-mdi-ab-testing text-2xl text-red"></div>
    <!-- <div class="i-local-logo" style="font-size: 40px; color: #f40"></div> -->
    <SvgIcon icon="i-local-logo" class="text-2xl text-red"></SvgIcon>
    <div class="text-red">222</div>
    <NButton type="primary" @click="handleClick">跳转</NButton>
    <div class="text-2xl text-primary">22222222222222</div>
    <NButton type="primary" @click="count++">增加</NButton>
    {{ count }}
  </NCard>
</template>

<script setup lang="ts">
const router = useRouter()
const count = ref(0)
function handleClick() {
  router.back()
}
</script>

<style scoped></style>
