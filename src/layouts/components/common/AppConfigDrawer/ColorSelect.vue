<template>
  <NSpace vertical :size="20">
    <NDivider>{{ name }}</NDivider>
    <div class="flex items-center justify-between">
      <div>当前颜色</div>
      <div class="size-6 bg-primary"></div>
    </div>
    <div>Tailwind快捷颜色</div>
    <div class="grid grid-cols-10 gap-y-2">
      <NTooltip v-for="(color, key) in tailwindColors" :key>
        <template #trigger>
          <div
            class="size-6 cursor-pointer"
            :style="{
              backgroundColor: color.DEFAULT,
            }"
            @click="handleChangePrimary(key)"
          ></div>
        </template>

        {{ key }}
      </NTooltip>
    </div>

    <NFormItem ref="formItemRef" label="手动输入颜色" label-placement="left" :rule>
      <div class="w-full flex items-center gap-4">
        <NInput v-model:value="colorValue" class="flex-1" size="small"></NInput>
        <NButton size="small" type="primary" @click="handleApply">应用</NButton>
      </div>
    </NFormItem>
  </NSpace>
</template>

<script setup lang="ts">
import { tailwindColors } from '@rengar/theme'
import to from 'await-to-js'
import { getColors } from 'theme-colors'
import type { FormItemInst, FormItemRule } from 'naive-ui'

const emit = defineEmits<{
  change: [colors: ThemeColorItem]
}>()

defineProps<{
  name: string
}>()

const colorValue = defineModel<string>('value', {
  required: true,
})

const rule: FormItemRule = {
  trigger: ['input', 'blur'],
  validator() {
    if (!colorValue.value) {
      return new Error('请输入颜色')
    }

    if (!/^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(colorValue.value)) {
      return new Error('请输入正确的颜色值')
    }

    return true
  },
}

const formItemRef = useTemplateRef<FormItemInst>('formItemRef')
function handleChangePrimary(key: TailwindColorKey) {
  const colors = tailwindColors[key]
  emit('change', colors)
}

async function handleApply() {
  const [err] = await to(formItemRef.value!.validate())
  if (err) return
  const colors = getColors(colorValue.value) as ThemeColorItem
  colors.DEFAULT = colors[500]
  emit('change', colors)
}
</script>

<style scoped></style>
