function removeDuplicates (myArr = [], prop = '') {
  return myArr.filter((obj, pos, arr) => {
    return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos
  })
}

const availableTypes = [
  'text',
  'bool',
  'empty',
  'number',
  'number_range',
  'date',
  'date_range',
  'select',
  'select_id',
  'select_multi',
  'select_multi_id',
]

class Item {
  constructor ({ field = '', label = null, type = null, types = null, value = null }) {
    this.field = field
    this.label = label
    this.type = type || 'text'
    this.types = this.createTypes(types)
    this.value = value
  }

  setField (field = '') {
    this.field = field
  }

  setType (type = '') {
    this.type = type
  }

  setValue (value = null) {
    this.value = value
  }

  getType (name) {
    return this.types.find(type => type.name === name)
  }

  getTypes () {
    return this.types
  }

  createTypes (types = null) {
    return this.checkTypes(types) || [
      { name: 'text', label: 'Search' },
      { name: 'empty', label: 'Empty' },
    ]
  }

  checkTypes (types = null) {
    if (!types) return null

    let validTypes = types.filter(type => {
      return availableTypes.indexOf(type.name) !== -1
    })

    return removeDuplicates(validTypes, 'name')
  }

  resetType () {
    this.type = 'text'
  }

  resetValue () {
    this.payload = null
  }

  reset () {
    this.resetType()
    this.resetValue()
  }
}

export class Filter {
  constructor (settings = []) {
    this.items = this.createItems(settings)

    this.selectedItems = []
  }

  createItems (settings = []) {
    return settings.reduce((obj, item) => {
      obj[item.name] = new Item({
        field: item.name,
        label: item.label,
        types: item.filterTypes,
      })
      return obj
    }, {})
  }

  setItems (items = []) {
    return items.reduce((obj, item) => {
      obj[item.field] = new Item({
        field: item.field,
        label: item.label,
        types: item.types
      })
      return obj
    }, {})
  }

  hasItem (item) {
    return this.items.hasOwnProperty(item)
  }

  getItem (item) {
    return this.items[item]
  }

  setItem (item, type, value) {
    if (!this.hasItem(item)) return

    this.getItem(item).setType(type)
    this.getItem(item).setValue(value)
  }

  clearItem (item) {
    if (!this.hasItem(item)) return

    this.getItem(item).setType(null)
    this.getItem(item).setValue(null)
  }

  getFilter () {
    return this.filter
  }

  getSelectedItem (item = null) {
    if (!item || !this.isItemSelected(item)) return null

    return this.getItem(item)
  }

  addSelectedItem (item, type, value) {
    if (!this.hasItem(item) || this.isItemSelected(item)) return

    this.setItem(item, type, value)

    this.selectedItems.push(item)
  }

  removeSelectedItem (item) {
    if (!this.hasItem(item) || !this.isItemSelected(item)) return

    this.clearItem(item)

    let index = this.getSelectedItemIndex(item)
    this.selectedItems.splice(index, 1)
  }

  hasSelectedItems () {
    return this.selectedItems.length > 0
  }

  isItemSelected (item) {
    return this.selectedItems.includes(item)
  }

  getSelectedItemIndex (item) {
    return this.selectedItems.indexOf(item)
  }

  getSelectedItemsLength () {
    return this.selectedItems.length
  }

  clearSelectedItems () {
    this.selectedItems = []
  }

  getSelectedItems () {
    return this.selectedItems.map(item => {
      return this.getItem(item)
    })
  }

  convertValueType (value) {
    switch (typeof value) {
      case 'string': {
        return JSON.parse(value)
      }
      case 'number': {
        return value > 0 ? 1 : 0
      }
      case 'boolean': {
        return value
      }
      default: return value
    }
  }

  setSelectedItemsFromRouter (query = {}) {
    Object.keys(query).forEach(entry => {
      let item = {
        field: entry.split(':')[0],
        type: entry.split(':')[1],
        value: query[entry]
      }

      if (item.type === 'bool' || item.type === 'empty') {
        item.value = this.convertValueType(item.value)
      }

      if (item.type === 'select_multi') {
        item.value = item.value.split(',')
      }

      if (item.type === 'select_id' || item.type === 'select_multi_id') {
        item.value = item.value.split(',').map(value => {
          return {
            id: value.split('.')[0],
            name: value.split('.')[1],
          }
        })
      }

      this.addSelectedItem(item.field, item.type, item.value)
    })
  }

  getSelectedItemsForRouter () {
    if (!this.hasSelectedItems()) return null

    return this.getSelectedItems().reduce((obj, item) => {
      let value = item.value

      if (item.type === 'select_multi') {
        value = value.join(',')
      }

      if (item.type === 'select_id') {
        value = [value.id, value.name].join('.')
      }

      if (item.type === 'select_multi_id') {
        value = value.map(item => {
          return [item.id, item.name].join('.')
        }).join(',')
      }

      obj[`${item.field}:${item.type}`] = value

      return obj
    }, {})
  }

  getSelectedItemsForApi () {
    if (!this.hasSelectedItems()) return null

    return this.getSelectedItems().map(item => {
      let value = item.value

      if (item.type === 'select_multi') {
        value = value.join(',')
      }

      if (item.type === 'select_id') {
        value = value.id
      }

      if (item.type === 'select_multi_id') {
        value = value.map(item => {
          return item.id
        }).join(',')
      }

      return {
        field: item.field,
        type: item.type,
        value: value.toString(),
      }
    })
  }
}