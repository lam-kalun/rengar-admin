import { authLoginApi, authDetailApi, authLoginOutApi } from '@/api/common/auth'
import { routes } from '@/router/routes'
import { filterRoutes } from '@/router/utils'
import { to } from '@rengar/utils'
import type { RouteRecordRaw } from 'vue-router'
const saveStorage = import.meta.env.VITE_APP_TOKEN_STORAGE
const storage = saveStorage === 'sessionStorage' ? sessionStorage : localStorage
const saveTokenKey = 'token'
export const useAuthStore = defineStore('auth', () => {
  // 用户信息
  const user = ref<App.Auth.User>({
    token: getToken() || undefined,
  })
  const roleMap = new Map<string, string>()
  const menus = ref<RouteRecordRaw[]>([])
  function saveToken(token: string) {
    storage.setItem(saveTokenKey, token)
  }
  function getToken() {
    return storage.getItem(saveTokenKey)
  }
  function removeToken() {
    storage.removeItem(saveTokenKey)
  }
  async function authLoginAction(params: Api.Auth.LoginParams) {
    const [err, data] = await to(authLoginApi(params))
    if (err) return Promise.reject(err)
    user.value.token = data
    saveToken(data)
    return true
  }

  function sortMenus(menus: RouteRecordRaw[]): RouteRecordRaw[] {
    // 对当前层级的菜单进行排序
    const sortedMenus = menus.sort((a, b) => {
      const sortA = a.meta?.order || 0
      const sortB = b.meta?.order || 0
      return sortA - sortB
    })

    // 递归处理子菜单
    sortedMenus.forEach((menu) => {
      if (menu.children) {
        menu.children = sortMenus(menu.children)
      }
    })

    return sortedMenus
  }

  function gernerateMenus() {
    const filterMenus = filterRoutes(routes, (route) => {
      if (route.meta?.hideInMenu) return false
      const roles = route.meta?.role
      if (Array.isArray(roles) && roles.length > 0) {
        return roles.some((role) => roleMap.has(role))
      }
      return true
    })
    menus.value = sortMenus(filterMenus)
  }

  async function authDetailAction() {
    const [err, data] = await to(authDetailApi())
    if (err) return Promise.reject(err)
    user.value.id = data.id
    user.value.username = data.username
    data.codes.forEach((item) => {
      roleMap.set(item, item)
    })
    gernerateMenus()
    return true
  }

  async function authLoginOutAction() {
    const [err] = await to(authLoginOutApi())
    if (err) return Promise.reject(err)
    reset()
    return true
  }

  function reset() {
    user.value = {}
    removeToken()
    roleMap.clear()
  }

  return {
    user,
    roleMap,
    menus,
    authLoginAction,
    authDetailAction,
    authLoginOutAction,
    reset,
  }
})
