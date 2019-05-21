import service from '@/utils/request'

export default {
  createItem (params = {}) {
    return service.post('/soil_type', params)
  },

  deleteItem (id) {
    return service.delete('/soil_type', { params: { id } })
  },

  getItem (params) {
    return service.get('/soil_type', { params })
  },

  getItems (params = {}) {
    return service.get('/soil_types', { params: { ...params } })
  },

  updateItem (params = {}) {
    return service.patch('/soil_type', params)
  },
}
