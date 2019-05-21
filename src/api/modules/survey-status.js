import service from '@/utils/request'

export default {
  createItem (params = {}) {
    return service.post('/survey_status', params)
  },

  deleteItem (id) {
    return service.delete('/survey_status', { params: { id } })
  },

  getItem (params) {
    return service.get('/survey_status', { params })
  },

  getItems (params = {}) {
    return service.get('/survey_statuses', { params: { ...params } })
  },

  updateItem (params = {}) {
    return service.patch('/survey_status', params)
  },
}
