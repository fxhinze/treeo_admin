<template>
  <datatable-wrapper-component
    store-module="soilType"
    :config="config"
    title="SOIL TYPES"
    title-create-item="CREATE SOIL TYPE"
    title-edit-item="EDIT SOIL TYPE"
    title-delete-item="DELETE SOIL TYPE"
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
