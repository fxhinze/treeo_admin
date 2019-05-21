import AdminLayout from '@/layouts/Admin'

const router = {
  path: '/species',
  name: 'species',
  component: AdminLayout,
  redirect: { name: 'species-table' },
  meta: {
    authRequired: true,
    module: 'species',
  },
  children: [
    {
      path: 'table',
      name: 'species-table',
      component: () => import(/* webpackChunkName: "module-species" */ '@/views/species/Table'),
      meta: {
        authRequired: true,
        cacheGroup: 'species'
      },
      props: true
    },
  ]
}

export default router