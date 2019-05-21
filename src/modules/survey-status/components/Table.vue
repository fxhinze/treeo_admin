<template>
  <datatable-wrapper-component
    store-module="surveyStatus"
    :config="config"
    title="SURVEY STATUS"
    title-create-item="CREATE SURVEY STATUS"
    title-edit-item="EDIT SURVEY STATUS"
    title-delete-item="DELETE SURVEY STATUS"
    :form-component="form"
  />
</template>

<script>
import DatatableWrapperComponent from '@/components/DatatableSimpleWrapper'
import FormComponent from './Form'

import datatableConfig from './../datatable'

export default {
  components: {
    DatatableWrapperComponent,
  },

  data () {
    return {
      config: datatableConfig,
      form: FormComponent,
    }
  }
}
</script>
