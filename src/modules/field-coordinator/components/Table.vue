<template>
  <datatable-wrapper-component
    store-module="fieldCoordinator"
    :config="config"
    title="FIELD COORDINATORS"
    title-create-item="CREATE FIELD COORDINATOR"
    title-edit-item="EDIT FIELD COORDINATOR"
    title-delete-item="DELETE FIELD COORDINATOR"
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
