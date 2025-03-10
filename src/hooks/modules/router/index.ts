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
    pushByRouterName('home-index')
  }

  function replaceByRouterName(name: RouterKey, option?: Option) {
    router.replace({
      name,
      ...option
    })
  }

  function replaceLogin(routerName?: RouterKey) {
    const params: Recordable = {
      name: 'login-index'
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
    replaceLogin,
    replaceByRouterName
  }
}
