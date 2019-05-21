<template>
  <datatable-wrapper-component
    store-module="district"
    :config="config"
    title="DISTRICTS"
    title-create-item="CREATE DISTRICT"
    title-edit-item="EDIT DISTRICT"
    title-delete-item="DELETE DISTRICT"
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
