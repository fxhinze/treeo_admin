<template>
  <datatable-wrapper-component
    store-module="species"
    :config="config"
    title="SPECIES"
    title-create-item="CREATE SPECIES"
    title-edit-item="EDIT SPECIES"
    title-delete-item="DELETE SPECIES"
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
