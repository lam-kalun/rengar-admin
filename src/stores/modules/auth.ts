import { authLoginApi, authDetailApi, authLoginOutApi } from '@/api'
import { to } from '@/utils'
const saveStorage = import.meta.env.VITE_APP_TOKEN_STORAGE
const storage = saveStorage === 'sessionStorage' ? sessionStorage : localStorage
const saveTokenKey = 'token'
export const useAuthStore = defineStore('auth', () => {
  // 用户信息
  const user = ref<App.Auth.User>({
    token: getToken() || undefined,
  })

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
    reset,
  }
})
