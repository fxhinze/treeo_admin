import api from '@/api'

import { User } from './interface'

export const namespaced = true

export const getters = {
  getItem: state => id => {
    return id ? state.items.find(item => {
      return item.id === id
    }) || null : null
  }
}

export const state = {
  loadStatus: 0,
  query: {},
  item: null,
  items: [],
  meta: {},
}

export const mutations = {
  SET_LOADSTATUS (state, status) {
    state.loadStatus = status
  },

  SET_QUERY (state, query) {
    state.query = query
  },

  SET_ITEM (state, item) {
    state.item = item
  },

  SET_ITEMS (state, items) {
    state.items = items
  },

  SET_META (state, meta) {
    state.meta = meta
  },

  SET_SURVEYS (state, surveys) {
    state.surveys = surveys
  },

  SET_SPECIES (state, species) {
    state.species = species
  },
}

export const actions = {
  init ({ dispatch }) {
  },

  setQuery ({ commit }, query) {
    commit('SET_QUERY', query)
  },

  async fetchItems ({ commit, state }) {
    commit('SET_LOADSTATUS', 1)

    try {
      let response = await api.user.getItems({
        ...state.query,
        include: 'roles'
      })

      let items = response.data.data.map(item => {
        return new User(item).create()
      })

      commit('SET_ITEMS', items)
      commit('SET_META', response.data.meta)
      commit('SET_LOADSTATUS', 2)
    } catch (error) {
      commit('SET_ITEMS', [])
      commit('SET_LOADSTATUS', 3)
      return error
    } finally {}
  },

  createItem ({ commit, dispatch }, form) {
    return api.user.createItem(form)
      .then(response => {
        dispatch('fetchItems')

        let item = new User(response.data.data).create()
        commit('SET_ITEM', item)

        return response
      })
  },

  updateItem ({ commit, dispatch }, form) {
    return api.user.updateItem(form)
      .then(response => {
        dispatch('fetchItems')

        let item = new User(response.data.data).create()
        commit('SET_ITEM', item)

        return response
      })
  },

  deleteItem ({ dispatch }, id) {
    return api.user.deleteItem(id)
      .then(response => {
        dispatch('fetchItems')

        return response
      })
  },

  fetchItem ({ commit }, payload) {
    let { id = null, item = null } = payload

    return new Promise((resolve, reject) => {
      if (item) {
        commit('SET_ITEM', item)
        resolve()
      } else {
        api.user.getItem({ id })
          .then(response => {
            item = new User(response.data.data).create()
            commit('SET_ITEM', item)

            resolve()
          })
          .catch(error => {
            reject(error)
          })
      }
    })
  },

  clearItem ({ commit }) {
    commit('SET_ITEM', null)
  },

  clear ({ commit }) {
    commit('SET_ITEM', null)
    commit('SET_ITEMS', [])
  },
}

export default {
  namespaced,
  getters,
  state,
  mutations,
  actions
}