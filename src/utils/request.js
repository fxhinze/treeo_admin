import axios from 'axios'
import $store from '@/store'
import $router from '@/router'

import createAuthInterceptor from './interceptors/auth'
import createAuthRefreshInterceptor from './interceptors/auth-refresh'

const service = axios.create({
  baseURL: `${process.env.VUE_APP_API_URL}/v1/`,
})

// auth interceptor
createAuthInterceptor(service)

// auth refresh multiple interceptor
createAuthRefreshInterceptor(service,
  response => {
    $store.dispatch('auth/logOut', false)

    $router.push({
      name: 'login',
      query: {
        redirectFrom: $router.currentRoute.fullPath
      }
    })
  }, {
    baseURL: `${process.env.VUE_APP_API_URL}/v1/`,
  }
)

export default service