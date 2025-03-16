import { useRouter } from 'vue-router'
import type { Option } from './type'
export function useRouterHook() {
  const router = useRouter()
  function pushByRouteName(name: RouteRecordName, option?: Option) {
    router.push({
      name,
      ...option,
    })
  }

  function pushHome() {
    pushByRouteName('home')
  }

  function replaceByRouteName(name: RouteRecordName, option?: Option) {
    router.replace({
      name,
      ...option,
    })
  }

  function replaceLogin(routerName?: RouteRecordName) {
    const params: Recordable = {
      name: 'login',
    }
    if (routerName) {
      params.query = {
        redirect: routerName,
      }
    }
    router.replace(params)
  }

  return {
    pushByRouteName,
    pushHome,
    replaceLogin,
    replaceByRouteName,
  }
}
