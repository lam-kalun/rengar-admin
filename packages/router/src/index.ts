import fs from 'fs'
import path from 'path'
import { generateRouteString, generateTree, collectRouteNames, generateRouteTypes, createFileWatcher } from './utils'
import { debounce } from 'es-toolkit'

import type { Plugin } from 'vite'
import type { Option } from './types'
export function vitePluginRoutes(option: Option): Plugin {
  const { entry, output, layout, typeDir } = option
  const root = process.cwd()
  const viewsDir = path.resolve(root, entry)
  const outputPath = path.resolve(root, output)
  const typesDir = path.resolve(root, typeDir)
  let watcher: fs.FSWatcher | null = null

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
      const handleFileChange = debounce((eventType: fs.WatchEventType, filename: string | null) => {
        if (filename) {
          console.log(`检测到文件变化: ${filename}, 事件类型: ${eventType}`)
          const updatedRoutes = generateTree(viewsDir, viewsDir, 1, layout)
          const updatedRouteString = generateRouteString(updatedRoutes, outputPath)
          fs.writeFileSync(outputPath, updatedRouteString, 'utf-8')

          // 更新路由类型定义
          const updatedRouteNames = collectRouteNames(updatedRoutes)
          const updatedTypeContent = generateRouteTypes(updatedRouteNames)
          fs.writeFileSync(typesDir, updatedTypeContent, 'utf-8')
        }
      }, 300)

      watcher = createFileWatcher(viewsDir, handleFileChange)
    },
    closeBundle() {
      // 关闭文件监听器
      if (watcher) {
        watcher.close()
        watcher = null
      }
    }
  }
}
