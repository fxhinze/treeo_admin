import api from '@/api'

function createItem (item) {
  return {
    id: item.id,
    name: item.name,
    latin_name: item.latin_name,
  }
}

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
      let response = await api.species.getItems(state.query)

      let items = response.data.data.map(item => {
        return createItem(item)
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
    return api.species.createItem(form)
      .then(response => {
        dispatch('fetchItems')

        let item = createItem(response.data.data)
        commit('SET_ITEM', item)

        return response
      })
  },

  updateItem ({ commit, dispatch }, form) {
    return api.species.updateItem(form)
      .then(response => {
        dispatch('fetchItems')

        let item = createItem(response.data.data)
        commit('SET_ITEM', item)

        return response
      })
  },

  deleteItem ({ dispatch }, id) {
    return api.species.deleteItem(id)
      .then(response => {
        dispatch('fetchItems')

        return response
      })
  },

  fetchItem ({ commit, getters }, id) {
    return new Promise((resolve, reject) => {
      let item = getters.getItem(id)

      if (item) {
        commit('SET_ITEM', item)
        resolve()
      } else {
        api.species.getItem({ id })
          .then(response => {
            item = createItem(response.data.data)
            commit('SET_ITEM', item)

            resolve()

            return response
          })
          .catch(error => {
            reject(error)
          })
      }
    })
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