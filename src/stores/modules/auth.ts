import { authLoginApi } from '@/api'
import { to } from '@/utils'
export const useAuthStore = defineStore('auth', () => {
  const user = ref<Api.Auth.User | null>(null)

  async function authLoginAction(params: Api.Auth.LoginParams) {
    const [err, data] = await to(authLoginApi(params))
    if (err) return Promise.reject(err)
    console.log(data)
    return true
  }

  return {
    user,
    authLoginAction
  }
})
