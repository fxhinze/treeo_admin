import $store from '@/store'

function createAuthInterceptor (axios) {
  axios.interceptors.request.use(
    config => {
      config.headers.Accept = 'application/json, text/plain, */*'

      const user = $store.state.auth.currentUser
      config.headers.common.Authorization = user && user.token_type && user.access_token
        ? user.token_type + ' ' + user.access_token
        : ''

      return config
    },
    error => {
      return Promise.reject(error)
    }
  )
  return axios
}

export default createAuthInterceptor
