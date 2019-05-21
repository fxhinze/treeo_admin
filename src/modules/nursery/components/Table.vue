<template>
  <datatable-wrapper-component
    store-module="nursery"
    :config="config"
    title="NURSERIES"
    title-edit-item="EDIT NURSERY"
    title-delete-item="DELETE NURSERY"
    router-name-on-create="nursery-create"
    router-name-on-forward="nursery-overview"
    :form-component="form"
  />
</template>

<script>
import DatatableWrapperComponent from '@/components/DatatableComplexWrapper'
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
