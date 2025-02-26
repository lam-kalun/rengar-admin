import fs from 'fs'
import path from 'path'
import type { Plugin } from 'vite'
import type { Layout, Option, TreeNode } from './types'

export function vitePluginRoutes(option: Option): Plugin {
  const { entry, layout } = option
  const root = process.cwd()
  const viewsDir = path.resolve(root, entry)
  // const outputPath = path.resolve(root, output)

  return {
    name: 'vite-plugin-routes',
    buildStart() {
      console.dir(generateTree(viewsDir, viewsDir, 1, layout), { depth: null })

      // 监听views目录的文件变化
      const watcher = fs.watch(viewsDir, { recursive: true }, (eventType, filename) => {
        if (filename) {
          console.log(`检测到文件变化: ${filename}, 事件类型: ${eventType}`)
          console.dir(generateTree(viewsDir, viewsDir, 1, layout), { depth: null })
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

        let routePath = '/' + relativePath.split(path.sep).join('/')
        if (dynamicFile) {
          const param = dynamicFile.match(/^\[(.*?)\]\.vue$/)?.[1]
          routePath += `/:${param}`
        }

        const children = generateTree(fullPath, root, level + 1, layout)

        // 如果目录下有合法文件或者有有效的子路由，则添加到结果中
        if (hasValidFile || children.length > 0) {
          const node: TreeNode = {
            name,
            path: routePath,
            level,
            component: hasValidFile
              ? dynamicFile
                ? `@/views${routePath.replace(/:[^/]+/g, '[id]')}.vue`
                : `@/views${routePath.replace(/:[^/]+/g, '[id]')}/index.vue`
              : layout.base,
            meta: {
              title: pathSegments.join('_')
            },
            ...(children.length > 0 ? { children } : {})
          }
          result.push(node)
        }
      }
    }

    return result
  }
}
