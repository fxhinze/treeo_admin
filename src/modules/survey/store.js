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
  plots: [],
  statuses: [],
  trees: [],
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

  SET_PLOTS (state, plots) {
    state.plots = plots
  },

  SET_STATUSES (state, statuses) {
    state.statuses = statuses
  },

  SET_TREES (state, trees) {
    state.trees = trees
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
      const { items, meta } = await api.survey.getFilteredItems({
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
    return api.survey.createItem(form)
      .then(response => {
        dispatch('fetchItems')

        return response
      })
  },

  updateItem ({ commit, dispatch }, form) {
    return new Promise(async (resolve, reject) => {
      await api.survey.updateItem(form)
        .catch(error => reject(error))

      await api.survey.getFilteredItem({ id: form.id })
        .then(({ item }) => {
          commit('SET_ITEM', item)

          resolve(item)
        })

      dispatch('fetchItems')
    })
  },

  deleteItem ({ dispatch }, id) {
    return api.survey.deleteItem(id)
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
        api.survey.getFilteredItem({ id })
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
      ],
      limit: -1,
      sortedBy: 'asc',
      orderBy: 'date_start',
    }

    return api.survey.getChartItems(params, config)
  },

  fetchPlots ({ commit, state }) {
    if (state.plots.length > 0) {
      return Promise.resolve(state.plots)
    }

    return api.plot.getItems({
      filter: 'id;name',
      limit: -1,
    })
      .then(response => {
        commit('SET_PLOTS', response.data.data)
        return response.data.data
      })
  },

  fetchTrees ({ commit }, payload) {
    return api.tree.getFilteredItems({
      limit: -1,
      query: [
        { field: 'survey_id', type: 'text', value: payload.id }
      ]
    })
      .then(({ items }) => {
        commit('SET_TREES', items)
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

  fetchMap ({ dispatch }, { plotId = null, surveyId = null }) {
    return new Promise(async (resolve, reject) => {
      Promise.all([
        dispatch('fetchPlotMap', plotId),
        dispatch('fetchTreesMap', surveyId),
      ]).then(response => {
        resolve({
          polygon: response[0],
          points: response[1].filter(point => {
            return point.geometry
          })
        })
      })
    })
  },

  fetchPlot ({ commit }, id) {
    if (!id) return Promise.resolve()

    return api.plot.getFilteredItem({
      id
    })
  },

  fetchPlotMap ({ commit }, id) {
    if (!id) return Promise.resolve()

    return api.plot.getMapItem({
      id
    })
  },

  fetchTreesMap ({ commit }, id) {
    if (!id) return Promise.resolve()

    return api.tree.getMapItems({
      id
    })
  },

  generatePlotMap ({ commit }, id) {
    if (!id) return Promise.resolve()

    return api.plot.generatePolygon({
      survey_id: id
    }).then(response => response.data.data)
  },

  clearItem ({ commit }) {
    commit('SET_ITEM', null)
  },

  clearTrees ({ commit }) {
    commit('SET_TREES', [])
  },

  clear ({ commit }) {
    commit('SET_ITEM', null)
    commit('SET_ITEMS', [])
    commit('SET_PLOTS', [])
    commit('SET_TREES', [])
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