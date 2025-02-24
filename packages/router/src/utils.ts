import fs from 'fs'
import path from 'path'
export function getFiles(dir: string): string[] {
  const files = fs.readdirSync(dir)
  return files.flatMap((file) => {
    const filePath = path.join(dir, file)
    if (fs.statSync(filePath).isDirectory()) {
      return getFiles(filePath) // 递归处理子目录
    } else {
      return filePath // 返回文件路径
    }
  })
}
