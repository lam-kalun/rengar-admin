// vite-plugin-git-version.ts
import { writeFileSync } from 'fs'
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
      } catch (error) {
        console.error('Failed to generate and commit version file:', error)
      }
    },
  }
}
