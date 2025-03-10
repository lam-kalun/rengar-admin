import { baseHttp } from '@/api/request'

export function authLoginApi(data: Api.Auth.LoginParams) {
  return baseHttp.request<string>({
    url: 'auth/login',
    method: 'POST',
    data
  })
}

export function authDetailApi() {
  return baseHttp.request<Api.Auth.DetailResponse>({
    url: 'auth/detail',
    method: 'post'
  })
}

export function authLoginOutApi() {
  return baseHttp.request<boolean>({
    url: 'auth/loginOut',
    method: 'post'
  })
}
