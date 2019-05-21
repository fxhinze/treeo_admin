import service from '@/utils/request'
import { Tree } from '@/modules/tree/interface'

export default {
  createItem (params = {}) {
    return service.post('/tree', params)
  },

  deleteItem (id) {
    return service.delete('/tree', { params: { id } })
  },

  getItem (params) {
    return service.get('/tree', { params })
  },

  getFilteredItem (params = {}) {
    return service.get('/tree/datatable', { params }).then(response => {
      return {
        item: new Tree(response.data.data).create(),
        meta: response.data.meta,
      }
    })
  },

  getItems (params = {}) {
    return service.get('/trees/datatable', { params: { ...params } })
  },

  getFilteredItems (params = {}) {
    return service.get('/trees/datatable', { params: { ...params } }).then(response => {
      return {
        items: response.data.data.map(item => {
          return new Tree(item).create()
        }),
        meta: response.data.meta,
      }
    })
  },

  updateItem (params = {}) {
    return service.patch('/tree', params)
  },

  getMapItems (params = {}) {
    return service.get('survey/map', { params: { ...params } }).then(response => {
      return response.data.features
    })
  },
}
