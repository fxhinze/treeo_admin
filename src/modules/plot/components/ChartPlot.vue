<template>
  <div class="of-chart__container">
    <div class="of-chart__header">
      <v-toolbar :extended="configVisible" flat dark class="blue-grey darken-3">
        <v-toolbar-side-icon @click="$emit('action:close')">
          <v-icon>close</v-icon>
        </v-toolbar-side-icon>
        <v-toolbar-title>PLOT CHART</v-toolbar-title>

        <v-spacer />

        <div v-if="selectedFilters.length">
          <v-chip v-for="(item, index) in selectedFilters" :key="index" small color="white" text-color="blue-grey darken-3">
            <span class="label mr-2">{{ item.label }}:</span>
            {{ getValue(item) }}
          </v-chip>
        </div>

        <div v-else>
          <v-chip small color="white" text-color="blue-grey darken-3">
            <span class="label mr-2">no filter selected</span>
          </v-chip>
        </div>
        <template v-slot:extension v-if="configVisible">
          <div style="width: 200px;" class="mr-3">
            <v-select
              v-model="selectedItems.xAxis"
              :items="selectableItemsWithoutEmpty"
              label="x-Axis"
              item-text="label"
              item-value="id"
              return-object
              hide-details
              flat
              dense
              color="grey"
            />
          </div>
          <v-divider vertical />
          <div style="width: 200px;" class="mx-3">
            <v-select
              v-model="selectedItems.yAxis"
              :items="selectableItemsWithoutEmpty"
              label="y-Axis"
              item-text="label"
              item-value="id"
              return-object
              hide-details
              flat
              dense
              color="grey"
            />
          </div>
          <v-divider vertical />
          <div style="width: 200px;" class="mx-3">
            <v-select
              v-model="selectedItems.color"
              :items="selectableItemsWithoutEmpty"
              label="Color"
              item-text="label"
              item-value="id"
              return-object
              hide-details
              flat
              dense
              color="grey"
            />
          </div>
          <v-divider vertical />
          <div style="width: 200px;" class="mx-3">
            <v-select
              v-model="selectedItems.size"
              :items="selectableItemsWithoutEmpty"
              label="Size"
              item-text="label"
              item-value="id"
              return-object
              hide-details
              flat
              dense
              color="grey"
            />
          </div>
          <v-divider vertical />
          <div style="width: 200px;" class="mx-3">
            <v-select
              v-model="selectedItems.facet"
              :items="selectableItemsFacet"
              label="Facet"
              item-text="label"
              item-value="id"
              return-object
              hide-details
              flat
              dense
              color="grey"
            />
          </div>
          <v-divider vertical />
          <div class="ml-3">
            <v-btn flat dark @click="updateChart">
              Update
            </v-btn>
          </div>
        </template>
      </v-toolbar>
    </div>
    <div class="of-chart__body pa-4">
      <div :id="id" />
    </div>
    <transition name="fade" mode="out-in">
      <div v-if="loadStatus < 2" class="of-chart__loading white--text blue-grey darken-3">
        <div class="title">Loading...</div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import { Chart } from 'taucharts'
import 'taucharts/dist/taucharts.dark.css'
import 'taucharts/dist/plugins/tooltip.dark.css'
import 'taucharts/dist/plugins/legend.dark.css'
import 'taucharts/dist/plugins/category-filter.dark.css'
import tooltip from 'taucharts/dist/plugins/tooltip'
import legend from 'taucharts/dist/plugins/legend'
import categoryFilter from 'taucharts/dist/plugins/category-filter'

import axios from 'axios'

import {
  numberWithCommas,
  dateDiffMonths,
} from '@/utils/helpers'

let chartInstance = null

let createChartConfig = ({
  dimensions = {},
  formatters = {},
  selectedItems = {},
  data
}) => {
  let { xAxis, yAxis, color, size, facet } = selectedItems

  let guide = [
    {
      size: { label: { text: size.label } },
      color: { label: { text: color.label } },
      x: { label: { text: xAxis.label } },
      y: { label: { text: yAxis.label } },
    },
  ]

  let y = yAxis.id

  if (facet.id !== 'none') {
    guide.unshift({
      y: { label: { text: facet.label }, nice: true },
      split: false,
    })

    y = [facet.id, yAxis.id]
  }

  return {
    type: 'scatterplot',
    dimensions: dimensions,
    guide: guide,
    x: xAxis.id,
    y: y,
    size: size.id,
    color: color.id,
    data: data,
    id: 'id',
    settings: {
      asyncRendering: true,
      renderingTimeout: 20000,
      xDensityPadding: 20,
      yDensityPadding: 20,
      yAxisPadding: 20,
    },
    plugins: [
      tooltip({
        formatters: {
          'id': {
            label: 'Link',
            format: function (n) {
              return '<a href="/plots/overview/' + n + '">Show plot details</a>'
            }
          },
          ...formatters,
        },
        escapeHtml: false
      }),
      legend(),
      categoryFilter(),
    ]
  }
}

