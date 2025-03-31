<template>
  <NMenu
    v-model:value="value"
    :mode
    :options="menus"
    :collapsed
    :collapsed-width="64"
    :children-field="childrenField"
    responsive
    :indent="20"
    @update:value="handleValueChange"
  ></NMenu>
</template>

<script setup lang="tsx">
import { useAppStore, useMenuStore } from '@/stores'
import { NEllipsis, type MenuOption } from 'naive-ui'
import { RouterLink, type RouteRecordRaw } from 'vue-router'
import SvgIcon from '@/components/SvgIcon/index.vue'
const appStore = useAppStore()
const menuStore = useMenuStore()

const { showTopAsideMode } = storeToRefs(appStore)

const childrenField = computed(() => {
  return showTopAsideMode.value ? 'list' : 'children'
})

const emit = defineEmits<{
  change: []
}>()

const {
  mode = 'vertical',
  data,
  isTopMenu,
  collapsed,
} = defineProps<{
  mode?: 'horizontal' | 'vertical'
  data: RouteRecordRaw[]
  isTopMenu?: boolean
  collapsed?: boolean
}>()

const menus = computed(() => {
  return generateMenus(data)
})

function renderLabel(route: RouteRecordRaw) {
  if (route.meta?.href) {
    return (
      <NEllipsis>
        {' '}
        <a href={route.meta.href} target="_blank">
          {route.meta?.title}
        </a>
      </NEllipsis>
    )
  }
  return !route.children ? (
    <NEllipsis>
      <RouterLink to={{ name: route.name }}>{route.meta?.title}</RouterLink>
    </NEllipsis>
  ) : (
    <NEllipsis>{route.meta?.title}</NEllipsis>
  )
}

function generateMenus(routes: RouteRecordRaw[]): MenuOption[] {
  return routes.map((route) => {
    const menuOption: MenuOption = {
      label: () => renderLabel(route),
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

const value = ref<RouteRecordName>()
const router = useRouter()
const route = useRoute()

watch(
  () => router.currentRoute.value,
  (val) => {
    if (!showTopAsideMode.value || !isTopMenu) {
      value.value = val.meta.activeMenu || val.name
      return
    }
    const name = route.matched[0]?.name as RouteRecordName
    if (name === menuStore.topActiveName) return
    value.value = name
  },
  {
    immediate: true,
  },
)

watch(
  value,
  (val) => {
    if (!isTopMenu || !showTopAsideMode) return
    if (!data.some((item) => item.name === val)) return
    if (val === menuStore.topActiveName) return
    menuStore.topActiveNameChangeAction(val as RouteRecordName)
  },
  {
    immediate: true,
  },
)

function handleValueChange() {
  emit('change')
}
</script>

<style scoped></style>
