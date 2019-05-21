import AdminLayout from '@/layouts/Admin'

import { defaultQuery } from '@/modules/hotspot/datatable'

const router = {
  path: '/hotspots',
  name: 'hotspots',
  component: AdminLayout,
  redirect: { name: 'hotspot-table' },
  meta: {
    authRequired: true,
    module: 'hotspot',
  },
  children: [
    {
      path: 'create',
      name: 'hotspot-create',
      component: () => import(/* webpackChunkName: "module-hotspot" */ '@/views/hotspot/Create'),
      meta: {
        cacheGroup: 'hotspot',
        noCache: true,
        transition: 'fade-transform-x-reverse',
      },
      props: true
    },
    {
      path: 'overview/:id',
      name: 'hotspot-overview',
      component: () => import(/* webpackChunkName: "module-hotspot" */ '@/views/hotspot/Overview'),
      meta: {
        cacheGroup: 'hotspot',
        noCache: true,
        transition: 'fade-transform-x-reverse',
      },
      props: true
    },
    {
      path: 'table',
      name: 'hotspot-table',
      component: () => import(/* webpackChunkName: "module-hotspot" */ '@/views/hotspot/Table'),
      meta: {
        cacheGroup: 'hotspot',
        cacheQuery: 'hotspot.table:query',
        defaultQuery,
      },
      props: true
    },
  ]
}

export default router