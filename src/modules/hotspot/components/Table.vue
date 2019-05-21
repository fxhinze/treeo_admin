<template>
  <datatable-wrapper-component
    store-module="hotspot"
    :config="config"
    title="HOTSPOTS"
    title-edit-item="EDIT HOTSPOT"
    title-delete-item="DELETE HOTSPOT"
    router-name-on-create="hotspot-create"
    router-name-on-forward="hotspot-overview"
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