function calcAge (survey_date, planting_date) {
  if (!survey_date || !planting_date) return 0

  try {
    let surveyDate = new Date(survey_date)
    let plantingDate = new Date(planting_date)

    return dateDiffMonths(surveyDate, plantingDate)
  } catch (error) {
    return 0
  }
}

export default {
  props: {
    id: {
      type: String,
      default: 'chart'
    },

    filter: {
      type: Object,
      default: () => {},
    },
  },

  created () {
    this.selectedItems = {
      ...this.selectedItems,
      ...this.getDynamicColumns(),
    }

    this.setDynamicColumns()
  },

  async mounted () {
    this.loadStatus = 1

    try {
      const response = await this.fetch({
        cancelToken: new axios.CancelToken(this.setCancel)
      })

      this.features = response.map(feature => {
        return {
          'id': feature.id,
          'trees_per_ha': parseInt(feature.trees_per_ha || 0), // Bäume/ha
          'planting_year': parseInt(feature.planting_date ? feature.planting_date.slice(0, 4) : 0), // Jahr
          'tree_count': parseInt(feature.latest_survey_treecount || 0), // Bäume
          'volume': parseFloat(feature.latest_survey_tree_volume) || 0.0, // Volume
          'diameter': parseFloat(feature.latest_survey_dbh_mean) || 0.0, // Durchmesser
          'height': parseFloat(feature.latest_survey_height_mean) || 0.0, // Höhe
          'value_ird': parseInt(feature.latest_survey_value_ird) || 0, // Wert IRD
          'value_usd': parseInt(feature.latest_survey_value_usd) || 0, // Wert USD
          'soil_type': feature.soil_type || 'Not set', // Soiltype
          'area_m2': parseInt(feature.area_m2) || 0, // Area
          'survey_count': parseInt(feature.survey_count) || 0, // Survey Anzahl
          'age': calcAge(feature.latest_survey_date, feature.planting_date) // Last survey (date) - PLanting date (date)
        }
      })

      this.loadStatus = 2
    } catch (error) {
      this.loadStatus = 2
    }
  },

  data () {
    return {
      counter: 0,
      loadStatus: 0,
      features: [],
      cancelToken: null,
      configVisible: true,
      selectableItems: [
        {
          id: 'none',
          label: 'none',
          dimensions: 'none',
        },
        {
          id: 'diameter',
          label: 'diameter (cm)',
          dimensions: 'measure',
        },
        {
          id: 'height',
          label: 'height (m)',
          dimensions: 'measure',
        },
        {
          id: 'volume',
          label: 'volume [m³]',
          dimensions: 'measure',
        },
        {
          id: 'trees_per_ha',
          label: 'trees/ha',
          dimensions: 'measure',
        },
        {
          id: 'planting_year',
          label: 'planting year',
          dimensions: 'order',
        },
        {
          id: 'tree_count',
          label: 'tree count',
          dimensions: 'measure',
        },
        {
          id: 'value_ird',
          label: 'value [IRD]',
          dimensions: 'measure',
          format: value => numberWithCommas(value),
        },
        {
          id: 'value_usd',
          label: 'value [USD]',
          dimensions: 'measure',
          format: value => numberWithCommas(value),
        },
        {
          id: 'soil_type',
          label: 'soiltype',
          dimensions: 'category',
        },
        {
          id: 'area_m2',
          label: 'area [m³]',
          dimensions: 'measure',
        },
        {
          id: 'survey_count',
          label: '# surveys',
          dimensions: 'measure',
        },
        {
          id: 'age',
          label: 'age [months]',
          dimensions: 'measure',
        },
      ],
      selectedItems: {
        xAxis: {
          id: 'diameter',
          label: 'diameter (cm)',
          dimensions: 'measure',
        },
        yAxis: {
          id: 'height',
          label: 'height (m)',
          dimensions: 'measure',
        },
        size: {
          id: 'volume',
          label: 'volume [m³]',
          dimensions: 'measure',
        },
        color: {
          id: 'trees_per_ha',
          label: 'trees/ha',
          dimensions: 'measure',
        },
        facet: {
          id: 'planting_year',
          label: 'planting year',
          dimensions: 'order',
        },
      }
    }
  },

  watch: {
    loadStatus (value) {
      if (value === 2 && this.hasFeatures) {
        this.setFeatures()
      }
    },
    immediate: true,
  },

  computed: {
    hasFeatures () {
      return this.features.length > 0
    },

    selectedFilters () {
      return this.filter.getSelectedItems()
    },

    dimensions () {
      let dimensions = {}
      this.selectableItemsWithoutEmpty.forEach(item => {
        dimensions[item.id] = { type: item.dimensions }
      })
      return dimensions
    },

    formatters () {
      let formatters = {}
      this.selectableItemsWithoutEmpty.forEach(item => {
        formatters[item.id] = {
          label: item.label
        }

        if (item.hasOwnProperty('format')) {
          formatters[item.id]['format'] = item.format
        }
      })
      return formatters
    },

    selectableItemsWithoutEmpty () {
      return this.selectableItems.filter(item => {
        return item.dimensions !== 'none'
      })
    },

    selectableItemsFacet () {
      return this.selectableItems.filter(item => {
        return item.dimensions === 'order' || item.dimensions === 'category' || item.dimensions === 'none'
      })
    }
  },

  methods: {
    ...mapActions('plot', {
      fetch: 'fetchItemsChart',
    }),

    initChart (features = []) {
      this.destroyChart()

      this.$nextTick(() => {
        chartInstance = new Chart(
          createChartConfig({
            dimensions: this.dimensions,
            formatters: this.formatters,
            selectedItems: this.selectedItems,
            data: features,
          })
        )

        chartInstance.renderTo('#' + this.id)
      })
    },

    updateChart () {
      this.setDynamicColumns()

      this.initChart(this.features)
    },

    setFeatures () {
      if (chartInstance) {
        chartInstance.setData(this.features)
      } else {
        this.initChart(this.features)
      }
    },

    getValue (filter) {
      switch (filter.type) {
        case 'empty': {
          return filter.value ? 'FILLED' : 'EMPTY'
        }

        case 'select_multi': {
          return filter.value.map(value => value).join(', ')
        }

        case 'select_id': {
          return filter.value.name
        }

        case 'select_multi_id': {
          return filter.value.map(value => value.name).join(', ')
        }

        default: {
          return filter.value
        }
      }
    },

    setCancel (cancel) {
      this.cancel = cancel
    },

    getSelectableItem (id) {
      return this.selectableItems.find(item => {
        return item.id === id
      })
    },

    getDynamicColumns () {
      const key = 'plot.chart:columns'

      let item = window.localStorage.getItem(key) || null

      if (item) {
        let selectableItems = this.selectableItems.map(item => item.id)
        let config = JSON.parse(item)
        let items = {}

        config.forEach(item => {
          if (selectableItems.indexOf(item.id)) {
            items[item.key] = this.getSelectableItem(item.id)
          }
        })

        return items
      }

      return {}
    },

    setDynamicColumns () {
      const key = 'plot.chart:columns'

      let config = Object.keys(this.selectedItems).map(item => {
        return {
          key: item,
          id: this.selectedItems[item].id
        }
      })
      window.localStorage.setItem(key, JSON.stringify(config))
    },

    destroyChart () {
      if (chartInstance) {
        chartInstance.destroy()
        chartInstance = null
      }
    },
  },

  beforeDestroy () {
    this.destroyChart()

    if (this.cancel) this.cancel('request abort')
  }
}
</script>

<style lang="scss">
.of-chart__container {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #37474F;
  overflow-y: auto;
}

.of-chart__header {
  position: sticky;
  top: 0;
  z-index: 5;

  .v-toolbar__content {
    border-bottom: 1px solid rgba(0,0,0,.12);
  }

  .v-toolbar__extension {
    border-bottom: 1px solid rgba(0,0,0,.12);
  }

  .v-input__slot {
    background-color: transparent !important;

    &:before {
      border-color: transparent !important;
    }
  }
}

.of-chart__container {
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  position: relative;
}

.of-chart__loading {
  position: absolute;
  z-index: 1;
  top: 0; left: 0; right: 0; bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.of-chart__body {
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;

  #chart {
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;

    .tau-chart__layout {
      flex: 1 0 auto;
      display: flex;
      flex-direction: column;
      // min-height: calc(100vh - 128px);
    }
  }

  .tau-chart__svg .label .label-token {
    text-transform: unset;
  }

  .tau-chart__legend__title,
  .tau-chart__category-filter__category__label {
    text-transform: unset;
  }
}

.tau-chart__tooltip {
  .tau-chart__tooltip__list__elem {

    a {
      color: #fff;
    }
  }
}
</style>
