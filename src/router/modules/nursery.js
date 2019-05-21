import AdminLayout from '@/layouts/Admin'

import { defaultQuery } from '@/modules/nursery/datatable'

const router = {
  path: '/nurseries',
  name: 'nurseries',
  component: AdminLayout,
  redirect: { name: 'nursery-table' },
  meta: {
    authRequired: true,
    module: 'nursery',
  },
  children: [
    {
      path: 'create',
      name: 'nursery-create',
      component: () => import(/* webpackChunkName: "module-nursery" */ '@/views/nursery/Create'),
      meta: {
        cacheGroup: 'nursery',
        noCache: true,
        transition: 'fade-transform-x-reverse',
      },
      props: true
    },
    {
      path: 'overview/:id',
      name: 'nursery-overview',
      component: () => import(/* webpackChunkName: "module-nursery" */ '@/views/nursery/Overview'),
      meta: {
        cacheGroup: 'nursery',
        noCache: true,
        transition: 'fade-transform-x-reverse',
      },
      props: true
    },
    {
      path: 'table',
      name: 'nursery-table',
      component: () => import(/* webpackChunkName: "module-nursery" */ '@/views/nursery/Table'),
      meta: {
        cacheGroup: 'nursery',
        cacheQuery: 'nursery.table:query',
        defaultQuery,
      },
      props: true
    },
  ]
}

export default router