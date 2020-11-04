import service from '@/utils/request'

import { Plot } from '@/modules/plot/interface'

export default {
  createItem (params = {}) {
    return service.post('/plot', params)
  },

  deleteItem (id) {
    return service.delete('/plot', { params: { id } })
  },

  getItem (params) {
    return service.get('/plot', { params })
  },

  getFilteredItem (params = {}) {
    return service.get('/plot/datatable', { params }).then(response => {
      return {
        item: new Plot(response.data.data).create(),
        meta: response.data.meta,
      }
    })
  },

  getItems (params = {}) {
    return service.get('/plots/datatable', { params: { ...params } })
  },

  getFilteredItems (params = {}, config = {}) {
    return service.get('/plots/datatable', {
      params: { ...params },
      ...config,
    })
      .then(response => {
        return {
          items: response.data.data.map(item => {
            return new Plot(item).create()
          }),
          meta: response.data.meta,
        }
      })
  },

  updateItem (params = {}) {
    return service.patch('/plot', params)
  },

  getMapItems (params = {}) {
    return service.get('/plots/map', { params: { ...params } })
  },

  getMapItem (params = {}) {
    return service.get('/plot/map', { params: { ...params } })
      .then(response => {
        return response.data.features.geometry ? response.data.features : null
      })
  },

  updateMapItem (params = {}) {
    return service.post('/plot/polygon', params)
  },

  getChartItems (params = {}, config = {}) {
    return service.get('/plots/datatable', {
      params: { ...params },
      ...config,
    }).then(response => {
      return response.data.data
    })
  },

  generatePolygon (params = {}) {
    return service.post('/plot/generatepolygon', params)
  },

  forcePolygon (params = {}) {
    return service.post('/plot/forceplotpolygon', params)
  },

  deletePolygon (id) {
    return service.delete('/plot/polygon', { params: { id } })
  },
}
