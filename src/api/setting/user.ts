import { baseHttp } from '@/api/request'

export function userPageListApi() {
  return baseHttp.request<Api.Commom.PageResponse<Api.Setting.User>>({
    url: '/user/pageList',
    method: 'post',
  })
}

export function userAddApi(data: Api.Setting.User) {
  return baseHttp.request<boolean>({
    url: '/user/add',
    method: 'post',
    data,
  })
}
export function userEditApi(data: Api.Setting.User) {
  return baseHttp.request<Api.Setting.Menu>({
    url: '/user/edit',
    method: 'post',
    data,
  })
}

export function userDeleteApi(id: number) {
  return baseHttp.request<Api.Setting.User>({
    url: '/user/delete',
    method: 'post',
    data: { id },
  })
}

export function userBindRoleApi(data: Api.Setting.UserBindRoleReq) {
  return baseHttp.request({
    url: '/user/bindMenu',
    method: 'post',
    data,
  })
}
