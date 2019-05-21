import service from '@/utils/request'

export default {
  createItem (params = {}) {
    return service.post('/legal_status', params)
  },

  deleteItem (id) {
    return service.delete('/legal_status', { params: { id } })
  },

  getItem (params) {
    return service.get('/legal_status', { params })
  },

  getItems (params = {}) {
    return service.get('/legal_statuses', { params: { ...params } })
  },

  updateItem (params = {}) {
    return service.patch('/legal_status', params)
  },
}
