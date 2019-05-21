import service from '@/utils/request'

export default {
  createItem (params = {}) {
    return service.post('/fieldcoordinator', params)
  },

  deleteItem (id) {
    return service.delete('/fieldcoordinator', { params: { id } })
  },

  getItem (params) {
    return service.get('/fieldcoordinator', { params })
  },

  getItems (params = {}) {
    return service.get('/fieldcoordinators', { params: { ...params } })
  },

  updateItem (params = {}) {
    return service.patch('/fieldcoordinator', params)
  },
}
