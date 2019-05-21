import service from '@/utils/request'

export default {
  createItem (params = {}) {
    return service.post('/species', params)
  },

  deleteItem (id) {
    return service.delete('/species', { params: { id } })
  },

  getItem (params) {
    return service.get('/species', { params })
  },

  getItems (params = {}) {
    return service.get('/species/all', { params: { ...params } })
  },

  updateItem (params = {}) {
    return service.patch('/species', params)
  },
}
