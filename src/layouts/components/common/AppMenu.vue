<template>
  <NMenu
    :default-value="value"
    :mode
    :options="menus"
    :collapsed="layoutStore.config.asideCollapse"
    :collapsed-width="64"
  ></NMenu>
</template>

<script setup lang="ts">
import { useAuthStore, useLayoutStore } from '@/stores'
import { NEllipsis, type MenuOption } from 'naive-ui'
import { RouterLink, type RouteRecordRaw } from 'vue-router'
import SvgIcon from '@/components/SvgIcon/index.vue'
const authStore = useAuthStore()
const layoutStore = useLayoutStore()

const { mode = 'vertical' } = defineProps<{
  mode?: 'horizontal' | 'vertical'
}>()

const menus = computed(() => {
  return generateMenus(authStore.menus)
})

function generateMenus(routes: RouteRecordRaw[]): MenuOption[] {
  return routes.map((route) => {
    const menuOption: MenuOption = {
      label: () =>
        !route.children
          ? h(
              RouterLink,
              {
                to: {
                  name: route.name,
                },
              },
              { default: () => h(NEllipsis, null, { default: () => route.meta?.title }) },
            )
          : h(NEllipsis, null, { default: () => route.meta?.title }),
      key: route.meta?.activeMenu || route.name,
      icon: () => {
        if (route.meta?.icon) {
          return h(SvgIcon, {
            icon: route.meta?.icon,
          })
        } else if (route.meta?.localIcon) {
          return h(SvgIcon, {
            localIcon: route.meta?.localIcon,
          })
        } else {
          return h(SvgIcon, {
            icon: 'ic:baseline-menu',
          })
        }
      },
    }

    if (route.children && route.children.length > 0) {
      menuOption.children = generateMenus(route.children)
    }

    return menuOption
  })
}

const route = useRoute()
watch(
  route,
  (val) => {
    console.log(val.matched)
  },
  {
    immediate: true,
  },
)
const value = ref(route.meta.activeMenu || route.name)
</script>

<style scoped></style>
