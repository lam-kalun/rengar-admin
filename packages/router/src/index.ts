import fs from 'fs'
import path from 'path'
import type { Plugin } from 'vite'
import type { Layout, Option, TreeNode } from './types'

export function vitePluginRoutes(option: Option): Plugin {
  const { entry, output, layout } = option
  const root = process.cwd()
  const viewsDir = path.resolve(root, entry)
  const outputPath = path.resolve(root, output)

  function generateRouteString(routes: TreeNode[]): string {
    const indent = '  '
    let result =
      "// 此文件由vite-plugin-routes自动生成，请勿手动修改\n\nimport type { RouteRecordRaw } from 'vue-router'\n\nexport const routes: RouteRecordRaw[] = [\n"

    // 读取现有的路由配置
    const existingRoutes: Record<string, { component: string; meta: any }> = {}
    if (fs.existsSync(outputPath)) {
      const content = fs.readFileSync(outputPath, 'utf-8')
      const routeRegex =
        /name:\s*'([^']+)'[\s\S]*?component:\s*\(\)\s*=>\s*import\('([^']+)'\)[\s\S]*?meta:\s*({[\s\S]*?})/g
      let match
      while ((match = routeRegex.exec(content)) !== null) {
        const [, name, component, meta] = match
        existingRoutes[name] = {
          component,
          meta: meta.replace(/\s+/g, '')
        }
      }
    }

    function stringifyNode(node: TreeNode, level: number = 1): string {
      const spaces = indent.repeat(level)
      let str = spaces + '{\n'

      // 基本属性
      str += `${spaces}${indent}name: '${node.name}',\n`
      str += `${spaces}${indent}path: '${node.path}',\n`

      // 如果存在现有配置，使用现有的component和meta
      const existing = existingRoutes[node.name]
      if (existing) {
        str += `${spaces}${indent}component: () => import('${existing.component}'),\n`
        str += `${spaces}${indent}meta: ${existing.meta},\n`
      } else {
        str += `${spaces}${indent}component: () => import('${node.component}'),\n`
        str += `${spaces}${indent}meta: {\n`
        str += `${spaces}${indent}${indent}title: '${node.meta.title}'\n`
        str += `${spaces}${indent}},\n`
      }

      // children属性
      if (node.children && node.children.length > 0) {
        str += `${spaces}${indent}children: [\n`
        str += node.children.map((child) => stringifyNode(child, level + 2)).join(',\n')
        str += `\n${spaces}${indent}]\n`
      }

      str += `${spaces}}`
      return str
    }

    result += routes.map((route) => stringifyNode(route)).join(',\n')
    result += '\n]\n'
    return result
  }

  return {
    name: 'vite-plugin-routes',
    buildStart() {
      const routes = generateTree(viewsDir, viewsDir, 1, layout)
      const routeString = generateRouteString(routes)
      fs.writeFileSync(outputPath, routeString, 'utf-8')

      // 监听views目录的文件变化
      const watcher = fs.watch(viewsDir, { recursive: true }, (eventType, filename) => {
        if (filename) {
          console.log(`检测到文件变化: ${filename}, 事件类型: ${eventType}`)
          const updatedRoutes = generateTree(viewsDir, viewsDir, 1, layout)
          const updatedRouteString = generateRouteString(updatedRoutes)
          fs.writeFileSync(outputPath, updatedRouteString, 'utf-8')
        }
      })

      // 在插件关闭时停止监听
      process.on('SIGTERM', () => watcher.close())
      process.on('exit', () => watcher.close())
    }
  }

  function generateTree(dir: string, root: string, level: number, layout: Layout): TreeNode[] {
    const result: TreeNode[] = []
    const files = fs.readdirSync(dir)

    // 过滤掉以_开头的目录
    const validFiles = files.filter((file) => !file.startsWith('_'))

    for (const file of validFiles) {
      const fullPath = path.join(dir, file)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory()) {
        // 检查目录下的合法文件数量
        const vueFiles = fs.readdirSync(fullPath).filter((f) => f === 'index.vue' || /^\[.*\]\.vue$/.test(f))
        if (vueFiles.length > 1) {
          throw new Error(
            `目录 ${fullPath} 下存在多个Vue文件：${vueFiles.join(', ')}。每个目录只允许存在一个合法的Vue文件。`
          )
        }

        // 检查目录下是否有合法文件
        const hasValidFile = vueFiles.length === 1

        // 获取相对路径部分用于生成name和path
        const relativePath = path.relative(root, fullPath)
        const pathSegments = relativePath.split(path.sep)
        const name = pathSegments.join('-')

        // 检查是否有动态路由文件
        const dynamicFile = fs.readdirSync(fullPath).find((f) => /^\[.*\]\.vue$/.test(f))

        let routePath = level === 1 ? '/' + file : file
        if (dynamicFile) {
          const param = dynamicFile.match(/^\[(.*?)\]\.vue$/)?.[1]
          routePath = level === 1 ? `/${file}/:${param}` : `${file}/:${param}`
        }

        const children = generateTree(fullPath, root, level + 1, layout)

        // 如果目录下有合法文件或者有有效的子路由，则添加到结果中
        if (hasValidFile || children.length > 0) {
          const node: TreeNode = {
            name,
            path: routePath,
            level,
            component:
              level === 1 && hasValidFile
                ? layout.base
                : hasValidFile
                  ? dynamicFile
                    ? `@/views/${relativePath.split(path.sep).join('/')}/${dynamicFile}`
                    : `@/views/${relativePath.split(path.sep).join('/')}/index.vue`
                  : layout.base,
            meta: {
              title: pathSegments.join('_')
            },
            ...(children.length > 0 ? { children } : {})
          }

          // 如果是一级路由且有合法文件，将原组件移到children中
          if (level === 1 && hasValidFile) {
            const originalComponent = dynamicFile
              ? `@/views/${relativePath.split(path.sep).join('/')}/${dynamicFile}`
              : `@/views/${relativePath.split(path.sep).join('/')}/index.vue`

            node.children = [
              {
                name: `${name}-index`,
                path: '',
                level: level + 1,
                component: originalComponent,
                meta: {
                  title: pathSegments.join('_')
                }
              },
              ...(node.children || [])
            ]
          }

          result.push(node)
        }
      }
    }

    return result
  }
}
