import { baseHttp } from '@/api/request'

export function authLoginApi(data: Api.Auth.LoginParams) {
  return baseHttp.request<string>({
    url: 'user/login',
    method: 'POST',
    data
  })
}
