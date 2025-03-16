// 此文件由vite-plugin-routes自动生成，手动修改的地方受限
// 假如你想用其他的layout，你可以手动修改一级路由的component属性，不会覆盖
// 修改所有路由的meta值、新增rediect属性不会覆盖
import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    name: '404',
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: '404',
      hideInMenu: true,
    },
  },
  {
    name: 'home',
    path: '/home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '首页',
    },
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
      layout: 'blank',
      hideInMenu: true,
    },
  },
  {
    name: 'setting',
    path: '/setting',
    meta: {
      title: '系统设置',
      roles: ['menu001'],
    },
    children: [
      {
        name: 'setting-menu',
        path: 'menu',
        component: () => import('@/views/setting/menu/index.vue'),
        meta: {
          title: '菜单设置',
          roles: ['menu002'],
        },
      },
      {
        name: 'setting-role',
        path: 'role',
        redirect: '/setting/role/list',
        meta: {
          title: '角色设置',
          roles: ['menu003'],
        },
        children: [
          {
            name: 'setting-role-config',
            path: 'config/:id',
            component: () => import('@/views/setting/role/config/[id].vue'),
            meta: {
              title: '角色配置',
              roles: ['menu004'],
            },
          },
          {
            name: 'setting-role-list',
            path: 'list',
            component: () => import('@/views/setting/role/list/index.vue'),
            meta: {
              title: '角色列表',
              roles: ['menu005'],
            },
          },
        ],
      },
      {
        name: 'setting-user',
        path: 'user',
        component: () => import('@/views/setting/user/index.vue'),
        meta: {
          title: 'setting_user',
          roles: ['menu006'],
        },
      },
    ],
  },
]
