import service from '@/utils/request'

export default {
  createItem (params = {}) {
    return service.post('/project', params)
  },

  deleteItem (id) {
    return service.delete('/project', { params: { id } })
  },

  getItem (params) {
    return service.get('/project', { params })
  },

  getItems (params = {}) {
    return service.get('/projects', { params: { ...params } })
  },

  updateItem (params = {}) {
    return service.patch('/project', params)
  },
}
