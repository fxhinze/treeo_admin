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

  SET_PHOTO (state, { id, image }) {
    state.item.image = image

    const index = state.items.findIndex(item => item.id === id)

    Vue.set(state.items, index, {
      ...state.items[index],
      image: image,
    })
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
      let { items, meta } = await api.supporter.getFilteredItems({
        ...state.query
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
    return api.supporter.createItem(form)
      .then(response => {
        dispatch('fetchItems')

        return response
      })
  },

  updateItem ({ commit, dispatch }, form) {
    return new Promise(async (resolve, reject) => {
      await api.supporter.updateItem(form)
        .catch(error => reject(error))

      await api.supporter.getFilteredItem({ id: form.id })
        .then(({ item }) => {
          commit('SET_ITEM', item)

          resolve(item)
        })

      dispatch('fetchItems')
    })
  },

  deleteItem ({ dispatch }, id) {
    return api.supporter.deleteItem(id)
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
        api.supporter.getFilteredItem({ id })
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
      url: '/supporter/logo',
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: payload.data,
      onUploadProgress: payload.callback
    }).then(response => {
      commit('SET_PHOTO', {
        id: payload.data.get('id'),
        image: response.data.data.file,
      })
    })
  },

  deletePhoto ({ commit }, payload) {
    return service.request({
      url: '/supporter/logo',
      method: 'post',
      data: {
        ...payload,
      },
    }).then(response => {
      commit('SET_PHOTO', {
        id: payload.id,
        image: null,
      })
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