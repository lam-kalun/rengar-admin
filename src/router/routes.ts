// 此文件由vite-plugin-routes自动生成，手动修改的地方受限
// 假如你想用其他的layout，你可以手动修改一级路由的component属性，不会覆盖
// 修改所有路由的meta值、新增rediect属性不会覆盖
import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    name: '404',
    path: '/404',
    component: () => import('@/layouts/base/index.vue'),
    meta: {
      title: '404',
      hideMenu: true,
    },
    children: [
      {
        name: '404-index',
        path: '',
        component: () => import('@/views/404/index.vue'),
        meta: {
          title: '404',
        },
      },
    ],
  },
  {
    name: 'home',
    path: '/home',
    component: () => import('@/layouts/base/index.vue'),
    meta: {
      title: 'home',
    },
    children: [
      {
        name: 'home-index',
        path: '',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
        },
      },
    ],
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/layouts/blank/index.vue'),
    meta: {
      title: '登录',
    },
    children: [
      {
        name: 'login-index',
        path: '',
        component: () => import('@/views/login/index.vue'),
        meta: {
          title: 'login',
        },
      },
    ],
  },
  {
    name: 'setting',
    path: '/setting',
    component: () => import('@/layouts/base/index.vue'),
    meta: {
      title: '系统设置',
    },
    children: [
      {
        name: 'setting-menu',
        path: 'menu',
        component: () => import('@/views/setting/menu/index.vue'),
        meta: {
          title: '菜单管理',
        },
      },
      {
        name: 'setting-role',
        path: 'role',
        redirect: '/setting/role/list',
        meta: {
          title: '角色管理',
        },
        children: [
          {
            name: 'setting-role-config',
            path: 'config/:id',
            component: () => import('@/views/setting/role/config/[id].vue'),
            meta: {
              title: '角色配置',
            },
          },
          {
            name: 'setting-role-list',
            path: 'list',
            component: () => import('@/views/setting/role/list/index.vue'),
            meta: {
              title: '角色列表',
            },
          },
        ],
      },
      {
        name: 'setting-user',
        path: 'user',
        component: () => import('@/views/setting/user/index.vue'),
        meta: {
          title: '用户管理',
        },
      },
    ],
  },
]
