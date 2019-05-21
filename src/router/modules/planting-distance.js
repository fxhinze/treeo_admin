import AdminLayout from '@/layouts/Admin'

const router = {
  path: '/planting-distance',
  name: 'planting-distances',
  component: AdminLayout,
  redirect: { name: 'planting-distance-table' },
  meta: {
    authRequired: true,
    module: 'plantingDistance',
  },
  children: [
    {
      path: 'table',
      name: 'planting-distance-table',
      component: () => import(/* webpackChunkName: "module-planting-distance" */ '@/views/planting-distance/Table'),
      meta: {
        cacheGroup: 'planting-distance'
      },
      props: true
    },
  ]
}

export default router