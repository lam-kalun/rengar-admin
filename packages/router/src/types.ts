export interface Layout {
  base: string
  blank: string
  [key: string]: string
}

export interface Option {
  entry: string
  output: string
  layout: Layout
}

interface RouteMeta {
  title: string
}
// 定义树节点类型

export interface TreeNode {
  name: string
  path: string
  component: string
  children?: TreeNode[]
  meta: RouteMeta
  level: number
}
