import AdminLayout from '@/layouts/Admin'

const router = {
  path: '/survey-status',
  name: 'survey-status',
  component: AdminLayout,
  redirect: { name: 'survey-status-table' },
  meta: {
    authRequired: true,
    module: 'surveyStatus',
  },
  children: [
    {
      path: 'table',
      name: 'survey-status-table',
      component: () => import(/* webpackChunkName: "module-survey-status" */ '@/views/survey-status/Table'),
      meta: {
        cacheGroup: 'survey-status'
      },
      props: true
    },
  ]
}

export default router