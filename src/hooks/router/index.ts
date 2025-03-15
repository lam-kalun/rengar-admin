import router from '@/router'
import type { Option } from './type'
export function useRouterHook() {
  function pushByRouterName(name: RouterName, option?: Option) {
    router.push({
      name,
      ...option,
    })
  }

  function pushHome() {
    pushByRouterName('home-index')
  }

  function replaceByRouterName(name: RouterName, option?: Option) {
    router.replace({
      name,
      ...option,
    })
  }

  function replaceLogin(routerName?: RouterName) {
    const params: Recordable = {
      name: 'login-index',
    }
    if (routerName) {
      params.query = {
        redirect: routerName,
      }
    }
    router.replace(params)
  }

  return {
    pushByRouterName,
    pushHome,
    replaceLogin,
    replaceByRouterName,
  }
}
