import AdminLayout from '@/layouts/Admin'

const router = {
  path: '/projects',
  name: 'projects',
  component: AdminLayout,
  redirect: { name: 'project-table' },
  meta: {
    authRequired: true,
    module: 'project',
  },
  children: [
    {
      path: 'table',
      name: 'project-table',
      component: () => import(/* webpackChunkName: "module-project" */ '@/views/project/Table'),
      meta: {
        cacheGroup: 'project'
      },
      props: true
    },
  ]
}

export default router