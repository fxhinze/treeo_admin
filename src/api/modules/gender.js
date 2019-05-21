import service from '@/utils/request'

export default {
  getItems () {
    return service.get('/genders')
  }
}