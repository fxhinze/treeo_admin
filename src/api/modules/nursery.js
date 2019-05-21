import service from '@/utils/request'
import { Nursery } from '@/modules/nursery/interface'

export default {
  createItem (params = {}) {
    return service.post('/nursery', params)
  },

  deleteItem (id) {
    return service.delete('/nursery', { params: { id } })
  },

  getItem (params) {
    return service.get('/nursery', { params })
  },

  getFilteredItem (params = {}) {
    return service.get('/nursery', { params }).then(response => {
      return {
        item: new Nursery(response.data.data).create(),
        meta: response.data.meta,
      }
    })
  },

  getItems (params = {}) {
    return service.get('/nurseries', { params: { ...params } })
  },

  getFilteredItems (params = {}) {
    return service.get('/nurseries', { params: { ...params } }).then(response => {
      return {
        items: response.data.data.map(item => {
          return new Nursery(item).create()
        }),
        meta: response.data.meta,
      }
    })
  },

  updateItem (params = {}) {
    return service.patch('/nursery', params)
  },
}
