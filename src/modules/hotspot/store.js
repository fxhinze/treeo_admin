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
  gallery: [],
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
    state.item.photo = image

    const index = state.items.findIndex(item => item.id === id)

    Vue.set(state.items, index, {
      ...state.items[index],
      photo: image,
    })
  },

  SET_GALLERY (state, photos) {
    state.gallery = photos
  },

  SET_GALLERY_PHOTO (state, photo) {
    const index = state.gallery.findIndex(item => item.id === photo.id)

    Vue.set(state.gallery, index, {
      ...state.gallery[index],
      ...photo,
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
      let { items, meta } = await api.hotspot.getFilteredItems({
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
    return api.hotspot.createItem(form)
      .then(response => {
        dispatch('fetchItems')

        return response
      })
  },

  updateItem ({ commit, dispatch }, form) {
    return new Promise(async (resolve, reject) => {
      await api.hotspot.updateItem(form)
        .catch(error => reject(error))

      await api.hotspot.getFilteredItem({ id: form.id })
        .then(({ item }) => {
          commit('SET_ITEM', item)

          resolve(item)
        })

      dispatch('fetchItems')
    })
  },

  deleteItem ({ dispatch }, id) {
    return api.hotspot.deleteItem(id)
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
        api.hotspot.getFilteredItem({ id })
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
      url: '/hotspot/photo',
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
      url: '/hotspot/photo',
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

  fetchGallery ({ commit }, id) {
    return service.get('/album', {
      params: { hotspot_id: id },
    }).then(response => {
      commit('SET_GALLERY', response.data.data)
    })
  },

  async uploadGalleryPhotos ({ dispatch }, payload) {
    try {
      const data = payload.data
      data.append('hotspot_id', data.get('id'))
      data.delete('id')

      await service.request({
        url: '/album/upload',
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: data,
        onUploadProgress: payload.callback
      })
    } catch (error) {
      return Promise.reject(error)
    }

    try {
      await dispatch('fetchGallery', payload.data.get('hotspot_id'))

      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  },

  async updateGalleryPhotos ({ commit, state }, payload) {
    const originals = state.gallery

    commit('SET_GALLERY', payload.items)

    try {
      const params = {
        hotspot_id: payload.id,
        album: payload.items.map(item => item.id)
      }

      const response = await service.post('/album/order', params)

      commit('SET_GALLERY', response.data.data)

      return Promise.resolve(response.data)
    } catch (error) {
      commit('SET_GALLERY', originals)

      return Promise.reject(error)
    }
  },

  async updateGalleryPhoto ({ commit }, payload) {
    try {
      const params = {
        id: payload.photoId,
        hotspot_id: payload.id,
        caption: payload.caption,
      }

      const response = await service.patch('/album', params)

      commit('SET_GALLERY_PHOTO', response.data.data)

      return Promise.resolve(response.data)
    } catch (error) {
      return Promise.reject(error)
    }
  },

  async deleteGalleryPhoto ({ dispatch }, payload) {
    try {
      const params = {
        id: payload.photoId,
        hotspot_id: payload.id,
      }

      await service.delete('/album', { params: params })
    } catch (error) {
      return Promise.reject(error)
    }

    try {
      await dispatch('fetchGallery', payload.id)

      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  },

  clearItem ({ commit }) {
    commit('SET_ITEM', null)
    commit('SET_GALLERY', [])
  },

  clear ({ commit, dispatch }) {
    dispatch('clearItem')
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