import axios from 'axios'

import $store from '@/store'

const defaults = {
  baseURL: null,
  statusCodes: [
    401 // Unauthorized
  ]
}

let isAlreadyFetchingAccessToken = false

let subscribers = []

function onAccessTokenFetched (access_token) {
  subscribers.forEach(callback => callback(access_token))
  subscribers = []
}

function addSubscriber (callback) {
  subscribers.push(callback)
}

async function resetTokenAndReattemptRequest (axiosInstance, error, errorCallback, baseURL) {
  try {
    const { response: errorResponse } = error

    const user = $store.state.auth.currentUser

    const refreshToken = user.refresh_token

    if (!refreshToken) {
      errorCallback()
      return Promise.reject(error)
    }

    const retryOriginalRequest = new Promise(resolve => {
      addSubscriber(access_token => {
        errorResponse.config.headers.Authorization = 'Bearer ' + access_token

        resolve(axiosInstance(errorResponse.config))
      })
    })

    if (!isAlreadyFetchingAccessToken) {
      isAlreadyFetchingAccessToken = true

      const response = await axios({
        method: 'post',
        url: `${baseURL}clients/web/admin/refresh`,
        data: {
          refresh_token: refreshToken
        }
      })

      if (!response.data) {
        errorCallback()
        return Promise.reject(error)
      }

      const newToken = response.data.access_token

      $store.commit('auth/SET_CURRENT_USER_TOKEN', {
        access_token: response.data.access_token,
        expires_in: response.data.expires_in,
        refresh_token: response.data.refresh_token,
        token_type: response.data.token_type,
      })

      isAlreadyFetchingAccessToken = false
      onAccessTokenFetched(newToken)
    }

    return retryOriginalRequest
  } catch (error) {
    errorCallback()
    return Promise.reject(error)
  }
}

function createAuthRefreshMultipleInterceptor (axiosInstance, errorCallback, options = {}) {
  axiosInstance.interceptors.response.use(
    res => res,
    error => {
      const statusCodes = options.hasOwnProperty('statusCodes') && options.statusCodes.length
        ? options.statusCodes
        : defaults.statusCodes

      if (!error.response || (error.response.status && statusCodes.indexOf(+error.response.status) === -1)) {
        return Promise.reject(error)
      }

      const baseURL = options.hasOwnProperty('baseURL') && options.baseURL
        ? options.baseURL
        : defaults.baseURL

      return resetTokenAndReattemptRequest(axiosInstance, error, errorCallback, baseURL)
    }
  )

  return axiosInstance
}

export default createAuthRefreshMultipleInterceptor
