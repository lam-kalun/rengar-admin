import { Plugin } from 'vite'
import { promises as fs } from 'fs'
import path from 'path'

export function setupRouter(): Plugin {
  return {
    name: 'vite-plugin-generate-routes',
    async buildStart() {
      const viewsDir = path.resolve(__dirname, '../../src/views')
      const routesFile = path.resolve(__dirname, '../../src/router/routes.ts')

      const routes = await generateRoutes(viewsDir)
      const routesContent = `export const routes = [
  ${routes
    .map(
      (route) => `{
    path: '${route.path}',
    name: '${route.name}',
    component: ${route.component},
    meta: { title: '${route.meta.title}' }
  }`
    )
    .join(',\n  ')}
]`

      await fs.writeFile(routesFile, routesContent, 'utf-8')
    }
  }
}

async function generateRoutes(dir: string, parentPath: string = '') {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const routes = []

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const currentPath = path.join(dir, entry.name)
      const indexFile = path.resolve(currentPath, 'index.vue')
      const dynamicFile = path.resolve(currentPath, '[xxx].vue')
      const relativePath = path.relative(path.resolve(__dirname, '../../src/views'), currentPath)
      const routePath = parentPath ? `${parentPath}/${entry.name}` : `/${entry.name}`

      const route: any = {
        path: routePath,
        name: relativePath.replace(/\//g, '-'),
        meta: { title: entry.name }
      }

      if (await fileExists(indexFile)) {
        route.component = `() => import('@/views/${relativePath}/index.vue')`
      } else if (await fileExists(dynamicFile)) {
        route.path = `${routePath}/:xxx`
        route.component = `() => import('@/views/${relativePath}/[xxx].vue')`
      }

      const children = await generateRoutes(currentPath, routePath)
      if (children.length > 0) {
        route.children = children
      }

      if (route.component || children.length > 0) {
        routes.push(route)
      }
    }
  }

  return routes
}

async function fileExists(file: string) {
  try {
    await fs.access(file)
    return true
  } catch {
    return false
  }
}
