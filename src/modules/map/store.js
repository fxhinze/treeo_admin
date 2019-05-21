import api from '@/api'
import Vue from 'vue'

export const namespaced = true

export const getters = {
  plotsFiltered: state => search => {
    let searchString = search ? search.toString().toLowerCase().replace(/\s+/g, '') : ''
    return search ? state.plots.filter(plot => {
      let field = (plot.properties.id + plot.properties.farmer_id + plot.properties.farmer_name).toString().replace(/\s+/g, '').toLowerCase()
      return field.indexOf(searchString) > -1
    }) : state.plots
  },

  getPlotById: state => id => {
    return state.plots.find(plot => {
      return plot.properties.id === id
    }) || null
  }
}

export const state = {
  loadStatusMap: 0,
  loadStatusData: 0,
  plot: null,
  plots: []
}

export const mutations = {
  SET_LOADSTATUS_MAP (state, status) {
    state.loadStatusMap = status
  },

  SET_LOADSTATUS_DATA (state, status) {
    state.loadStatusData = status
  },

  SET_PLOT (state, plot) {
    state.plot = plot
  },

  SET_PLOTS (state, plots) {
    state.plots = plots
  },

  UPDATE_PLOT (state, plot) {
    let geometry = JSON.parse(plot.geodata).features[0].geometry

    let feature = {
      ...state.plots.find(f => f.properties.id === plot.id),
      geometry: geometry,
    }

    Vue.set(
      state.plots,
      state.plots.findIndex(f => f.properties.id === plot.id),
      feature
    )
  },

  DELETE_PLOT (state, id) {
    state.plot = null

    state.plots.splice(state.plots.findIndex(f => f.properties.id === id), 1)
  },
}

export const actions = {
  init ({ dispatch }) {
  },

  fetch ({ commit, dispatch }) {
    commit('SET_LOADSTATUS_DATA', 1)

    return Promise.all([
      dispatch('fetchPlots')
    ]).then(() => {
      commit('SET_LOADSTATUS_DATA', 2)
    })
  },

  fetchPlots ({ commit, state }) {
    if (state.plots > 0) {
      return Promise.resolve(state.plots)
    }

    return api.plot.getMapItems()
      .then(response => {
        commit('SET_PLOTS', response.data.features)

        return response.data.features
      })
  },

  updatePlot ({ commit }, payload) {
    return api.plot.updateMapItem(payload).then(response => {
      commit('UPDATE_PLOT', payload)
      return response
    })
  },

  parseGeojson ({ commit }, payload) {
    return api.geo.parseItem(payload.data, payload.callback)
  },

  deletePlotPolygon ({ commit }, id) {
    return api.plot.deletePolygon(id).then(response => {
      commit('DELETE_PLOT', id)
      return response
    })
  },

  clear ({ commit }) {
    commit('SET_LOADSTATUS_MAP', 0)
    commit('SET_LOADSTATUS_DATA', 0)
  },
}

export default {
  namespaced,
  getters,
  state,
  mutations,
  actions
}