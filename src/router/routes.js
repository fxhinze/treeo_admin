import store from '@/store'

import BaseLayout from '@/layouts/Base'
import AdminLayout from '@/layouts/Admin'

import HomeComponent from '@/views/Home'
import LoginComponent from '@/views/Login'
import LostPasswordComponent from '@/views/LostPassword'
import ResetPasswordComponent from '@/views/ResetPassword'
import Error404Component from '@/views/Error404'

import districtRouter from './modules/district'
import farmerRouter from './modules/farmer'
import hotspotRouter from './modules/hotspot'
import legalStatusRouter from './modules/legal-status'
import nurseryRouter from './modules/nursery'
import plantingDistanceRouter from './modules/planting-distance'
import fieldCoordinatorRouter from './modules/field-coordinator'
import plotRouter from './modules/plot'
import projectRouter from './modules/project'
import soilTypeRouter from './modules/soil-type'
import speciesRouter from './modules/species'
import supporterRouter from './modules/supporter'
import surveyStatusRouter from './modules/survey-status'
import surveyRouter from './modules/survey'
import treeRouter from './modules/tree'
import userRouter from './modules/user'
import villageRouter from './modules/village'

export default [
  {
    path: '/',
    component: BaseLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: HomeComponent,
        meta: {
          cacheGroup: 'login'
        }
      },
    ],
  },
  {
    path: '/login',
    component: BaseLayout,
    redirect: { name: 'login' },
    children: [
      {
        path: '',
        name: 'login',
        component: LoginComponent,
        meta: {
          cacheGroup: 'login'
        }
      },
    ],
  },
  {
    path: '/lost-password',
    component: BaseLayout,
    redirect: { name: 'lost-password' },
    children: [
      {
        path: '',
        name: 'lost-password',
        component: LostPasswordComponent,
        meta: {
          cacheGroup: 'lost-password'
        }
      },
    ],
  },
  {
    path: '/reset-password',
    component: BaseLayout,
    redirect: { name: 'reset-password' },
    children: [
      {
        path: '',
        name: 'reset-password',
        component: ResetPasswordComponent,
        meta: {
          cacheGroup: 'reset-password'
        }
      },
    ],
  },
  {
    path: '/logout',
    component: BaseLayout,
    redirect: { name: 'logout' },
    children: [
      {
        path: '',
        name: 'logout',
        meta: {
          authRequired: true,
          async beforeResolve (routeTo, routeFrom, next) {
            await store.dispatch('auth/logOut')

            const authRequiredOnPreviousRoute = routeFrom.matched.some(
              route => route.meta.authRequired
            )

            // Navigate back to previous page, or home as a fallback
            next(authRequiredOnPreviousRoute ? { name: 'home' } : { ...routeFrom })
          }
        }
      }
    ],
  },
  {
    path: '/404',
    component: BaseLayout,
    redirect: { name: 'error404' },
    children: [
      {
        path: '',
        name: 'error404',
        component: Error404Component,
        meta: {
          cacheGroup: 'error404'
        }
      },
    ],
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: AdminLayout,
    redirect: { name: 'dashboard-index' },
    meta: {
      authRequired: true,
    },
    children: [
      {
        path: 'index',
        name: 'dashboard-index',
        component: () => import(/* webpackChunkName: "module-dashboard" */ '@/views/Dashboard'),
        meta: {
          cacheGroup: 'dashboard'
        },
      },
    ]
  },
  {
    path: '/profile',
    name: 'profile',
    component: AdminLayout,
    redirect: { name: 'profile-index' },
    meta: {
      authRequired: true,
    },
    children: [
      {
        path: 'index',
        name: 'profile-index',
        component: () => import(/* webpackChunkName: "module-profile" */ '@/views/Profile'),
        meta: {
          cacheGroup: 'profile'
        },
      },
    ]
  },
  {
    path: '/map',
    name: 'map',
    component: AdminLayout,
    redirect: { name: 'map-index' },
    meta: {
      authRequired: true,
    },
    children: [
      {
        path: 'index',
        name: 'map-index',
        component: () => import(/* webpackChunkName: "module-map" */ '@/views/map/Index'),
        meta: {
          cacheGroup: 'map',
          transition: 'fade'
        },
        props: true
      },
    ]
  },

  districtRouter,
  farmerRouter,
  hotspotRouter,
  legalStatusRouter,
  nurseryRouter,
  plantingDistanceRouter,
  fieldCoordinatorRouter,
  plotRouter,
  projectRouter,
  soilTypeRouter,
  speciesRouter,
  supporterRouter,
  surveyStatusRouter,
  surveyRouter,
  treeRouter,
  userRouter,
  villageRouter,

  {
    path: '*',
    redirect: '404'
  }
]