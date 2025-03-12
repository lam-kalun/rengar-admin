import fs from 'fs'
import path from 'path'

import type { Plugin } from 'vite'
import type { Option, TreeNode } from './types'
export function vitePluginRoutes(option: Option): Plugin {
  const { entry, output, layout, typeDir } = option
  const root = process.cwd()
  const viewsDir = path.resolve(root, entry)
  const outputPath = path.resolve(root, output)
  const typesDir = path.resolve(root, typeDir)

  return {
    name: 'vite-plugin-routes',
    buildStart() {
      const routes = generateRoutesTree(viewsDir, viewsDir, layout.base)

      const routeContent = generateRouteString(routes)
      fs.writeFileSync(outputPath, routeContent, 'utf-8')

      // 生成路由名称类型定义
      const routeNames = collectRouteNames(routes)
      const typeContent = generateRouteNameType(routeNames)
      fs.writeFileSync(typesDir, typeContent, 'utf-8')
    },
  }
}

function collectRouteNames(routes: TreeNode[]): string[] {
  const names: string[] = []

  function traverse(node: TreeNode) {
    if (node.name) {
      names.push(node.name)
    }
    if (node.children) {
      node.children.forEach(traverse)
    }
  }

  routes.forEach(traverse)
  return names
}

function generateRouteNameType(names: string[]): string {
  return `// 此文件由vite-plugin-routes自动生成，请勿手动修改

type RouteName =
  ${names.map((name) => `| '${name}'`).join('\n  ')}
`
}

function generateRouteString(routes: TreeNode[]): string {
  const indent = '  '
  let result =
    "// 此文件由vite-plugin-routes自动生成，请勿手动修改\n\nimport type { RouteRecordRaw } from 'vue-router'\n\nexport const routes: RouteRecordRaw[] = [\n"

  function stringifyNode(node: TreeNode, level: number = 1): string {
    const spaces = indent.repeat(level)
    let str = spaces + '{\n'

    // 基本属性
    if (node.name) {
      str += `${spaces}${indent}name: '${node.name}',\n`
    }
    str += `${spaces}${indent}path: '${node.path}',\n`

    // 组件属性
    if (node.component) {
      str += `${spaces}${indent}component: () => import('${node.component}'),\n`
    }

    // meta属性
    str += `${spaces}${indent}meta: {\n`
    str += `${spaces}${indent}${indent}title: '${node.meta.title}'\n`
    str += `${spaces}${indent}},\n`

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

function generateRoutesTree(dir: string, rootDir: string, layout: string): TreeNode[] {
  const root = process.cwd()
  const result: TreeNode[] = []
  const files = fs.readdirSync(dir)

  for (const file of files) {
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      const hasIndexVue = fs.existsSync(path.join(fullPath, 'index.vue'))
      const children = generateRoutesTree(fullPath, rootDir, layout)
      const relativePath = path.relative(path.join(root, 'src/views'), fullPath)
      const pathSegments = relativePath.split(path.sep)

      // 处理包含&符号的目录名
      if (file.includes('&')) {
        const segments = file.split('&')
        for (const segment of segments) {
          // 只有当目录下存在index.vue文件时才生成路由配置
          if (hasIndexVue || children.length > 0) {
            // 处理动态参数
            const dynamicParam = segment.match(/\[(.*?)\]$/)?.[1]
            const cleanSegment = segment.replace(/\[.*?\]$/, '')
            const routePath = dynamicParam
              ? pathSegments.length === 1
                ? `/${cleanSegment}/:${dynamicParam}`
                : `${cleanSegment}/:${dynamicParam}`
              : pathSegments.length === 1
                ? `/${cleanSegment}`
                : cleanSegment

            // 移除动态参数部分，生成更清晰的name和title
            const cleanPathSegments = [...pathSegments.slice(0, -1), cleanSegment].map((seg) =>
              seg.replace(/\[.*?\]$/, ''),
            )
            const name = cleanPathSegments.join('-')
            const title = cleanPathSegments.join('_')

            const node: TreeNode = {
              path: routePath,
              level: pathSegments.length,
              meta: {
                title,
              },
            }

            // 只有顶层和叶子节点设置component
            const isFirstLevel = pathSegments.length === 1
            const isLeaf = !children.length

            if (isFirstLevel || isLeaf) {
              node.name = name
              node.component = isFirstLevel
                ? layout
                : `@${path.relative(root, rootDir).replace('src', '').split(path.sep).join('/')}/${relativePath.split(path.sep).join('/')}/index.vue`
            }

            // 处理一级目录的特殊情况
            if (isFirstLevel && hasIndexVue) {
              node.children = [
                {
                  path: '',
                  level: 2,
                  component: `@${path.relative(root, rootDir).replace('src', '').split(path.sep).join('/')}/${relativePath}/index.vue`,
                  meta: {
                    title,
                  },
                },
                ...children,
              ]
            } else if (children.length > 0) {
              node.children = children
            }

            result.push(node)
          }
        }
      } else {
        // 原有的单路由处理逻辑
        const dynamicParam = file.match(/\[(.*?)\]$/)?.[1]
        const routePath = dynamicParam
          ? pathSegments.length === 1
            ? `/${file.replace(/\[.*?\]$/, '')}/:${dynamicParam}`
            : `${file.replace(/\[.*?\]$/, '')}/:${dynamicParam}`
          : pathSegments.length === 1
            ? `/${file}`
            : file

        // 移除动态参数部分，生成更清晰的name和title
        const cleanPathSegments = pathSegments.map((segment) => segment.replace(/\[.*?\]$/, ''))
        const name = cleanPathSegments.join('-')
        const title = cleanPathSegments.join('_')

        // 只处理有index.vue的叶子节点或者有子节点的目录
        if (hasIndexVue || children.length > 0) {
          const isFirstLevel = pathSegments.length === 1
          const isLeaf = !children.length

          const node: TreeNode = {
            path: routePath,
            level: pathSegments.length,
            meta: {
              title,
            },
          }

          // 只有顶层和叶子节点设置component
          if (isFirstLevel || isLeaf) {
            node.name = name
            node.component = isFirstLevel
              ? layout
              : `@${path.relative(root, rootDir).replace('src', '').split(path.sep).join('/')}/${relativePath.split(path.sep).join('/')}/index.vue`
          }

          // 处理一级目录的特殊情况
          if (isFirstLevel && hasIndexVue) {
            node.children = [
              {
                path: '',
                level: 2,
                component: `@${path.relative(root, rootDir).replace('src', '').split(path.sep).join('/')}/${relativePath}/index.vue`,
                meta: {
                  title,
                },
              },
              ...children,
            ]
          } else if (children.length > 0) {
            node.children = children
          }

          result.push(node)
        }
      }
    }
  }

  return result
}
