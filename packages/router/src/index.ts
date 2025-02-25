import fs from 'fs'
import path from 'path'
import type { Plugin } from 'vite'
import type { Option } from './types'

export function vitePluginRoutes(option: Option): Plugin {
  const { entry } = option
  const root = process.cwd()
  const viewsDir = path.resolve(root, entry)
  // const outputFile = path.resolve(root, output)

  return {
    name: 'vite-plugin-routes',
    buildStart() {
      const fileList = readDirectory(viewsDir, viewsDir)
      console.dir(buildTree(fileList), { depth: null })
    }
  }
}

function readDirectory(dir: string, baseDir: string) {
  const paths: string[] = []
  const files = fs.readdirSync(dir)
  for (const file of files) {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    if (stat.isDirectory() && !file.startsWith('_')) {
      paths.push(...readDirectory(filePath, baseDir))
    } else if (stat.isFile() && (file === 'index.vue' || /\[.*\]\.vue/.test(file))) {
      paths.push(path.relative(baseDir, filePath).replace(/\\/g, '/'))
    }
  }
  return paths
}

type TreeNode = {
  name: string
  path: string
  children: TreeNode[]
}

function buildTree(paths: string[]): TreeNode[] {
  const root: TreeNode = { name: '', path: '', children: [] }

  paths.forEach((path) => {
    const parts = path.split('/')
    let currentNode = root

    parts.forEach((part, index) => {
      const currentPath = parts.slice(0, index + 1).join('/')
      let childNode = currentNode.children.find((child) => child.name === part)

      if (!childNode) {
        childNode = { name: part, path: currentPath, children: [] }
        currentNode.children.push(childNode)
      }

      currentNode = childNode
    })
  })

  return root.children
}
