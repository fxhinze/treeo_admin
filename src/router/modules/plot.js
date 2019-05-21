import AdminLayout from '@/layouts/Admin'

import { defaultQuery } from '@/modules/plot/datatable'

const router = {
  path: '/plots',
  name: 'plots',
  component: AdminLayout,
  redirect: { name: 'plot-table' },
  meta: {
    authRequired: true,
    module: 'plot',
  },
  children: [
    {
      path: 'create',
      name: 'plot-create',
      component: () => import(/* webpackChunkName: "module-plot" */ '@/views/plot/Create'),
      meta: {
        cacheGroup: 'plot',
        noCache: true,
        transition: 'fade-transform-x-reverse',
      },
      props: true
    },
    {
      path: 'overview/:id',
      name: 'plot-overview',
      component: () => import(/* webpackChunkName: "module-plot" */ '@/views/plot/Overview'),
      meta: {
        cacheGroup: 'plot',
        noCache: true,
        transition: 'fade-transform-x-reverse',
      },
      props: true
    },
    {
      path: 'table',
      name: 'plot-table',
      component: () => import(/* webpackChunkName: "module-plot" */ '@/views/plot/Table'),
      meta: {
        cacheGroup: 'plot',
        cacheQuery: 'plot.table:query',
        defaultQuery,
      },
      props: true,
    },
  ]
}

export default router