import service from '@/utils/request'

export default {
  createItem (params = {}) {
    return service.post('/village', params)
  },

  deleteItem (id) {
    return service.delete('/village', { params: { id } })
  },

  getItem (params) {
    return service.get('/village', { params })
  },

  getItems (params = {}) {
    return service.get('/villages', { params: { ...params } })
  },

  updateItem (params = {}) {
    return service.patch('/village', params)
  },
}
