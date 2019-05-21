<template>
  <datatable-wrapper-component
    store-module="survey"
    :config="config"
    title="SURVEYS"
    title-edit-item="EDIT SURVEY"
    title-delete-item="DELETE SURVEY"
    router-name-on-create="survey-create"
    router-name-on-forward="survey-overview"
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
  },
}
</script>
