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
        }
      }
    ]
  },
  {
    name: 'user',
    path: '/user',
    component: () => import('@/layouts/base/index.vue'),
    meta: {
      title: 'user'
    },
    children: [
      {
        name: 'user-add',
        path: 'add/:id',
        component: () => import('@/views/user/add/[id].vue'),
        meta: {
          title: 'user_add'
        }
      },
      {
        name: 'user-list',
        path: 'list',
        component: () => import('@/views/user/list/index.vue'),
        meta: {
          title: 'user_list'
        },
        children: [
          {
            name: 'user-list-edit',
            path: 'edit/:id',
            component: () => import('@/views/user/list/edit/[id].vue'),
            meta: {
              title: 'user_list_edit'
            }
          },
          {
            name: 'user-list-show',
            path: 'show',
            component: () => import('@/views/user/list/show/index.vue'),
            meta: {
              title: 'user_list_show'
            }
          }
        ]
      }
    ]
  }
]
