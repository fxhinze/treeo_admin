<template>
  <datatable-wrapper-component
    store-module="legalStatus"
    :config="config"
    title="LEGAL STATUS"
    title-create-item="CREATE LEGAL STATUS"
    title-edit-item="EDIT LEGAL STATUS"
    title-delete-item="DELETE LEGAL STATUS"
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
