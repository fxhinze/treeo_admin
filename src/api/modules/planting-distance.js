import service from '@/utils/request'

export default {
  createItem (params = {}) {
    return service.post('/planting_distance', params)
  },

  deleteItem (id) {
    return service.delete('/planting_distance', { params: { id } })
  },

  getItem (params) {
    return service.get('/planting_distance', { params })
  },

  getItems (params = {}) {
    return service.get('/planting_distances', { params: { ...params } })
  },

  updateItem (params = {}) {
    return service.patch('/planting_distance', params)
  },
}
