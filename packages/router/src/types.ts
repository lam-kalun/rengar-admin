export interface Option {
  entry: string
  output: string
}

// 定义树节点类型
export interface TreeNode {
  name: string // 文件或文件夹名称
  type: 'file' | 'directory' // 类型：文件或文件夹
  path: string // 相对路径
  children?: TreeNode[]
  parent: string
  component: string
}
