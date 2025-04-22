// vite-plugin-git-version.ts
import { writeFileSync } from 'fs'
import { execSync } from 'child_process'
import { PluginOption } from 'vite'

export interface GitVersionPluginOptions {
  fileName?: string
  versionPrefix?: string
  includeBuildTime?: boolean
  useShortTimestamp?: boolean
}

export function timestampVersionPlugin(options?: GitVersionPluginOptions): PluginOption {
  const {
    fileName = 'version.json',
    versionPrefix = 'v',
    includeBuildTime = true,
    useShortTimestamp = false,
  } = options || {}

  return {
    name: 'vite-plugin-git-version',
    apply: 'build',
    enforce: 'post',
    async closeBundle() {
      try {
        // 1. 生成版本信息
        const timestamp = Date.now()
        const version = `${versionPrefix}${useShortTimestamp ? Math.floor(timestamp / 1000) : timestamp}`

        const versionInfo: Record<string, any> = { version }
        if (includeBuildTime) {
          versionInfo.buildTime = new Date().toISOString()
          versionInfo.buildTimestamp = timestamp
        }

        const outputPath = `${process.cwd()}/public/${fileName}`
        writeFileSync(outputPath, JSON.stringify(versionInfo, null, 2))
        console.log(`Version file generated: ${outputPath}`)

        // 2. 执行 Git 操作
        try {
          // 检查是否在 Git 仓库中
          execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' })

          // 添加版本文件
          execSync(`git add ${outputPath}`)

          // 提交更改
          execSync(`git commit -m "feat:version${version}"`)

          console.log('Version file committed to Git successfully')
        } catch (error) {
          console.warn('Git operations skipped:', error)
        }
      } catch (error) {
        console.error('Failed to generate and commit version file:', error)
      }
    },
  }
}
