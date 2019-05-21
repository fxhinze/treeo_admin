import service from '@/utils/request'

export default {
  createItem (params = {}) {
    return service.post('/district', params)
  },

  deleteItem (id) {
    return service.delete('/district', { params: { id } })
  },

  getItem (params = {}) {
    return service.get('/district', { params })
  },

  getItems (params = {}) {
    return service.get('/districts', { params: { ...params } })
  },

  updateItem (params = {}) {
    return service.patch('/district', params)
  },
}
