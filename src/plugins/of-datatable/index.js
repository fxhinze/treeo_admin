import './design/index.scss'

import DatatableComponent from './components/Datatable'
import DatatableClass from './utils/datatable'

export default {
  install (Vue) {
    Vue.component('of-datatable', DatatableComponent)

    Vue.prototype.$createDatatable = function (config) {
      return new DatatableClass(
        config.columns,
        config.defaultQuery
      )
    }
  }
}