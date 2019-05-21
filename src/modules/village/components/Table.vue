<template>
  <datatable-wrapper-component
    store-module="village"
    :config="config"
    title="VILLAGES"
    title-create-item="CREATE VILLAGE"
    title-edit-item="EDIT VILLAGE"
    title-delete-item="DELETE VILLAGE"
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
