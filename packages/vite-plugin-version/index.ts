// vite-plugin-timestamp-version.ts
import { writeFileSync } from 'node:fs'
import { PluginOption } from 'vite'

export interface TimestampVersionPluginOptions {
  fileName?: string // 输出文件名，默认 'version.json'
  versionPrefix?: string // 版本号前缀，默认 'v'
  includeBuildTime?: boolean // 是否包含构建时间，默认 true
  useShortTimestamp?: boolean // 是否使用短时间戳(10位)，默认 false(13位)
}

export function timestampVersionPlugin(options?: TimestampVersionPluginOptions): PluginOption {
  const {
    fileName = 'version.json',
    versionPrefix = 'v',
    includeBuildTime = true,
    useShortTimestamp = false,
  } = options || {}

  return {
    name: 'vite-plugin-timestamp-version',
    apply: 'build',
    enforce: 'post',
    closeBundle() {
      try {
        // 生成时间戳版本号
        const timestamp = Date.now()
        const version = `${versionPrefix}${useShortTimestamp ? Math.floor(timestamp / 1000) : timestamp}`

        // 准备版本信息
        const versionInfo: Record<string, any> = { version }
        if (includeBuildTime) {
          versionInfo.buildTime = new Date().toISOString()
          versionInfo.buildTimestamp = timestamp
        }

        // 写入文件
        const outputPath = `${process.cwd()}/public/${fileName}`
        writeFileSync(outputPath, JSON.stringify(versionInfo, null, 2))

        console.log(`Version file generated: ${outputPath}`)
        console.log(`Generated version: ${version}`)
      } catch (error) {
        console.error('Failed to generate version file:', error)
      }
    },
  }
}
