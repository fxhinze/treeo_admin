<template>
  <datatable-wrapper-component
    store-module="plantingDistance"
    :config="config"
    title="PLANTING DISTANCES"
    title-create-item="CREATE PLANTING DISTANCE"
    title-edit-item="EDIT PLANTING DISTANCE"
    title-delete-item="DELETE PLANTING DISTANCE"
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
