import AdminLayout from '@/layouts/Admin'

const router = {
  path: '/field-coordinator',
  name: 'field-coordinators',
  component: AdminLayout,
  redirect: { name: 'field-coordinator-table' },
  meta: {
    authRequired: true,
    module: 'fieldCoordinator',
  },
  children: [
    {
      path: 'table',
      name: 'field-coordinator-table',
      component: () => import(/* webpackChunkName: "module-field-coordinator" */ '@/views/field-coordinator/Table'),
      meta: {
        cacheGroup: 'field-coordinator'
      },
      props: true
    },
  ]
}

export default router