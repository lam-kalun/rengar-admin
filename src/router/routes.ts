export const routes = [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
    meta: { title: 'home' }
  },
  {
    path: '/user',
    name: 'user',
    component: undefined,
    meta: { title: 'user' }
  }
]
