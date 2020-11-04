import helpers from './helpers'

import { Filter } from './filter'
import { THead } from './thead'
import { TBody } from './tbody'

function getSavedState (key) {
  if (window.localStorage.getItem(key) !== undefined) {
    return JSON.parse(window.localStorage.getItem(key))
  }

  return null
}

function setSavedState (key, data) {
  window.localStorage.setItem(key, JSON.stringify(data))
}

export default class Datatable {
  constructor (settings, query) {
    this.initialLoading = true
    this.loadStatus = 0

    this.columns = []
    this.setColumns(settings)
    this.thead = new THead(settings)
    this.tbody = new TBody(settings)
    this.filter = new Filter(settings)

    this.query = {}

    this.data = []
    this.rows = []
    this.rowsNew = {}
    this.meta = {}
    this.pagination = {
      count: 0,
      current_page: 0,
      per_page: 0,
      total: 0,
      total_pages: 0,
    }

    this.searchFields = []
    this.searchValue = ''

    this.setQuery(query)

    this.setSearchFields(this.columns)
  }

  setColumns (columns) {
    this.columns = helpers.createColumns(columns)
  }

  getColumns () {
    return this.columns
  }

  getVisibleColumns () {
    return this.columns
      .filter(column => !!column.visible)
      .map(column => column.name)
  }

  /**
   * Search
   */

  setSearchFields (columns) {
    this.searchFields = columns
      .filter(column => column.searchable)
      .map(column => column.name)
  }

  setSearch ({ fields = null, value = null }) {
    if (fields) this.searchFields = fields
    this.searchValue = value || ''
  }

  getSearch () {
    return {
      fields: this.searchFields,
      value: this.searchValue
    }
  }

  hasSearch () {
    return this.searchValue && this.searchValue !== ''
  }

  clearSearch () {
    this.searchValue = ''
  }

  /**
   * Query
   */

  setQuery (payload) {
    let query = {
      ...this.query
    }

    if (payload.hasOwnProperty('limit')) {
      query.limit = parseInt(payload.limit)
    }

    if (payload.hasOwnProperty('page')) {
      query.page = parseInt(payload.page)
    } else {
      query.page = 1
    }

    if (payload.hasOwnProperty('sortedBy') && payload.hasOwnProperty('orderBy')) {
      query.sortedBy = payload.sortedBy
      query.orderBy = payload.orderBy

      /**
       * TODO: Validate orderby
       */

      // let orderByValid = ['asc', 'desc']
      // if (orderByValid.indexOf(payload.orderBy) > 0) {
      //   query.orderBy = payload.orderBy
      // } else {
      // }
    }

    this.query = query
  }

  getQuery () {
    return this.query
  }

  setLoadStatus (status) {
    if (status === 2) this.initialLoading = false
    this.loadStatus = status
  }

  isInitialLoading () {
    return this.initialLoading
  }

  isLoading () {
    return this.loadStatus < 2
  }

  getLoadStatus () {
    return this.loadStatus
  }

  setData ({ data = [], meta = {} }) {
    this.setRows(data)
    this.setMeta(meta)
  }

  setRowsNew (data = []) {
    this.rowsNew = {
      ...data.reduce((obj, item) => {
        obj[item.id] = item
        return obj
      }, {})
    }
  }

  setRows (data) {
    this.data = data

    this.createRows()

    this.setRowsNew(data)
  }

  setMeta (meta = null) {
    if (!meta) return
    this.meta = meta

    this.createPagination()
  }

  getData () {
    return this.data
  }

  createPagination () {
    if (!this.meta.hasOwnProperty('pagination')) return

    let pagination = {
      ...this.meta.pagination
    }

    this.pagination = {
      count: parseInt(pagination.count) || 0,
      current_page: parseInt(pagination.current_page) || 0,
      per_page: parseInt(pagination.per_page) || 0,
      total: parseInt(pagination.total) || 0,
      total_pages: parseInt(pagination.total_pages) || 0,
    }
  }

  getPagination () {
    return this.pagination
  }

  createRows () {
    let rows = []

    this.data.forEach(row => {
      rows.push(
        this.columns
          .map(column => {
            return {
              primaryKey: column.primaryKey,
              name: column.name,
              label: row.hasOwnProperty(column.name) ? row[column.name] : '',
              default: column.default,
              type: column.type,
              link: column.link,
              textAlign: column.textAlign,
              visible: column.visible,
              fixedColumn: column.fixedColumn,
            }
          })
      )
    })

    this.rows = rows
  }

  getRows () {
    return this.rows
  }

  getRowsNew () {
    return this.rowsNew
  }

  setQueryRouter (route = null) {
    if (!route) return

    let query = route.query || {}

    this.setQuery(query)

    this.setSearch({
      fields: query.hasOwnProperty('searchFields') ? query.searchFields : null,
      value: query.hasOwnProperty('searchValue') ? query.searchValue : null
    })

    this.filter.setSelectedItemsFromRouter(query)
  }

  setQueryLocalStorage (meta = {}, query = {}) {
    if (meta.hasOwnProperty('cacheQuery')) {
      setSavedState(meta.cacheQuery, query)
    }
  }

  getQueryLocalStorage (meta = {}) {
    if (meta.hasOwnProperty('cacheQuery')) {
      let cachedQuery = getSavedState(meta.cacheQuery)

      return cachedQuery || this.query
    } else {
      return this.query
    }
  }

  getQueryRouter (route = null) {
    if (!route) return

    let query = {
      ...this.query,
      ...this.filter.getSelectedItemsForRouter(),
    }

    if (this.hasSearch()) query.search = this.searchValue

    this.setQueryLocalStorage(route.meta, query)

    return query
  }

  getQueryApi () {
    return {
      ...this.query,
      query: this.filter.getSelectedItemsForApi()
      // search: this.searchValue
    }
  }

  calcColumnsWidth () {
    return this.columns
      .filter(column => !!column.visible)
      .reduce((a, b) => {
        return {
          width: a.width + b.width
        }
      })
  }
}