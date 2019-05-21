import api from '@/api'

import { Tree } from './interface'

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
  surveys: [],
  species: [],
  projects: [],
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

  SET_PROJECTS (state, projects) {
    state.projects = projects
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
      const { items, meta } = await api.tree.getFilteredItems({
        ...state.query,
      })

      commit('SET_ITEMS', items)
      commit('SET_META', meta)
      commit('SET_LOADSTATUS', 2)
    } catch (error) {
      commit('SET_ITEMS', [])
      commit('SET_LOADSTATUS', 3)
      return error
    } finally {}
  },

  createItem ({ commit, dispatch }, form) {
    return api.tree.createItem(form)
      .then(response => {
        dispatch('fetchItems')

        return response
      })
  },

  updateItem ({ commit, dispatch }, form) {
    return new Promise(async (resolve, reject) => {
      await api.tree.updateItem(form)
        .catch(error => reject(error))

      await api.tree.getFilteredItem({ id: form.id })
        .then(({ item }) => {
          commit('SET_ITEM', item)

          resolve(item)
        })

      dispatch('fetchItems')
    })
  },

  deleteItem ({ dispatch }, id) {
    return api.tree.deleteItem(id)
      .then(response => {
        dispatch('fetchItems')

        return response
      })
  },

  fetchItem ({ commit }, payload) {
    const { id = null, item = null } = payload

    return new Promise((resolve, reject) => {
      if (item) {
        commit('SET_ITEM', item)
        resolve(item)
      } else {
        api.tree.getFilteredItem({ id })
          .then(({ item }) => {
            commit('SET_ITEM', item)

            resolve(item)
          })
          .catch(error => {
            reject(error)
          })
      }
    })
  },

  fetchSurveys ({ commit, state }) {
    if (state.surveys.length > 0) {
      return Promise.resolve(state.surveys)
    }

    return api.survey.getItems({
      filter: 'id',
      limit: -1,
    })
      .then(response => {
        let items = response.data.data.map(item => {
          return {
            id: item.id,
            name: item.id
          }
        })
        commit('SET_SURVEYS', items)
        return items
      })
  },

  fetchSpecies ({ commit, state }) {
    if (state.species.length > 0) {
      return Promise.resolve(state.species)
    }

    return api.species.getItems({
      filter: 'id;name',
      limit: -1,
    })
      .then(response => {
        commit('SET_SPECIES', response.data.data)
        return response.data.data
      })
  },

  fetchProjects ({ commit, state }) {
    if (state.projects.length > 0) {
      return Promise.resolve(state.projects)
    }

    return api.project.getItems({
      filter: 'id;name',
      limit: -1,
    })
      .then(response => {
        commit('SET_PROJECTS', response.data.data)
        return response.data.data
      })
  },

  clearItem ({ commit }) {
    commit('SET_ITEM', null)
  },

  clear ({ commit }) {
    commit('SET_ITEM', null)
    commit('SET_ITEMS', [])
    commit('SET_SURVEYS', [])
    commit('SET_SPECIES', [])
    commit('SET_PROJECTS', [])
  },
}

export default {
  namespaced,
  getters,
  state,
  mutations,
  actions
}