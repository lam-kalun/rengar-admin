import fs from 'fs'
import path from 'path'

import type { Plugin } from 'vite'
import type { Option } from './types'
export function vitePluginRoutes(option: Option): Plugin {
  const { entry, output, layout, typeDir } = option
  const root = process.cwd()
  const viewsDir = path.resolve(root, entry)
  const outputPath = path.resolve(root, output)
  const typesDir = path.resolve(root, typeDir)
  const watcher: fs.FSWatcher | null = null

  return {
    name: 'vite-plugin-routes',
    buildStart() {
      console.dir(generateRoutesTree(viewsDir, 1, layout), { depth: null })
    }
  }
}

function generateRoutesTree(dir: string, level: number, layout: Option['layout'], parent?: string) {
  return fs
    .readdirSync(dir)
    .filter((file) => {
      const fullPath = path.join(dir, file)
      const stat = fs.statSync(fullPath)
      return stat.isDirectory() && !file.startsWith('_')
    })
    .map((file) => {
      const fullPath = path.join(dir, file)
      const children = generateRoutesTree(fullPath, level + 1, layout, file)

      // 处理动态路由参数
      const dynamicMatch = file.match(/^\[(.*)\]$/)
      const routePath = dynamicMatch ? `:${dynamicMatch[1]}` : `${level === 1 ? '/' : ''}${file}`

      // 检查叶子节点（包含index.vue或动态文件）
      const isLeaf =
        fs.existsSync(path.join(fullPath, 'index.vue')) || fs.readdirSync(fullPath).some((f) => /^\[.*\]\.vue$/.test(f))

      const node: Recordable = {
        path: routePath,
        name: `${parent ? `${parent}-` : ''}${file.replace(/\[.*\]/g, '')}`,
        meta: {
          title: `${parent ? `${parent}_` : ''}${file.replace(/\[.*\]/g, '')}`
        },
        ...(isLeaf && {
          component: `@/views/${path.relative(path.dirname(dir), fullPath).replace(/\\/g, '/')}/index.vue`
        }),
        ...(children.length > 0 && { children })
      }

      return node
    })
    .filter((node) => node.component || (node.children && node.children.length > 0))
}
