class Field {
  constructor ({
    name = null,
    label = 'Label',
    settings = {},
    show = null,
    empty = false
  }, type = '') {
    this.name = name
    this.label = label
    this.value = null
    this.settings = settings
    this.show = show && show.hasOwnProperty(type) ? show : { [type]: true }
    this.type = type
    this.empty = empty
    this.errorMessages = []
  }

  getName () {
    return this.name
  }

  getValue () {
    return this.value
  }

  setValue (value) {
    this.value = value

    if (this.hasError()) {
      this.resetErrorMessages()
    }
  }

  getLabel (value) {
    return this.label
  }

  getSettings () {
    let settings = this.settings
    settings['label'] = this.getLabel()
    return settings
  }

  setSettings (settings = {}) {
    this.settings = {
      ...this.settings,
      ...settings,
    }
  }

  setDisabled (value = false) {
    this.setSettings({
      disabled: value,
    })
  }

  isVisible () {
    return this.show[this.type]
  }

  setError (error) {
    this.errorMessages = error || []
  }

  getErrorMessages () {
    return this.errorMessages
  }

  getErrorMsg () {
    return this.errorMessages[0]
  }

  resetErrorMessages () {
    this.errorMessages = []
  }

  hasError () {
    return this.errorMessages.length > 0
  }
}

export default class Form {
  constructor ({ fields = [], type = null }) {
    this.config = fields
    this.type = type
    this.fields = {}

    this.createFields()
  }

  createFields () {
    let fields = []
    this.config.forEach(field => {
      fields.push(new Field(field, this.type))
    })
    this.fields = fields
  }

  getField (name) {
    let field = this.fields.find(field => {
      return field.getName() === name
    }) || null

    return field && field.isVisible() ? field : null
  }

  setValues (values = {}) {
    Object.keys(values).forEach(value => {
      let field = this.getField(value)
      if (!field) return
      field.setValue(values[value])
    })
  }

  getValues () {
    let values = {}
    this.fields.forEach(field => {
      let value = field.getValue()
      let name = field.getName()

      if (typeof value === 'boolean') {
        values[name] = value ? 1 : 0
      } else if (value || field.empty) {
        values[name] = value || ''
      } else {
        values[name] = ''
      }
    })
    return values
  }

  setErrorMessages (values = {}) {
    Object.keys(values).forEach(key => {
      let field = this.getField(key)
      if (!field) return
      field.setError(values[key])
    })
  }

  setError (response) {
    if (
      response !== undefined &&
      response.hasOwnProperty('response') &&
      response.response.hasOwnProperty('data')
    ) {
      const errorObj = response.response.data

      this.errorMessage = errorObj.message || 'Error!'

      if (errorObj.status_code === 422) {
        this.setErrorMessages(errorObj.errors)
      }
    }
  }
}