<template>
  <div>
    <NGrid :cols="3" :x-gap="16" :y-gap="16">
      <NGridItem>
        <NCard title="菜单管理" size="small">
          <template #header-extra>
            <NButton type="primary" size="small">添加顶级菜单</NButton>
          </template>

          <NTree :data="menuTree" block-line label-field="name" key-field="id" :render-suffix="renderSuffix"></NTree>
        </NCard>
      </NGridItem>
    </NGrid>
  </div>
</template>

<script setup lang="tsx">
import { menuTreeApi } from '@/api/setting/menu'
import { to } from '@/utils/tools'
import { NSpace, NTag, type TreeOption } from 'naive-ui'

const menuTree = ref<Api.Setting.MenuTree[]>([])
async function getMenuTree() {
  const [err, data] = await to(menuTreeApi())
  if (err) return
  menuTree.value = data
}
getMenuTree()

function renderSuffix(info: { option: TreeOption; checked: boolean; selected: boolean }) {
  return (
    <NSpace>
      <NTag>{info.option.code}</NTag>
    </NSpace>
  )
}
</script>

<style scoped></style>
