import service from '@/utils/request'
import { Survey } from '@/modules/survey/interface'

export default {
  createItem (params = {}) {
    return service.post('/survey', params)
  },

  deleteItem (id) {
    return service.delete('/survey', { params: { id } })
  },

  getItem (params) {
    return service.get('/survey', { params })
  },

  getFilteredItem (params = {}) {
    return service.get('/survey/datatable', { params }).then(response => {
      return {
        item: new Survey(response.data.data).create(),
        meta: response.data.meta,
      }
    })
  },

  getItems (params = {}) {
    return service.get('/surveys/datatable', { params: { ...params } })
  },

  getFilteredItems (params = {}) {
    return service.get('/surveys/datatable', { params: { ...params } }).then(response => {
      return {
        items: response.data.data.map(item => {
          return new Survey(item).create()
        }),
        meta: response.data.meta,
      }
    })
  },

  updateItem (params = {}) {
    return service.patch('/survey', params)
  },

  getChartItems (params = {}, config = {}) {
    return service.get('/surveys/datatable', {
      params: { ...params },
      ...config,
    }).then(response => {
      return response.data.data
    })
  },
}
