import { baseHttp } from '@/api/request'

export function authLoginApi(data: Api.Auth.LoginParams) {
  return baseHttp.request<string>({
    url: 'auth/login',
    method: 'POST',
    data
  })
}
