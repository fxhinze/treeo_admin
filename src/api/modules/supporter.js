import service from '@/utils/request'
import { Supporter } from '@/modules/supporter/interface'

export default {
  createItem (params = {}) {
    return service.post('/supporter', params)
  },

  deleteItem (id) {
    return service.delete('/supporter', { params: { id } })
  },

  getItem (params) {
    return service.get('/supporter', { params })
  },

  getFilteredItem (params = {}) {
    return service.get('/supporter', { params }).then(response => {
      return {
        item: new Supporter(response.data.data).create(),
        meta: response.data.meta,
      }
    })
  },

  getItems (params = {}) {
    return service.get('/supporters', { params: { ...params } })
  },

  getFilteredItems (params = {}) {
    return service.get('/supporters', { params: { ...params } }).then(response => {
      return {
        items: response.data.data.map(item => {
          return new Supporter(item).create()
        }),
        meta: response.data.meta,
      }
    })
  },

  updateItem (params = {}) {
    return service.patch('/supporter', params)
  },
}
