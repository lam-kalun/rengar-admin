import vueRouter from '@/router'
import type { Option } from './type'
export function useRouterHook(setup = true) {
  const router = setup ? useRouter() : vueRouter
  function routerPushByName(name: RouteRecordName, option?: Option) {
    router.push({
      name,
      ...option,
    })
  }

  function routerPushToHome() {
    routerPushByName('home')
  }

  function routerReplaceToHome() {
    routerPushByName('home')
  }

  function routerReplaceByName(name: RouteRecordName, option?: Option) {
    router.replace({
      name,
      ...option,
    })
  }
  function routerReplaceToLogin(path?: string) {
    router.replace({
      name: 'login',
      query: {
        redirect: path ? encodeURIComponent(path) : undefined,
      },
    })
  }

  return {
    routerPushToHome,
    routerReplaceToHome,
    routerReplaceToLogin,
    routerReplaceByName,
    routerPushByName,
  }
}
