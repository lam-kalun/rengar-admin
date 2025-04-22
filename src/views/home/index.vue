<template>
  <NCard class="h-full">
    <NSpace vertical :size="20">
      <NText class="text-lg">欢迎登录，这是rengar-admin的首页，我也不知道要放点啥</NText>
      <NText>闲着无聊看看时间吧：{{ now }}</NText>

      <NText
        >宇宙就是一座黑暗森林，每个文明都是带枪的猎人，像幽灵般潜行于林间......他必须小心，因为林中到处都有与他一样潜行的猎人。如果他发现了别的生命——不管是不是猎人，不管是天使还是魔鬼，不管是娇嫩的婴儿还是步履蹒跚的老人，也不管是天仙般的少女还是天神般的男孩——能做的只有一件事：开枪消灭之</NText
      >

      <div class="text-right">
        <NText class="text-right">——刘慈欣《三体》</NText>
      </div>

      <NText class="text-right"
        >整点动画看看把，比CSS动画有趣多了，你项目中不需要的话自行删除，然后记得卸载vue3-lottie</NText
      >

      <NGrid cols="1 768:2 1024:3">
        <NGridItem>
          <Vue3Lottie
            animation-link="https://assets10.lottiefiles.com/packages/lf20_K0864uP6eC.json"
            :height="300"
            :width="300"
            direction="alternate"
          />
        </NGridItem>
        <NGridItem>
          <Vue3Lottie
            animation-link="https://assets10.lottiefiles.com/packages/lf20_swnrn2oy.json"
            :height="300"
            :width="300"
            direction="alternate"
          />
        </NGridItem>
        <NGridItem>
          <Vue3Lottie
            animation-link="https://assets4.lottiefiles.com/datafiles/i0DrGl1AyhF4rvhqpBUbia6zUEekgKoxRociBzZy/stopwatch.json"
            :height="300"
            :width="300"
            direction="alternate"
          />
        </NGridItem>
      </NGrid>
    </NSpace>
  </NCard>
</template>

<script setup lang="ts">
import { Vue3Lottie } from 'vue3-lottie'

import { useNow } from '@vueuse/core'

const now = useNow()
</script>

<style scoped></style>
