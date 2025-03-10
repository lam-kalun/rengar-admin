import { authLoginApi, authDetailApi, authLoginOutApi } from '@/api'
import { to } from '@/utils'
const saveStorage = import.meta.env.VITE_APP_TOKEN_STORAGE
const saveTokenKey = 'token'
export const useAuthStore = defineStore('auth', () => {
  // 用户信息
  const user = ref<App.Auth.User>({
    token: getToken() || undefined
  })

  function saveToken(token: string) {
    if (saveStorage === 'sessionStorage') {
      sessionStorage.setItem(saveTokenKey, token)
    } else {
      localStorage.setItem(saveTokenKey, token)
    }
  }
  function getToken() {
    if (saveStorage === 'sessionStorage') {
      return sessionStorage.getItem(saveTokenKey)
    } else {
      return localStorage.getItem(saveTokenKey)
    }
  }
  function removeToken() {
    if (saveStorage === 'sessionStorage') {
      sessionStorage.removeItem(saveTokenKey)
    } else {
      localStorage.removeItem(saveTokenKey)
    }
  }
  async function authLoginAction(params: Api.Auth.LoginParams) {
    const [err, data] = await to(authLoginApi(params))
    if (err) return Promise.reject(err)
    user.value.token = data
    saveToken(data)
    // 修正为使用正确的变量名来访问存储对象
    return true
  }

  async function authDetailAction() {
    const [err, data] = await to(authDetailApi())
    if (err) return Promise.reject(err)
    Object.assign(user.value, data)
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
  }

  return {
    user,
    authLoginAction,
    authDetailAction,
    authLoginOutAction,
    reset
  }
})
