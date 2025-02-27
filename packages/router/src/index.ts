import fs from 'fs'
import path from 'path'
import type { Plugin } from 'vite'
import type { Option } from './types'
import { generateRouteString, generateTree, collectRouteNames, generateRouteTypes, createFileWatcher } from './utils'

export function vitePluginRoutes(option: Option): Plugin {
  const { entry, output, layout, typeDir } = option
  const root = process.cwd()
  const viewsDir = path.resolve(root, entry)
  const outputPath = path.resolve(root, output)
  const typesDir = path.resolve(root, typeDir)

  return {
    name: 'vite-plugin-routes',
    buildStart() {
      // 生成路由配置
      const routes = generateTree(viewsDir, viewsDir, 1, layout)
      const routeString = generateRouteString(routes, outputPath)
      fs.writeFileSync(outputPath, routeString, 'utf-8')

      // 生成路由类型定义
      const routeNames = collectRouteNames(routes)
      const typeContent = generateRouteTypes(routeNames)
      fs.writeFileSync(typesDir, typeContent, 'utf-8')

      // 监听views目录的文件变化
      createFileWatcher(viewsDir, (eventType, filename) => {
        if (filename) {
          console.log(`检测到文件变化11222: ${filename}, 事件类型: ${eventType}`)
          const updatedRoutes = generateTree(viewsDir, viewsDir, 1, layout)
          const updatedRouteString = generateRouteString(updatedRoutes, outputPath)
          fs.writeFileSync(outputPath, updatedRouteString, 'utf-8')
        }
      })
    }
  }
}
