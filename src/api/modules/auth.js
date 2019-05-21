import service from '@/utils/request'

export default {
  login (params) {
    return service.post('/clients/web/admin/login', params)
  },

  logout () {
    return service.delete('/logout')
  },

  getProfile (params = {}) {
    return service.get('/user/profile', {
      params: {
        ...params,
        include: 'roles'
      }
    })
  },

  updateProfile (params = {}) {
    return service.put(`/users/${params.id}`, {
      ...params,
      include: 'roles'
    })
      .then(response => {
        return response.data.data
      })
  },

  lostPassword (params = {}) {
    return service.post('/password/forgot', params)
  },

  resetPassword (params = {}) {
    return service.post('/password/reset', params)
  },
}
