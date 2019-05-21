import service from '@/utils/request'
import { Hotspot } from '@/modules/hotspot/interface'

export default {
  createItem (params = {}) {
    return service.post('/hotspot', params)
  },

  deleteItem (id) {
    return service.delete('/hotspot', { params: { id } })
  },

  getItem (params) {
    return service.get('/hotspot', { params })
  },

  getFilteredItem (params = {}) {
    return service.get('/hotspot', { params }).then(response => {
      return {
        item: new Hotspot(response.data.data).create(),
        meta: response.data.meta,
      }
    })
  },

  getItems (params = {}) {
    return service.get('/hotspots', { params: { ...params } })
  },

  getFilteredItems (params = {}) {
    return service.get('/hotspots', { params: { ...params } }).then(response => {
      return {
        items: response.data.data.map(item => {
          return new Hotspot(item).create()
        }),
        meta: response.data.meta,
      }
    })
  },

  updateItem (params = {}) {
    return service.patch('/hotspot', params)
  },
}
