class Column {
  constructor (settings) {
    this.name = name
  }

  getName () {
    return this.name
  }

  isVisible () {
    return this.visible
  }
}

export class TBody {
  constructor (settings = []) {
    this.columns = this.createColumns(settings)
    this.columnsVisible = this.createColumnsVisible(this.columns)
  }

  createColumns (settings) {
    return settings.reduce((obj, item) => {
      obj[item.name] = new Column(item)
      return obj
    }, {})
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