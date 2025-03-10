import router from '@/router'
import type { Option } from './type'
export function useRouterHook() {
  function pushByRouterName(name: RouterKey, option?: Option) {
    router.push({
      name,
      ...option
    })
  }

  function pushHome() {
    pushByRouterName('home')
  }

  function replaceByRouterName(name: RouterKey, option?: Option) {
    router.replace({
      name,
      ...option
    })
  }

  function redirecLogin(routerName?: RouterKey) {
    const params: Recordable = {
      name: 'login'
    }
    if (routerName) {
      params.query = {
        redirect: routerName
      }
    }
    router.replace(params)
  }

  return {
    pushByRouterName,
    pushHome,
    redirecLogin,
    replaceByRouterName
  }
}
