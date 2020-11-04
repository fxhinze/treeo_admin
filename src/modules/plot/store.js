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
  farmers: [],
  projects: [],
  species: [],
  soilTypes: [],
  legalStatuses: [],
  villages: [],
  districts: [],
  plantingDistances: [],
  fieldCoordinators: [],
  supporters: [],
  surveys: [],
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

  SET_FARMERS (state, farmers) {
    state.farmers = farmers
  },

  SET_PROJECTS (state, projects) {
    state.projects = projects
  },

  SET_SPECIES (state, species) {
    state.species = species
  },

  SET_SOIL_TYPES (state, soilTypes) {
    state.soilTypes = soilTypes
  },

  SET_LEGAL_STATUSES (state, legalStatuses) {
    state.legalStatuses = legalStatuses
  },

  SET_VILLAGES (state, villages) {
    state.villages = villages
  },

  SET_DISTRICTS (state, districts) {
    state.districts = districts
  },

  SET_PLANTING_DISTANCES (state, plantingDistances) {
    state.plantingDistances = plantingDistances
  },

  SET_FIELD_COORDINATORS (state, fieldCoordinators) {
    state.fieldCoordinators = fieldCoordinators
  },

  SET_SUPPORTERS (state, supporters) {
    state.supporters = supporters
  },

  SET_SURVEYS (state, surveys) {
    state.surveys = surveys
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
      let { items, meta } = await api.plot.getFilteredItems({
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
    return api.plot.createItem(form)
      .then(response => {
        dispatch('fetchItems')

        return response
      })
  },

  updateItem ({ commit, dispatch }, form) {
    return new Promise(async (resolve, reject) => {
      await api.plot.updateItem(form)
        .catch(error => reject(error))

      await api.plot.getFilteredItem({ id: form.id })
        .then(({ item }) => {
          commit('SET_ITEM', item)

          resolve(item)
        })

      dispatch('fetchItems')
    })
  },

  deleteItem ({ dispatch }, id) {
    return api.plot.deleteItem(id)
      .then(response => {
        dispatch('fetchItems')

        return response
      })
  },

  fetchItem ({ commit, getters }, payload) {
    const { id = null, item = null } = payload

    return new Promise((resolve, reject) => {
      if (item) {
        commit('SET_ITEM', item)
        resolve(item)
      } else {
        api.plot.getFilteredItem({ id })
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

  fetchItemsChart ({ state }, config = {}) {
    let params = {
      query: [
        ...state.query.query || [],
        { field: 'planting_date', type: 'empty', value: '1' }
      ],
      limit: -1,
      sortedBy: 'desc',
      orderBy: 'planting_date',
    }

    return api.plot.getChartItems(params, config)
  },

  fetchItemMap ({ commit }, id) {
    if (!id) return

    return api.plot.getMapItem({
      id: id,
    })
  },

  async updatePlotPolygon ({ commit, dispatch }, payload) {
    await api.plot.updateMapItem(payload)

    const { item } = await api.plot.getFilteredItem({ id: payload.id })

    commit('SET_ITEM', item)

    dispatch('fetchItems')
  },

  parseGeojson ({ commit }, payload) {
    return api.geo.parseItem(payload.data, payload.callback)
  },

  generatePlotMap ({ commit }, id) {
    if (!id) return Promise.resolve()

    return api.plot.generatePolygon({
      id: id
    }).then(response => response.data.data)
  },

  forcePlotMap ({ commit }, id) {
    if (!id) return Promise.resolve()

    return api.plot.forcePolygon({
      survey_id: id
    }).then(response => response.data.data)
  },

  fetchGallery ({ commit }, id) {
    return service.get('/album', {
      params: { plot_id: id },
    }).then(response => {
      commit('SET_GALLERY', response.data.data)
    })
  },

  async uploadGalleryPhotos ({ dispatch }, payload) {
    try {
      const data = payload.data
      data.append('plot_id', data.get('id'))
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
      await dispatch('fetchGallery', payload.data.get('plot_id'))

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
        plot_id: payload.id,
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
        plot_id: payload.id,
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
        plot_id: payload.id,
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

  fetchFarmers ({ commit, state }) {
    if (state.farmers.length > 0) {
      return Promise.resolve(state.farmers)
    }

    return api.farmer.getItems({
      filter: 'id;name',
      limit: -1,
    })
      .then(response => {
        let items = response.data.data.map(item => {
          return {
            id: item.id,
            name: `${item.id} - ${item.name}`,
          }
        })
        commit('SET_FARMERS', items)
        return items
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

  fetchSoilTypes ({ commit, state }) {
    if (state.soilTypes.length > 0) {
      return Promise.resolve(state.soilTypes)
    }

    return api.soilType.getItems({
      filter: 'id;name',
      limit: -1,
    })
      .then(response => {
        commit('SET_SOIL_TYPES', response.data.data)
        return response.data.data
      })
  },

  fetchLegalStatuses ({ commit, state }) {
    if (state.legalStatuses.length > 0) {
      return Promise.resolve(state.legalStatuses)
    }

    return api.legalStatus.getItems({
      filter: 'id;name',
      limit: -1,
    })
      .then(response => {
        commit('SET_LEGAL_STATUSES', response.data.data)
        return response.data.data
      })
  },

  fetchVillages ({ commit, state }) {
    if (state.villages.length > 0) {
      return Promise.resolve(state.villages)
    }

    return api.village.getItems({
      filter: 'id;name',
      limit: -1,
    })
      .then(response => {
        commit('SET_VILLAGES', response.data.data)
        return response.data.data
      })
  },

  fetchDistricts ({ commit, state }) {
    if (state.districts.length > 0) {
      return Promise.resolve(state.districts)
    }

    return api.district.getItems({
      filter: 'id;name',
      limit: -1,
    })
      .then(response => {
        commit('SET_DISTRICTS', response.data.data)
        return response.data.data
      })
  },

  fetchPlantingDistances ({ commit, state }) {
    if (state.plantingDistances.length > 0) {
      return Promise.resolve(state.plantingDistances)
    }

    return api.plantingDistance.getItems({
      filter: 'id;name',
      limit: -1,
    })
      .then(response => {
        commit('SET_PLANTING_DISTANCES', response.data.data)
        return response.data.data
      })
  },

  fetchFieldCoordinators ({ commit, state }) {
    if (state.fieldCoordinators.length > 0) {
      return Promise.resolve(state.fieldCoordinators)
    }

    return api.fieldCoordinator.getItems({
      filter: 'id;name',
      limit: -1,
    })
      .then(response => {
        commit('SET_FIELD_COORDINATORS', response.data.data)
        return response.data.data
      })
  },

  fetchSupporters ({ commit, state }) {
    if (state.supporters.length > 0) {
      return Promise.resolve(state.supporters)
    }

    return api.supporter.getItems({
      filter: 'id;name',
      limit: -1,
    })
      .then(response => {
        commit('SET_SUPPORTERS', response.data.data)
        return response.data.data
      })
  },

  fetchSurveys ({ commit, state }, params = {}) {
    return api.survey.getFilteredItems({
      limit: -1,
      sortedBy: 'desc',
      orderBy: 'date_end',
      query: [
        { field: 'plot_id', type: 'text', value: params.id }
      ]
    })
      .then(({ items }) => {
        commit('SET_SURVEYS', items)
        return items
      })
  },

  clearItem ({ commit }) {
    commit('SET_ITEM', null)
    commit('SET_GALLERY', [])
  },

  clearSurveys ({ commit }) {
    commit('SET_SURVEYS', [])
  },

  clear ({ commit, dispatch }) {
    dispatch('clearItem')
    commit('SET_ITEMS', [])
    commit('SET_FARMERS', [])
    commit('SET_PROJECTS', [])
    commit('SET_SPECIES', [])
    commit('SET_SOIL_TYPES', [])
    commit('SET_LEGAL_STATUSES', [])
    commit('SET_VILLAGES', [])
    commit('SET_DISTRICTS', [])
    commit('SET_PLANTING_DISTANCES', [])
    commit('SET_FIELD_COORDINATORS', [])
    commit('SET_SUPPORTERS', [])
    commit('SET_SURVEYS', [])
  },
}

export default {
  namespaced,
  getters,
  state,
  mutations,
  actions
}