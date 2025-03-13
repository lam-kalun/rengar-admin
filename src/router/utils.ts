import type { RouteRecordRaw } from 'vue-router'

export function filterRoutes(routes: RouteRecordRaw[], callBack: (node: RouteRecordRaw) => boolean): RouteRecordRaw[] {
  const result: RouteRecordRaw[] = []

  function traverse(node: RouteRecordRaw): boolean {
    if (callBack(node)) {
      result.push(node)
      return true
    }

    if (node.children) {
      const children = node.children.filter(traverse)
      if (children.length > 0) {
        result.push({ ...node, children })
        return true
      }
    }

    return false
  }

  routes.forEach(traverse)
  return result
}
