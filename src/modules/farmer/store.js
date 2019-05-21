import Vue from 'vue'

import service from '@/utils/request'

import api from '@/api'

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
  genders: [],
  projects: [],
  users: [],
  plots: [],
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

  SET_PHOTO (state, { id, photo }) {
    state.item.photo = photo

    const index = state.items.findIndex(item => item.id === id)

    Vue.set(state.items, index, {
      ...state.items[index],
      photo: photo,
    })
  },

  SET_GENDERS (state, genders) {
    state.genders = genders
  },

  SET_PROJECTS (state, projects) {
    state.projects = projects
  },

  SET_USERS (state, users) {
    state.users = users
  },

  SET_PLOTS (state, plots) {
    state.plots = plots
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
      let { items, meta } = await api.farmer.getFilteredItems({
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

  createItem ({ dispatch }, form) {
    return api.farmer.createItem(form)
      .then(response => {
        dispatch('fetchItems')

        return response
      })
  },

  registerItem ({ dispatch }, form) {
    return api.farmer.registerItem(form)
      .then(response => {
        return response
      })
  },

  updateItem ({ commit, dispatch }, form) {
    return new Promise(async (resolve, reject) => {
      await api.farmer.updateItem(form)
        .catch(error => reject(error))

      await api.farmer.getFilteredItem({ id: form.id })
        .then(({ item }) => {
          commit('SET_ITEM', item)

          resolve(item)
        })

      dispatch('fetchItems')
    })
  },

  deleteItem ({ dispatch }, id) {
    return api.farmer.deleteItem(id)
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
        api.farmer.getFilteredItem({ id })
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

  uploadPhoto ({ commit }, payload) {
    return service.request({
      url: '/farmer/photo',
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: payload.data,
      onUploadProgress: payload.callback
    }).then(response => {
      commit('SET_PHOTO', {
        id: payload.data.get('farmer_id'),
        photo: response.data.data.file,
      })
    })
  },

  deletePhoto ({ commit }, payload) {
    return service.request({
      url: '/farmer/photo',
      method: 'post',
      data: {
        ...payload,
      },
    }).then(response => {
      commit('SET_PHOTO', {
        id: payload.farmer_id,
        photo: null,
      })
    })
  },

  fetchGenders ({ commit, state }) {
    if (state.genders.length > 0) {
      return Promise.resolve(state.genders)
    }

    return api.gender.getItems({
      filter: 'id;name',
      limit: -1,
    })
      .then(response => {
        commit('SET_GENDERS', response.data.data)
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

  fetchUsers ({ commit, state }) {
    if (state.users.length > 0) {
      return Promise.resolve(state.users)
    }

    return api.user.getItems({
      filter: 'id;email',
      limit: -1,
    })
      .then(response => {
        commit('SET_USERS', response.data.data)
        return response.data.data
      })
  },

  fetchFarmers ({ commit, state }) {
    return api.farmer.getFilteredItems({
      filter: 'id;name;email',
      limit: -1,
    })
      .then(({ items, meta }) => {
        return items
      })
  },

  fetchPlots ({ commit, state }, params = {}) {
    return api.plot.getFilteredItems({
      limit: -1,
      query: [
        { field: 'farmer_id', type: 'text', value: params.id }
      ]
    })
      .then(({ items }) => {
        commit('SET_PLOTS', items)
        return items
      })
  },

  clearItem ({ commit }) {
    commit('SET_ITEM', null)
  },

  clearPlots ({ commit }) {
    commit('SET_PLOTS', [])
  },

  clear ({ commit }) {
    commit('SET_ITEM', null)
    commit('SET_ITEMS', [])
    commit('SET_GENDERS', [])
    commit('SET_PROJECTS', [])
    commit('SET_USERS', [])
    commit('SET_PLOTS', [])
  },
}

export default {
  namespaced,
  getters,
  state,
  mutations,
  actions
}