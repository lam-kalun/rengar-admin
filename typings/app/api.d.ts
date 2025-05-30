declare namespace Api {
  namespace Commom {
    type EnableStatus = 0 | 1
    interface PageResponse<T> {
      current: number
      size: number
      pages: number
      total: number
      records: T[]
    }
    interface PageRequest {
      current: number
      size: number
      [key: string]: any
    }
  }

  namespace Auth {
    interface LoginParams {
      username: string
      password: string
    }

    interface DetailResponse {
      username: string
      id: number
      codes: string[]
    }

    interface PasswordParams {
      oldPassword: string
      newPassword: string
      confirmPassword: string
    }
  }

  namespace Setting {
    interface Menu {
      id: number
      parentId: number
      code: string
      name: string
      status: Commom.EnableStatus
      sort: number
    }

    interface MenuTree extends Menu {
      children?: MenuTree[]
    }
    interface Button {
      id: number
      parentId: number
      code: string
      name: string
      status: Commom.EnableStatus
      sort: number
    }

    interface Role {
      id: number
      status: Commom.EnableStatus
      name: string
    }

    interface RoleConfigReq {
      id: number
      codes: string[]
      halfCodes: string[]
    }

    interface User {
      id: number
      username: string
      status: Commom.EnableStatus
      roleIds: string[]
    }

    interface UserBindRoleReq {
      id: number
      roleIds: number[]
    }

    interface PasswordParams {
      id: number
      newPassword: string
      confirmPassword: string
    }
    interface LogInfo {
      tabList: App.Tab[]
    }
  }
}
