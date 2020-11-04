export const namespaced = true

export const getters = {
  getTransition: state => state.transition || 'fade-transform-x',
  getCacheGroup: state => state.cacheGroup || null,
}

export const state = {
  // sidebarVisibility: null
  sidebarVisibility: true,
  cachedViews: [],
  cacheGroup: null,
  transition: null,
}

export const mutations = {
  SET_SIDEBAR_VISIBILITY (state, payload) {
    state.sidebarVisibility = payload
  },

  ADD_CACHEDVIEW (state, view) {
    if (state.cachedViews.includes(view)) return
    state.cachedViews.push(view)
  },

  SET_CACHEGROUP (state, group) {
    state.cacheGroup = group
  },

  DELETE_CACHEDVIEW (state, view) {
    for (const i of state.cachedViews) {
      if (i === view.name) {
        const index = state.cachedViews.indexOf(i)
        state.cachedViews.splice(index, 1)
        break
      }
    }
  },

  DELETE_CACHEDVIEWS (state) {
    if (state.cachedViews.length > 0) {
      state.cachedViews = []
    }
  },

  DELETE_CACHEGROUP (state) {
    state.cacheGroup = null
  },

  SET_TRANSITION (state, transition) {
    state.transition = transition
  }
}

export const actions = {
  setSidebarVisibility ({ commit }, payload) {
    commit('SET_SIDEBAR_VISIBILITY', payload)
  },

  toggleSidebarVisibility ({ commit, state }) {
    commit('SET_SIDEBAR_VISIBILITY', !state.sidebarVisibility)
  },

  addCachedView ({ commit, state }, { view = null, group = null }) {
    if (state.cacheGroup === group) {
      commit('ADD_CACHEDVIEW', view)
    } else {
      commit('SET_CACHEGROUP', group)
      commit('DELETE_CACHEDVIEWS')
      commit('ADD_CACHEDVIEW', view)
    }
  },

  deleteCachedViews ({ commit }) {
    commit('DELETE_CACHEGROUP')
    commit('DELETE_CACHEDVIEWS')
  },

  setTransition ({ commit }, transition = null) {
    commit('SET_TRANSITION', transition)
  }
}

export default {
  namespaced,
  getters,
  state,
  mutations,
  actions
}