import { RouteMeta } from 'vue-router'
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

export interface TreeNode {
  name: string
  path: string
  component: string
  children?: TreeNode[]
  meta: RouteMeta
  level: number
}
