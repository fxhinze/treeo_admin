<template>
  <div class="of-chart__container">
    <div class="of-chart__header">
      <v-toolbar flat dark class="blue-grey darken-3">
        <v-toolbar-side-icon @click="$emit('action:close')">
          <v-icon>close</v-icon>
        </v-toolbar-side-icon>
        <v-toolbar-title>SURVEY CHART</v-toolbar-title>

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
      </v-toolbar>
      <v-divider dark />
    </div>
    <div style="" class="of-chart__body pa-4">
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

function getAge (dateTo, dateFrom) {
  const to = new Date(dateTo)
  const toUtc = Date.UTC(to.getFullYear(), to.getMonth(), to.getDate())
  const from = new Date(dateFrom)
  const fromUtc = Date.UTC(from.getFullYear(), from.getMonth(), from.getDate())
  return Math.floor((toUtc - fromUtc) / (1000 * 60 * 60 * 24))
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

  async mounted () {
    this.loadStatus = 1

    try {
      const response = await this.fetch({
        cancelToken: new axios.CancelToken(this.setCancel)
      })

      this.features = response.map(feature => {
        return {
          'date': feature.date_start.slice(0, 7),
          'age': getAge(feature.date_end, feature.date_start),
          'trees_per_ha': parseInt(feature.trees_per_ha || 0),
          'tree_volume': parseFloat(feature.tree_volume) || 0.0,
          'planting_year': feature.date_start.slice(0, 4),
        }
      })

      this.loadStatus = 2
    } catch (error) {
      this.loadStatus = 2
    }
  },

  data () {
    return {
      loadStatus: 0,
      chart: null,
      features: [],
      cancelToken: null,
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
  },

  methods: {
    ...mapActions('survey', {
      fetch: 'fetchItemsChart',
    }),

    initChart (features = []) {
      this.chart = new Chart({
        type: 'line',
        dimensions: {
          // 'Bäume/ha': { type: 'measure' },
          'planting_year': { type: 'order' },
          'date': { type: 'order' },
          'age': { type: 'measure' },
          'trees_per_ha': { type: 'measure' },
          'tree_volume': { type: 'measure' },
        },
        guide: [
          {
            x: {
              label: 'age'
            },
            y: {
              label: 'planting_year',
            },
          },
          {
            x: {
              label: 'date'
            },
            // padding: { b: 0, l: 24, t: 0, r: 10 }
          }
        ],
        x: ['date', 'age'],
        y: 'planting_year',
        size: 'tree_volume',
        color: 'trees_per_ha',
        data: features,
        settings: {
          // fitModel: 'entire-view',
          asyncRendering: true,
          // renderingTimeout: 500,
          // syncRenderingDuration: 0,
          xDensityPadding: 10
        },
        plugins: [
          tooltip(),
          legend(),
          categoryFilter(),
        ]
      })

      this.$nextTick(() => {
        this.chart.renderTo('#' + this.id)
      })
    },

    setFeatures () {
      if (this.chart) {
        this.chart.setData(this.features)
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
    }
  },

  beforeDestroy () {
    if (this.chart) {
      this.chart.destroy()
    }

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

</style>
