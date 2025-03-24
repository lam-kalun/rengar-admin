<template>
  <NMenu
    v-model:value="value"
    :mode
    :options="menus"
    :collapsed="layoutStore.config.asideCollapse"
    :collapsed-width="64"
    :children-field="childrenField"
    responsive
  ></NMenu>
</template>

<script setup lang="tsx">
import { useLayoutStore } from '@/stores'
import { NEllipsis, type MenuOption } from 'naive-ui'
import { RouterLink, type RouteRecordRaw } from 'vue-router'
import SvgIcon from '@/components/SvgIcon/index.vue'
const layoutStore = useLayoutStore()

const childrenField = computed(() => {
  return layoutStore.layoutMode === 'top-aside' ? 'list' : 'children'
})

const { mode = 'vertical', data } = defineProps<{
  mode?: 'horizontal' | 'vertical'
  data: RouteRecordRaw[]
}>()

const menus = computed(() => {
  return generateMenus(data)
})

function renderLable(route: RouteRecordRaw) {
  return !route.children ? (
    <RouterLink to={{ name: route.name }}>
      <NEllipsis>{route.meta?.title}</NEllipsis>
    </RouterLink>
  ) : (
    <NEllipsis>{route.meta?.title}</NEllipsis>
  )
}

function generateMenus(routes: RouteRecordRaw[]): MenuOption[] {
  return routes.map((route) => {
    const menuOption: MenuOption = {
      label: () => renderLable(route),
      key: route.meta?.activeMenu || route.name,
      icon: () => {
        if (route.meta?.icon) {
          return <SvgIcon icon={route.meta?.icon}></SvgIcon>
        } else if (route.meta?.localIcon) {
          return <SvgIcon localIcon={route.meta?.localIcon}></SvgIcon>
        } else {
          return <SvgIcon icon="ic:baseline-menu"></SvgIcon>
        }
      },
    }

    if (route.children && route.children.length > 0) {
      menuOption.children = generateMenus(route.children)
    }

    return menuOption
  })
}

const value = ref('')
const router = useRouter()

watchSyncEffect(() => {
  value.value = router.currentRoute.value.meta.activeMenu || router.currentRoute.value.name
})
</script>

<style scoped></style>
