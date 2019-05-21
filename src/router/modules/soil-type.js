import AdminLayout from '@/layouts/Admin'

const router = {
  path: '/soil-type',
  name: 'soil-types',
  component: AdminLayout,
  redirect: { name: 'soil-type-table' },
  meta: {
    authRequired: true,
    module: 'soilType',
  },
  children: [
    {
      path: 'table',
      name: 'soil-type-table',
      component: () => import(/* webpackChunkName: "module-soil-type" */ '@/views/soil-type/Table'),
      meta: {
        cacheGroup: 'soil-type'
      },
      props: true
    },
  ]
}

export default router