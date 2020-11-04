function createFilterText ({ type }) {
  return {
    type
  }
}

function createFilterDate ({ type }) {
  return {
    type
  }
}

function createFilterNumber ({ type, range = [null, null] }) {
  return {
    type,
    range
  }
}

function createFilterSelect ({ type, items = [] }) {
  return {
    type,
    items: items.map((item, index) => {
      return {
        name: item.name || 'select_' + index,
        label: item.label || 'Select ' + index
      }
    })
  }
}

function createFilter (filter = null) {
  if (!filter || !filter.hasOwnProperty('type')) return null

  switch (filter.type) {
    case 'text': return createFilterText(filter)
    case 'date': return createFilterDate(filter)
    case 'number': return createFilterNumber(filter)
    case 'select': return createFilterSelect(filter)
  }
}

function createColumn (column) {
  return {
    primaryKey: column.primaryKey || false,
    name: column.name || '',
    label: column.label || 'No Label',
    width: column.width || 100,
    type: column.type || 'text',
    link: column.link || null,
    textAlign: column.hasOwnProperty('textAlign') ? column.textAlign : null,
    visible: column.hasOwnProperty('visible') ? column.visible : true,
    default: column.hasOwnProperty('default') ? column.default : null,
    tooltip: false,
    sort: column.hasOwnProperty('sort') ? column.sort : true,
    sortable: column.hasOwnProperty('sortable') ? column.sortable : true,
    searchable: column.hasOwnProperty('searchable') ? column.searchable : true,
    resizable: column.hasOwnProperty('resizable') ? column.resizable : true,
    filterable: column.hasOwnProperty('filterable') ? column.filterable : true,
    // fixedColumn: column.hasOwnProperty('fixedColumn') ? column.fixedColumn : false,
    fixedColumn: false,
    filterType: column.hasOwnProperty('filterType') ? column.filterType : 'text',
    filterTypes: column.hasOwnProperty('filterTypes') ? column.filterTypes : ['text', 'bool'],
    filterRange: column.hasOwnProperty('filterRange') ? column.filterRange : null,
    filter: createFilter(column.filter) || null
  }
}

function createColumns (columns) {
  return columns.map(column => createColumn(column))
}

function createColumnAction () {
  return createColumn({
    name: 'actions',
    label: 'Actions',
    sort: false,
    sortable: false,
    searchable: false,
    resizable: false,
    fixedColumn: true,
  })
}

class Datatable {
}

export default {
  Datatable,
  createColumn,
  createColumns,
  createColumnAction
}