// 此文件由vite-plugin-routes自动生成，手动修改componet、meta的值不会被覆盖，其他请勿手动修改

import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    name: 'a&b',
    path: '/a&b',
    component: () => import('@/layouts/base/index.vue'),
    meta: {
      title: 'a&b'
    },
    children: [
      {
        name: 'a&b-index',
        path: '',
        component: () => import('@/views/a&b/index.vue'),
        meta: {
          title: 'a&b'
        },
      }
    ]
  },
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
  },
  {
    name: 'setting',
    path: '/setting',
    component: () => import('@/layouts/base/index.vue'),
    meta: {
      title: 'setting'
    },
    children: [
      {
        name: 'setting-c',
        path: 'c',
        component: () => import('@/layouts/base/index.vue'),
        meta: {
          title: 'setting_c'
        },
        children: [
          {
            name: 'setting-c-a[id]&b&h[id]',
            path: 'a[id]&b&h[id]',
            component: () => import('@/views/setting/c/a[id]&b&h[id]/index.vue'),
            meta: {
              title: 'setting_c_a[id]&b&h[id]'
            },
          },
          {
            name: 'setting-c-q[id]&j[code]',
            path: 'q[id]&j[code]',
            component: () => import('@/views/setting/c/q[id]&j[code]/index.vue'),
            meta: {
              title: 'setting_c_q[id]&j[code]'
            },
          },
          {
            name: 'setting-c-r&y[query]',
            path: 'r&y[query]',
            component: () => import('@/views/setting/c/r&y[query]/index.vue'),
            meta: {
              title: 'setting_c_r&y[query]'
            },
          }
        ]
      },
      {
        name: 'setting-menu',
        path: 'menu',
        component: () => import('@/views/setting/menu/index.vue'),
        meta: {
          title: 'setting_menu'
        },
      },
      {
        name: 'setting-role',
        path: 'role',
        component: () => import('@/views/setting/role/config/[id].vue'),
        meta: {
              title: 'setting_role_config'
            },
        children: [
          {
            name: 'setting-role-config',
            path: 'config/:id',
            component: () => import('@/views/setting/role/config/[id].vue'),
            meta: {
              title: 'setting_role_config'
            },
          },
          {
            name: 'setting-role-config[id]',
            path: 'config[id]',
            component: () => import('@/views/setting/role/config[id]/index.vue'),
            meta: {
              title: 'setting_role_config[id]'
            },
          },
          {
            name: 'setting-role-list',
            path: 'list',
            component: () => import('@/views/setting/role/list/index.vue'),
            meta: {
              title: 'setting_role_list'
            },
          }
        ]
      },
      {
        name: 'setting-user',
        path: 'user',
        component: () => import('@/views/setting/user/index.vue'),
        meta: {
          title: 'setting_user'
        },
      }
    ]
  }
]
