export function isAuthRequired (routeTo) {
  return routeTo.matched.some(route => route.meta.authRequired)
}

export function isLoggedIn (store) {
  return store.getters['auth/loggedIn']
}

export function hasPermission (store, routeTo) {
  let permissionRoles = []
  routeTo.matched.forEach(route => {
    if (route.meta.hasOwnProperty('roles')) {
      permissionRoles = [
        ...route.meta.roles
      ]
    }
  })

  const roles = store.getters['auth/roles']

  if (roles.indexOf('admin') > -1) return true
  if (permissionRoles.length === 0) return true
  return permissionRoles.filter(role => roles.includes(role)).length > 0
}

export function setTransition (routeTo, store) {
  if (routeTo.meta.hasOwnProperty('transition')) {
    store.dispatch('global/setTransition', routeTo.meta.transition)
  } else {
    store.dispatch('global/setTransition')
  }
}

export function cacheViews (routeTo, store) {
  if (routeTo.meta.hasOwnProperty('cacheGroup')) {
    if (
      routeTo.meta.cacheGroup !== store.getters['global/getCacheGroup'] ||
      !routeTo.meta.hasOwnProperty('noCache')
    ) {
      store.dispatch('global/addCachedView', {
        view: routeTo.name,
        group: routeTo.meta.cacheGroup
      })
    }
  } else {
    store.dispatch('global/deleteCachedViews')
  }
}

export function cleanUp (routeTo, routeFrom, store) {
  /**
   * TODO: refactoring - should register/unregister store modules
   */
  let routeFromModule = routeFrom.matched.find(route => {
    return route.meta && route.meta.module
  }) || null

  routeFromModule = routeFromModule ? routeFromModule.meta.module : null

  let routeToModule = routeTo.matched.find(route => {
    return route.meta && route.meta.module
  }) || null

  routeToModule = routeToModule ? routeToModule.meta.module : null

  if (routeFromModule && routeFromModule !== routeToModule) {
    if (routeFromModule) {
      store.dispatch(`${routeFromModule}/clear`)
    }
  }
}

export function redirectToLogin (routeTo, next) {
  next({ name: 'login', query: { redirectFrom: routeTo.fullPath } })
}

export function redirectToDashboard (routeTo, next) {
  next({ name: 'dashboard', query: { redirectFrom: routeTo.fullPath } })
}

export function getSavedState (key) {
  if (window.localStorage.getItem(key) !== undefined) {
    return JSON.parse(window.localStorage.getItem(key))
  }

  return null
}

export function setSavedState (key, data) {
  window.localStorage.setItem(key, JSON.stringify(data))
}

export function getRouteByName (routes = [], name = null) {
  if (!name) return

  let instance = routes.find(route => {
    return route.name === name
  })

  if (instance.hasOwnProperty('redirect')) {
    instance = getRouteByName(instance.children, instance.redirect.name)
  }

  return instance
}

export function getCachedQueryName (route = null) {
  if (!route) return null

  if (route.meta && route.meta.cacheQuery) {
    return route.meta.cacheQuery
  }

  return null
}

export function getDefaultQuery (route = null) {
  if (!route) return {}

  if (route.meta && route.meta.defaultQuery) {
    return route.meta.defaultQuery
  }

  return {}
}

export function getCachedQuery (route) {
  let cachedQueryName = getCachedQueryName(route)
  let defaultQuery = getDefaultQuery(route)
  let cachedQuery = getSavedState(cachedQueryName)

  cachedQuery = cachedQuery || defaultQuery

  return cachedQuery
}

export default {
  getRouteByName,
  getCachedQuery,
}