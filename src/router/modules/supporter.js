import AdminLayout from '@/layouts/Admin'

import { defaultQuery } from '@/modules/supporter/datatable'

const router = {
  path: '/supporters',
  name: 'supporters',
  component: AdminLayout,
  redirect: { name: 'supporter-table' },
  meta: {
    authRequired: true,
    module: 'supporter',
  },
  children: [
    {
      path: 'create',
      name: 'supporter-create',
      component: () => import(/* webpackChunkName: "module-supporter" */ '@/views/supporter/Create'),
      meta: {
        cacheGroup: 'supporter',
        noCache: true,
        transition: 'fade-transform-x-reverse',
      },
      props: true
    },
    {
      path: 'overview/:id',
      name: 'supporter-overview',
      component: () => import(/* webpackChunkName: "module-supporter" */ '@/views/supporter/Overview'),
      meta: {
        cacheGroup: 'supporter',
        noCache: true,
        transition: 'fade-transform-x-reverse',
      },
      props: true
    },
    {
      path: 'table',
      name: 'supporter-table',
      component: () => import(/* webpackChunkName: "module-supporter" */ '@/views/supporter/Table'),
      meta: {
        cacheGroup: 'supporter',
        cacheQuery: 'supporter.table:query',
        defaultQuery,
      },
      props: true
    },
  ]
}

export default router