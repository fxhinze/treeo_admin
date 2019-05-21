import Vue from 'vue'
import Router from 'vue-router'

import store from '@/store'
import routes from './routes'

import {
  isAuthRequired,
  isLoggedIn,
  hasPermission,
  setTransition,
  cacheViews,
  cleanUp,
  redirectToLogin,
  redirectToDashboard,
} from './helpers'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  // scrollBehavior: () => ({ y: 0 }),
  base: process.env.BASE_URL,
  routes: routes
})

router.beforeEach(async (routeTo, routeFrom, next) => {
  if (routeFrom.name !== null) {
    // NProgress.start()
  } else {
    // console.log('loading aplication...')
  }

  if (!isAuthRequired(routeTo)) {
    if (!routeFrom.name) {
      await store.dispatch('auth/validate')
    }

    return next()
  }

  // is auth required
  if (isLoggedIn(store)) {
    if (!routeFrom.name) {
      const validUser = await store.dispatch('auth/validate')

      if (!validUser) {
        redirectToLogin(routeTo, next)
      }
    }

    if (!hasPermission(store, routeTo)) {
      redirectToDashboard(routeTo, next)
    }

    setTransition(routeTo, store)
    cacheViews(routeTo, store)
    cleanUp(routeTo, routeFrom, store)

    next()
  } else {
    redirectToLogin(routeTo, next)
  }
})

router.beforeResolve(async (routeTo, routeFrom, next) => {
  try {
    for (const route of routeTo.matched) {
      await new Promise((resolve, reject) => {
        if (route.meta && route.meta.beforeResolve) {
          route.meta.beforeResolve(routeTo, routeFrom, (...args) => {
            if (args.length) {
              next(...args)
              reject(new Error('Redirected'))
            } else {
              resolve()
            }
          })
        } else {
          resolve()
        }
      })
    }
  } catch (error) {
    return
  }

  next()
})

router.afterEach((routeTo, routeFrom) => {
  if (routeFrom.name !== null) {
    // NProgress.start()
  } else {
    // console.log('loading done...')
  }

  for (const route of routeFrom.matched) {
    if (route.meta && route.meta.afterResolve) {
      route.meta.afterResolve()
    }
  }

  // NProgress.done()
})

export default router