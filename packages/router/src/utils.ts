import fs from 'fs'
import path from 'path'
import type { Layout, TreeNode } from './types'

// 生成路由字符串
export function generateRouteString(routes: TreeNode[], outputPath: string): string {
  const indent = '  '
  let result =
    "// 此文件由vite-plugin-routes自动生成，手动修改componet、meta的值不会被覆盖，其他请勿手动修改\n\nimport type { RouteRecordRaw } from 'vue-router'\n\nexport const routes: RouteRecordRaw[] = [\n"

  // 读取现有的路由配置
  const existingRoutes: Record<string, { component: string; meta: string }> = {}
  if (fs.existsSync(outputPath)) {
    const content = fs.readFileSync(outputPath, 'utf-8')
    const routeRegex =
      /name:\s*'([^']+)'[\s\S]*?component:\s*\(\)\s*=>\s*import\('([^']+)'\)[\s\S]*?meta:\s*({[\s\S]*?})/g
    let match
    while ((match = routeRegex.exec(content)) !== null) {
      const [, name, component, meta] = match
      existingRoutes[name] = {
        component,
        meta: meta
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

// 生成路由树
export function generateTree(dir: string, root: string, level: number, layout: Layout): TreeNode[] {
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

// 收集路由名称
export function collectRouteNames(nodes: TreeNode[]): Set<string> {
  const routeNames = new Set<string>()
  for (const node of nodes) {
    routeNames.add(node.name)
    if (node.children) {
      const childNames = collectRouteNames(node.children)
      childNames.forEach((name) => routeNames.add(name))
    }
  }
  return routeNames
}

// 生成路由类型定义内容
export function generateRouteTypes(routeNames: Set<string>): string {
  return `// 此文件由vite-plugin-routes自动生成，请勿手动修改

type RouterKey =
  | '${Array.from(routeNames).join("'\n  | '")}'`
}

// 创建文件监听器
export function createFileWatcher(
  viewsDir: string,
  // eslint-disable-next-line no-unused-vars
  callback: (_eventType: fs.WatchEventType, _filename: string | null) => void
): fs.FSWatcher {
  const watcher = fs.watch(viewsDir, { recursive: true }, callback)
  process.on('SIGTERM', () => watcher.close())
  process.on('exit', () => watcher.close())
  return watcher
}
