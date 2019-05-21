<template>
  <datatable-wrapper-component
    store-module="project"
    :config="config"
    title="PROJECTS"
    title-create-item="CREATE PROJECT"
    title-edit-item="EDIT PROJECT"
    title-delete-item="DELETE PROJECT"
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
