import service from '@/utils/request'
import api from '@/api'

import {
  getSavedState,
  saveState,
  clearStates,
  setDefaultAuthHeaders
} from './auth-helpers'

export const namespaced = true

export const getters = {
  loggedIn (state) {
    return !!state.currentUser
  },

  roles (state, getters) {
    return getters.loggedIn && state.currentUser.roles
      ? state.currentUser.roles.map(role => role.name)
      : []
  },

  hasPermission: (state, getters) => roles => {
    return roles.filter(role => getters.roles.includes(role)).length > 0
  },
}

export const state = {
  currentUser: getSavedState('auth.currentUser'),
}

export const mutations = {
  SET_CURRENT_USER (state, newValue) {
    state.currentUser = newValue
    saveState('auth.currentUser', newValue)
    setDefaultAuthHeaders(state.currentUser)
  },

  SET_CURRENT_USER_TOKEN (state, newValue) {
    state.currentUser = {
      ...state.currentUser,
      access_token: newValue.access_token,
      expires_in: newValue.expires_in,
      refresh_token: newValue.refresh_token,
      token_type: newValue.token_type,
    }

    saveState('auth.currentUser', state.currentUser)
    setDefaultAuthHeaders(state.currentUser)
  },

  SET_CURRENT_USER_PROFILE (state, newValue) {
    state.currentUser = {
      ...state.currentUser,
      id: newValue.id,
      name: newValue.name,
      email: newValue.email,
      username: newValue.username,
      roles: newValue.roles.data,
    }

    saveState('auth.currentUser', state.currentUser)
  }
}

export const actions = {
  init ({ state, dispatch }) {
    setDefaultAuthHeaders(state.currentUser)
  },

  logIn ({ commit, dispatch, getters }, { email, password } = {}) {
    return new Promise(async (resolve, reject) => {
      if (getters.loggedIn) {
        dispatch('validate')
          .then(response => resolve(response))
          .catch(error => reject(error))
      } else {
        try {
          const responseLogin = await api.auth.login({ email, password })
          commit('SET_CURRENT_USER_TOKEN', responseLogin.data)

          const responseProfile = await api.auth.getProfile()
          commit('SET_CURRENT_USER_PROFILE', responseProfile.data.data)
        } catch (error) {
          return reject(error)
        }

        return resolve()
      }
    })
  },

  async logOut ({ commit }, logout = true) {
    try {
      if (logout) {
        const response = await api.auth.logout()

        commit('SET_CURRENT_USER', null)

        clearStates()

        return Promise.resolve(response)
      } else {
        commit('SET_CURRENT_USER', null)

        clearStates()
      }
    } catch (error) {
      return error
    }
  },

  validate ({ commit, state }) {
    if (!state.currentUser) return Promise.resolve(null)

    return api.auth.getProfile()
      .then(response => {
        const user = response.data.data
        commit('SET_CURRENT_USER_PROFILE', user)
        return user
      })
  },

  updateProfile ({ commit }, payload) {
    return api.auth.updateProfile(payload)
      .then(response => {
        commit('SET_CURRENT_USER_PROFILE', response)
      })
  },
}

export default {
  namespaced,
  getters,
  state,
  mutations,
  actions
}
