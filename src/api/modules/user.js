import service from '@/utils/request'

export default {
  createItem (params = {}) {
    return service.post('/register', params)
  },

  createAdminItem (params = {}) {
    return service.post('/admins', params)
  },

  deleteItem (id) {
    return service.delete('/users/' + id)
  },

  getItem (params = {}) {
    return service.get('/users/' + (params.id || null), { params })
  },

  getItems (params = {}) {
    return service.get('/users', { params: { ...params } })
  },

  updateItem (params = {}) {
    return service.put('/users/' + params.id, params)
  },
}
