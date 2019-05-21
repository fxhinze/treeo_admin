<template>
  <datatable-wrapper-component
    store-module="user"
    :config="config"
    title="USERS"
    title-edit-item="EDIT USER"
    title-delete-item="DELETE USER"
    router-name-on-create="user-create"
    router-name-on-forward="user-overview"
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
