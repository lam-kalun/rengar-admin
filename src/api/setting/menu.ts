import { baseHttp } from '@/api/request'

export function menuTreeApi() {
  return baseHttp.request<Api.Setting.MenuTree[]>({
    url: '/menu/tree',
    method: 'post',
  })
}

export function menuAddApi(data: Api.Setting.Menu) {
  return baseHttp.request<Api.Setting.Menu>({
    url: '/menu/add',
    method: 'post',
    data,
  })
}
export function menuEditApi(data: Api.Setting.Menu) {
  return baseHttp.request<Api.Setting.Menu>({
    url: '/menu/edit',
    method: 'post',
    data,
  })
}

export function menuDeleteApi(id: number) {
  return baseHttp.request<Api.Setting.Menu>({
    url: '/menu/delete',
    method: 'post',
    data: { id },
  })
}

export function buttonListApi() {
  return baseHttp.request<Api.Setting.Button[]>({
    url: '/button/list',
    method: 'post',
  })
}

export function buttonAddApi(data: Api.Setting.Button) {
  return baseHttp.request<Api.Setting.Button>({
    url: '/button/add',
    method: 'post',
    data,
  })
}

export function buttonEditApi(data: Api.Setting.Button) {
  return baseHttp.request<Api.Setting.Button>({
    url: '/button/edit',
    method: 'post',
    data,
  })
}
export function buttonDeleteApi(id: number) {
  return baseHttp.request<Api.Setting.Button>({
    url: '/button/delete',
    method: 'post',
    data: { id },
  })
}
