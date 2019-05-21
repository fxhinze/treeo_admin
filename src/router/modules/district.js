import AdminLayout from '@/layouts/Admin'

const router = {
  path: '/districts',
  name: 'districts',
  component: AdminLayout,
  redirect: { name: 'district-table' },
  meta: {
    authRequired: true,
    module: 'district',
  },
  children: [
    {
      path: 'table',
      name: 'district-table',
      component: () => import(/* webpackChunkName: "module-district" */ '@/views/district/Table'),
      meta: {
        cacheGroup: 'district',
      },
      props: true
    },
  ]
}

export default router