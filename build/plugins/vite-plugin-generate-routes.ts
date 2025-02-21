import { Plugin } from 'vite'
import { promises as fs } from 'fs'
import path from 'path'

export function generateRoutesPlugin(): Plugin {
  return {
    name: 'vite-plugin-generate-routes',
    async buildStart() {
      const viewsDir = path.resolve(__dirname, '../../src/views')
      const routesFile = path.resolve(__dirname, '../../src/router/routes.ts')

      const routes = await generateRoutes(viewsDir)
      const routesContent = `export const routes = ${JSON.stringify(routes, null, 2)}`

      await fs.writeFile(routesFile, routesContent, 'utf-8')
    }
  }
}

async function generateRoutes(dir: string) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const routes = []

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const indexFile = path.resolve(dir, entry.name, 'index.vue')
      const dynamicFile = path.resolve(dir, entry.name, '[xxx].vue')

      if (await fileExists(indexFile)) {
        routes.push({
          path: `/${entry.name}`,
          component: `() => import('@/views/${entry.name}/index.vue')`
        })
      } else if (await fileExists(dynamicFile)) {
        routes.push({
          path: `/${entry.name}/:xxx`,
          component: `() => import('@/views/${entry.name}/[xxx].vue')`
        })
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
