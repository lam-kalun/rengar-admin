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
import { useLayoutStore, useMenuStore } from '@/stores'
import { NEllipsis, type MenuOption } from 'naive-ui'
import { RouterLink, type RouteRecordRaw } from 'vue-router'
import SvgIcon from '@/components/SvgIcon/index.vue'
const layoutStore = useLayoutStore()

const { showTopAsideMode } = storeToRefs(layoutStore)

const childrenField = computed(() => {
  return showTopAsideMode.value ? 'list' : 'children'
})

const {
  mode = 'vertical',
  data,
  isTopMenu,
} = defineProps<{
  mode?: 'horizontal' | 'vertical'
  data: RouteRecordRaw[]
  isTopMenu?: boolean
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

watch(
  () => router.currentRoute.value,
  (val) => {
    if (!showTopAsideMode.value || !isTopMenu) {
      value.value = val.meta.activeMenu || val.name
    }
  },
  {
    immediate: true,
  },
)

const menuStore = useMenuStore()
watch(
  value,
  (val) => {
    if (!isTopMenu || !showTopAsideMode) return
    if (!data.some((item) => item.name === val)) return
    menuStore.topActiveNameChangeAction(val as RouteRecordName)
  },
  {
    immediate: true,
  },
)
</script>

<style scoped></style>
