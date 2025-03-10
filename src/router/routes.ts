// 此文件由vite-plugin-routes自动生成，手动修改componet、meta的值不会被覆盖，其他请勿手动修改

import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    name: 'home',
    path: '/home',
    component: () => import('@/layouts/base/index.vue'),
    meta: {
      title: 'home',
      auths: ['admin']
    },
    children: [
      {
        name: 'home-index',
        path: '',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: 'home'
        },
      }
    ]
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/layouts/blank/index.vue'),
    meta: {
      title: 'login',
      constant: true
    },
    children: [
      {
        name: 'login-index',
        path: '',
        component: () => import('@/views/login/index.vue'),
        meta: {
          title: 'login'
        },
      }
    ]
  }
]
