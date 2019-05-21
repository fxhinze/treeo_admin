import AdminLayout from '@/layouts/Admin'

const router = {
  path: '/legal-status',
  name: 'legal-status',
  component: AdminLayout,
  redirect: { name: 'legal-status-table' },
  meta: {
    authRequired: true,
    module: 'legalStatus',
  },
  children: [
    {
      path: 'table',
      name: 'legal-status-table',
      component: () => import(/* webpackChunkName: "module-legal-status" */ '@/views/legal-status/Table'),
      meta: {
        cacheGroup: 'legal-status'
      },
      props: true
    },
  ]
}

export default router