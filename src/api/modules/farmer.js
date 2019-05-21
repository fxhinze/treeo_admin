import service from '@/utils/request'
import { Farmer } from '@/modules/farmer/interface'

export default {
  createItem (params = {}) {
    return service.post('/farmer', params)
  },

  deleteItem (id) {
    return service.delete('/farmer', { params: { id } })
  },

  getItem (params = {}) {
    return service.get('/farmer', { params })
  },

  getFilteredItem (params = {}) {
    return service.get('/farmer/datatable', { params }).then(response => {
      return {
        item: new Farmer(response.data.data).create(),
        meta: response.data.meta,
      }
    })
  },

  getItems (params = {}) {
    return service.get('/farmers/datatable', { params: { ...params } })
  },

  getFilteredItems (params = {}) {
    return service.get('/farmers/datatable', { params: { ...params } }).then(response => {
      return {
        items: response.data.data.map(item => {
          return new Farmer(item).create()
        }),
        meta: response.data.meta,
      }
    })
  },

  updateItem (params = {}) {
    return service.patch('/farmer', params)
  },

  registerItem (params = {}) {
    return service.post('/farmer/register', params)
  },
}