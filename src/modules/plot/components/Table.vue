<template>
  <datatable-wrapper-component
    store-module="plot"
    :config="config"
    title="PLOTS"
    title-edit-item="EDIT PLOT"
    title-delete-item="DELETE PLOT"
    title-chart-item="STATISTIC PLOTS"
    router-name-on-create="plot-create"
    router-name-on-forward="plot-overview"
    :form-component="form"
    :chart-component="chart"
    :download-component="download"
  />
</template>

<script>
import DatatableWrapperComponent from '@/components/DatatableComplexWrapper'
import FormComponent from './Form'
import ChartPlotComponent from './ChartPlot'
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
      chart: ChartPlotComponent,
      download: DownloadComponent,
    }
  },
}
</script>
