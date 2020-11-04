<template>
  <datatable-wrapper-component
    store-module="farmer"
    :config="config"
    title="FARMERS"
    title-edit-item="EDIT FARMER"
    title-delete-item="DELETE FARMER"
    router-name-on-create="farmer-create"
    router-name-on-forward="farmer-overview"
    :form-component="form"
    :download-component="download"
  />
</template>

<script>
import DatatableWrapperComponent from '@/components/DatatableComplexWrapper'
import FormComponent from './Form'
import DownloadComponent from './Download'

import datatableConfig from './../datatable'

export default {
  components: {
    DatatableWrapperComponent,
  },

  data () {
    return {
      config: datatableConfig,
      form: FormComponent,
      download: DownloadComponent,
    }
  }
}
</script>
