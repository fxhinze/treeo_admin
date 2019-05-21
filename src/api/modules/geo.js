import service from '@/utils/request'

export default {
  parseItem (params = {}, callback = undefined) {
    let config = {
      method: 'post',
      url: '/geojson/parse',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: params,
    }

    if (callback) {
      config['onUploadProgress'] = callback
    }

    return service.request(config).then(response => {
      return response.data.geodata
    })
  },
}
