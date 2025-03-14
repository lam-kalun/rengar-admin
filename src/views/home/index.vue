<template>
  <NCard>
    <div class="i-mdi-ab-testing text-2xl text-red"></div>
    <!-- <div class="i-local-logo" style="font-size: 40px; color: #f40"></div> -->
    <SvgIcon icon="i-local-logo" class="text-2xl text-red"></SvgIcon>
    <div class="text-red">222</div>
    <NButton type="primary" @click="handleClick">233</NButton>
    <div class="text-2xl text-primary">22222222222222</div>
  </NCard>
</template>

<script setup lang="ts">
const router = useRouter()
function handleClick() {
  router.push('/setting/role')
}
</script>

<style scoped></style>
