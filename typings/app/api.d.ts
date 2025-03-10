declare namespace Api {
  namespace Commom {}

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
}
