<template>
  <datatable-wrapper-component
    store-module="tree"
    :config="config"
    title="TREES"
    title-edit-item="EDIT TREE"
    title-delete-item="DELETE TREE"
    router-name-on-create="tree-create"
    router-name-on-forward="tree-overview"
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
