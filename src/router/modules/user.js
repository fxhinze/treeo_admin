import AdminLayout from '@/layouts/Admin'

import { defaultQuery } from '@/modules/user/datatable'

const router = {
  path: '/users',
  name: 'users',
  component: AdminLayout,
  redirect: { name: 'user-table' },
  meta: {
    authRequired: true,
    module: 'user',
    roles: ['admin'],
  },
  children: [
    {
      path: 'create',
      name: 'user-create',
      component: () => import(/* webpackChunkName: "module-user" */ '@/views/user/Create'),
      meta: {
        cacheGroup: 'user',
        noCache: true,
        transition: 'fade-transform-x-reverse',
      },
      props: true
    },
    {
      path: 'overview/:id',
      name: 'user-overview',
      component: () => import(/* webpackChunkName: "module-user" */ '@/views/user/Overview'),
      meta: {
        cacheGroup: 'user',
        noCache: true,
        transition: 'fade-transform-x-reverse',
      },
      props: true
    },
    {
      path: 'table',
      name: 'user-table',
      component: () => import(/* webpackChunkName: "module-user" */ '@/views/user/Table'),
      meta: {
        cacheGroup: 'user',
        cacheQuery: 'user.table:query',
        defaultQuery,
      },
      props: true
    },
  ]
}

export default router