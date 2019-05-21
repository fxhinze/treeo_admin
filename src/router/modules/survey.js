import AdminLayout from '@/layouts/Admin'

import { defaultQuery } from '@/modules/survey/datatable'

const router = {
  path: '/surveys',
  name: 'surveys',
  component: AdminLayout,
  redirect: { name: 'survey-table' },
  meta: {
    authRequired: true,
    module: 'survey',
  },
  children: [
    {
      path: 'create',
      name: 'survey-create',
      component: () => import(/* webpackChunkName: "module-survey" */ '@/views/survey/Create'),
      meta: {
        cacheGroup: 'survey',
        noCache: true,
        transition: 'fade-transform-x-reverse',
      },
      props: true
    },
    {
      path: 'overview/:id',
      name: 'survey-overview',
      component: () => import(/* webpackChunkName: "module-survey" */ '@/views/survey/Overview'),
      meta: {
        cacheGroup: 'survey',
        noCache: true,
        transition: 'fade-transform-x-reverse',
      },
      props: true
    },
    {
      path: 'table',
      name: 'survey-table',
      component: () => import(/* webpackChunkName: "module-survey" */ '@/views/survey/Table'),
      meta: {
        cacheGroup: 'survey',
        cacheQuery: 'survey.table:query',
        defaultQuery,
      },
      props: true
    },
  ]
}

export default router