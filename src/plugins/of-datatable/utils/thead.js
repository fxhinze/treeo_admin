class Column {
  constructor (settings) {
    let {
      primaryKey = false,
      name = '',
      label = 'No Label',
      width = 100,
      type = 'text',
      visible = true,
      defaultValue = null,
      tooltip = false,
      sort = true,
      sortable = true,
      searchable = true,
      resizable = true,
      filterable = true,
      fixedColumn = false,
    } = settings
    this.primaryKey = primaryKey
    this.name = name
    this.label = label
    this.width = width
    this.type = type
    this.visible = visible
    this.defaultValue = defaultValue
    this.tooltip = tooltip
    this.sort = sort
    this.sortable = sortable
    this.searchable = searchable
    this.resizable = resizable
    this.filterable = filterable
    this.fixedColumn = fixedColumn
  }

  getName () {
    return this.name
  }

  isVisible () {
    return this.visible
  }
}

export class THead {
  constructor (settings = []) {
    this.columns = this.createColumns(settings)
    this.columnsVisible = this.createColumnsVisible(this.columns)
  }

  createColumns (settings) {
    return {
      actions: new Column({
        name: 'actions',
        label: 'Actions',
        sort: false,
        sortable: false,
        searchable: false,
        resizable: false,
        filterable: false,
        fixedColumn: true,
      }),
      ...settings.reduce((obj, item) => {
        obj[item.name] = new Column({
          ...item,
          fixedColumn: false,
        })
        return obj
      }, {}),
    }
  }

  createColumnsVisible (columns) {
    return Object.keys(columns).filter(name => {
      return this.getColumn(name).isVisible()
    })
  }

  getColumns () {
    return this.columns
  }

  getColumn (name) {
    return this.columns[name]
  }
}