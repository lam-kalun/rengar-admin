declare namespace Api {
  namespace Commom {}

  namespace Auth {
    interface User {
      username?: string
      id?: number
      token?: string
    }
    interface LoginParams {
      username: string
      password: string
    }
  }
}
