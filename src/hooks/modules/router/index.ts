import type { Option } from './type'
export function useRouterHook() {
  const router = useRouter()

  function pushByRouterName(name: RouterKey, option?: Option) {
    router.push({
      name,
      ...option
    })
  }

  function pushHome() {
    pushByRouterName('home')
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
    redirecLogin
  }
}
