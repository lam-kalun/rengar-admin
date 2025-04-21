<template>
  <NCard class="h-full">
    <NGrid :cols="3">
      <NGridItem>
        <Vue3Lottie
          animation-link="https://assets7.lottiefiles.com/packages/lf20_Yc2PU8DdfX.json"
          :height="300"
          :width="300"
        />
      </NGridItem>

      <NGridItem>
        <Vue3Lottie
          animation-link="https://assets10.lottiefiles.com/packages/lf20_swnrn2oy.json"
          :height="300"
          :width="300"
        />
      </NGridItem>

      <NGridItem>
        <Vue3Lottie
          animation-link="https://assets4.lottiefiles.com/datafiles/i0DrGl1AyhF4rvhqpBUbia6zUEekgKoxRociBzZy/stopwatch.json"
          :height="300"
          :width="300"
        />
      </NGridItem>
    </NGrid>
  </NCard>
</template>

<script setup lang="ts">
import { Vue3Lottie } from 'vue3-lottie'
</script>

<style scoped></style>
