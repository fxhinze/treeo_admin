import FormComponent from './components/Form'
import AutocompleteComponent from './components/fields/Autocomplete'
import SelectComponent from './components/fields/Select'
import DateComponent from './components/fields/Date'
import TextComponent from './components/fields/Text'
import TextareaComponent from './components/fields/Textarea'
import CheckboxComponent from './components/fields/Checkbox'
import GeojsonComponent from './components/fields/Geojson'

export default {
  install (Vue) {
    Vue.component('of-form', FormComponent)
    Vue.component('of-form-field-autocomplete', AutocompleteComponent)
    Vue.component('of-form-field-select', SelectComponent)
    Vue.component('of-form-field-date', DateComponent)
    Vue.component('of-form-field-text', TextComponent)
    Vue.component('of-form-field-textarea', TextareaComponent)
    Vue.component('of-form-field-checkbox', CheckboxComponent)
    Vue.component('of-form-field-geojson', GeojsonComponent)
  }
}