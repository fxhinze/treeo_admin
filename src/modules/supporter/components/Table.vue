<template>
  <datatable-wrapper-component
    store-module="supporter"
    :config="config"
    title="SUPPORTERS"
    title-edit-item="EDIT SUPPORTER"
    title-delete-item="DELETE SUPPORTER"
    router-name-on-create="supporter-create"
    router-name-on-forward="supporter-overview"
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
