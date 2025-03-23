<template>
  <NModal
    v-model:show="show"
    preset="dialog"
    :title="parent ? '添加按钮' : '编辑按钮'"
    positive-text="确定"
    negative-text="取消"
    :loading
    @positive-click="handleSubmit"
  >
    <NForm ref="formRef" :model="formData" :rules class="my-8" size="small" label-placement="left" label-width="auto">
      <NFormItem v-if="parent" label="上级菜单">
        <NInput :value="parent?.name" disabled />
      </NFormItem>

      <NFormItem label="按钮名称" path="name">
        <NInput v-model:value="formData.name" placeholder="按钮名称" />
      </NFormItem>

      <NFormItem label="排序" path="sort">
        <NInputNumber v-model:value="formData.sort" :min="1" :precision="0" placeholder="排序" />
      </NFormItem>

      <NFormItem label="状态" path="status">
        <NRadioGroup v-model:value="formData.status">
          <NRadio :value="1">启用</NRadio>
          <NRadio :value="0">禁用</NRadio>
        </NRadioGroup>
      </NFormItem>
    </NForm>
  </NModal>
</template>

<script setup lang="tsx">
import { buttonAddApi, buttonEditApi } from '@/api/setting/menu'
import { type FormRules, type FormInst } from 'naive-ui'
import { to } from '@/utils/tools'

const show = defineModel<boolean>('show', {
  required: true,
})

const { parent } = defineProps<{
  parent?: Api.Setting.Button
}>()

const emit = defineEmits<{
  success: []
}>()

const formData = ref<Api.Setting.Button | Recordable>({})

const formRef = useTemplateRef<FormInst>('formRef')
const rules: FormRules = {
  name: [{ required: true, message: '请输入菜单名称', trigger: ['blur', 'input'] }],
  sort: [{ required: true, message: '请输入排序', type: 'number', trigger: ['blur', 'input'] }],
  status: [{ required: true, message: '请选择状态', type: 'number', trigger: ['blur', 'change'] }],
}

const loading = ref(false)
async function handleSubmit() {
  const [validErr] = await to(formRef.value!.validate())
  if (validErr) return false
  loading.value = true
  const [err] = await to(
    parent
      ? buttonAddApi({
          ...unref(formData as unknown as Api.Setting.Button),
          parentId: parent!.id,
        })
      : buttonEditApi(formData.value as Api.Setting.Button),
  )
  loading.value = false
  if (err) return
  window.$message?.success(`${parent ? '新增' : '编辑'}成功`)
  emit('success')
  return true
}
</script>

<style scoped></style>
