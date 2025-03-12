// 此文件由vite-plugin-routes自动生成，请勿手动修改

import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    name: 'a',
    path: '/a',
    component: () => import('@/layouts/base/index.vue'),
    meta: {
      title: 'a'
    },
    children: [
      {
        path: '',
        component: () => import('@/views/a&b/index.vue'),
        meta: {
          title: 'a'
        },
      }
    ]
  },
  {
    name: 'b',
    path: '/b',
    component: () => import('@/layouts/base/index.vue'),
    meta: {
      title: 'b'
    },
    children: [
      {
        path: '',
        component: () => import('@/views/a&b/index.vue'),
        meta: {
          title: 'b'
        },
      }
    ]
  },
  {
    name: 'home',
    path: '/home',
    component: () => import('@/layouts/base/index.vue'),
    meta: {
      title: 'home'
    },
    children: [
      {
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
    component: () => import('@/layouts/base/index.vue'),
    meta: {
      title: 'login'
    },
    children: [
      {
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
        path: 'c',
        meta: {
          title: 'setting_c'
        },
        children: [
          {
            name: 'setting-c-a',
            path: 'a/:id',
            component: () => import('@/views/setting/c/a[id]&b&h[id]/index.vue'),
            meta: {
              title: 'setting_c_a'
            },
          },
          {
            name: 'setting-c-b',
            path: 'b',
            component: () => import('@/views/setting/c/a[id]&b&h[id]/index.vue'),
            meta: {
              title: 'setting_c_b'
            },
          },
          {
            name: 'setting-c-h',
            path: 'h/:id',
            component: () => import('@/views/setting/c/a[id]&b&h[id]/index.vue'),
            meta: {
              title: 'setting_c_h'
            },
          },
          {
            name: 'setting-c-q',
            path: 'q/:id',
            component: () => import('@/views/setting/c/q[id]&j[code]/index.vue'),
            meta: {
              title: 'setting_c_q'
            },
          },
          {
            name: 'setting-c-j',
            path: 'j/:code',
            component: () => import('@/views/setting/c/q[id]&j[code]/index.vue'),
            meta: {
              title: 'setting_c_j'
            },
          },
          {
            name: 'setting-c-r',
            path: 'r',
            component: () => import('@/views/setting/c/r&y[query]/index.vue'),
            meta: {
              title: 'setting_c_r'
            },
          },
          {
            name: 'setting-c-y',
            path: 'y/:query',
            component: () => import('@/views/setting/c/r&y[query]/index.vue'),
            meta: {
              title: 'setting_c_y'
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
        path: 'role',
        meta: {
          title: 'setting_role'
        },
        children: [
          {
            name: 'setting-role-config',
            path: 'config/:id',
            component: () => import('@/views/setting/role/config[id]/index.vue'),
            meta: {
              title: 'setting_role_config'
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
