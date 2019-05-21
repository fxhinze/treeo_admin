import AdminLayout from '@/layouts/Admin'

const router = {
  path: '/villages',
  name: 'villages',
  component: AdminLayout,
  redirect: { name: 'village-table' },
  meta: {
    authRequired: true,
    module: 'village',
  },
  children: [
    {
      path: 'table',
      name: 'village-table',
      component: () => import(/* webpackChunkName: "module-village" */ '@/views/village/Table'),
      meta: {
        cacheGroup: 'village'
      },
      props: true
    },
  ]
}

export default router