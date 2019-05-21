import AdminLayout from '@/layouts/Admin'

import { defaultQuery } from '@/modules/farmer/datatable'

const router = {
  path: '/farmers',
  name: 'farmers',
  component: AdminLayout,
  redirect: { name: 'farmer-table' },
  meta: {
    authRequired: true,
    module: 'farmer',
  },
  children: [
    {
      path: 'create',
      name: 'farmer-create',
      component: () => import(/* webpackChunkName: "module-farmer" */ '@/views/farmer/Create'),
      meta: {
        cacheGroup: 'farmer',
        noCache: true,
        transition: 'fade-transform-x-reverse',
      },
      props: true
    },
    {
      path: 'register',
      name: 'farmer-register',
      component: () => import(/* webpackChunkName: "module-farmer" */ '@/views/farmer/Register'),
      meta: {
        cacheGroup: 'farmer',
        noCache: true,
        // transition: 'fade-transform-x-reverse',
      },
      props: true
    },
    {
      path: 'overview/:id',
      name: 'farmer-overview',
      component: () => import(/* webpackChunkName: "module-farmer" */ '@/views/farmer/Overview'),
      meta: {
        cacheGroup: 'farmer',
        noCache: true,
        transition: 'fade-transform-x-reverse',
      },
      props: true
    },
    {
      path: 'table',
      name: 'farmer-table',
      component: () => import(/* webpackChunkName: "module-farmer" */ '@/views/farmer/Table'),
      meta: {
        cacheGroup: 'farmer',
        cacheQuery: 'farmer.table:query',
        defaultQuery,
      },
      props: true
    },
  ]
}

export default router