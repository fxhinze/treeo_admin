import AdminLayout from '@/layouts/Admin'

import { defaultQuery } from '@/modules/tree/datatable'

const router = {
  path: '/trees',
  name: 'trees',
  component: AdminLayout,
  redirect: { name: 'tree-table' },
  meta: {
    authRequired: true,
    module: 'tree',
  },
  children: [
    {
      path: 'create',
      name: 'tree-create',
      component: () => import(/* webpackChunkName: "module-tree" */ '@/views/tree/Create'),
      meta: {
        cacheGroup: 'tree',
        noCache: true,
        transition: 'fade-transform-x-reverse',
      },
      props: true
    },
    {
      path: 'overview/:id',
      name: 'tree-overview',
      component: () => import(/* webpackChunkName: "module-tree" */ '@/views/tree/Overview'),
      meta: {
        cacheGroup: 'tree',
        noCache: true,
        transition: 'fade-transform-x-reverse',
      },
      props: true
    },
    {
      path: 'table',
      name: 'tree-table',
      component: () => import(/* webpackChunkName: "module-tree" */ '@/views/tree/Table'),
      meta: {
        cacheGroup: 'tree',
        cacheQuery: 'tree.table:query',
        defaultQuery,
      },
      props: true
    },
  ]
}

export default router