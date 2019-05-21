<template>
  <div>
    <v-toolbar
      flat
      color="white"
      dense
    >
      <v-icon>nature</v-icon>
      <v-toolbar-title>
        Trees
      </v-toolbar-title>

      <v-spacer />

      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn :disabled="!mapHasFeatures" v-on="on" icon @click="fitArea">
            <v-icon>search</v-icon>
          </v-btn>
        </template>
        <span>Fit area</span>
      </v-tooltip>

      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn :disabled="!mapHasFeatures" v-on="on" icon @click="toggleBaselayer">
            <v-icon>{{ !baselayer ? 'layers' : 'layers_clear' }}</v-icon>
          </v-btn>
        </template>
        <span>{{ !baselayer ? 'Show' : 'Hide' }} satellite basemap</span>
      </v-tooltip>

      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn :disabled="!mapHasFeatures" v-on="on" icon @click="editPlotOnMap">
            <v-icon>map</v-icon>
          </v-btn>
        </template>
        <span>Edit plot on map</span>
      </v-tooltip>
    </v-toolbar>

    <detail-trees-map-component
      ref="mapComponent"
      :id="id"
      @event:loaded="setMapLoaded"
    />

    <detail-trees-table-component
      :id="id"
    />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import DetailTreesMapComponent from './DetailTreesMap'
import DetailTreesTableComponent from './DetailTreesTable'

export default {
  props: {
    id: {
      type: String,
      default: null
    }
  },

  components: {
    DetailTreesMapComponent,
    DetailTreesTableComponent,
  },

  mounted () {
  },

  data () {
    return {
      mapHasFeatures: false,
      baselayer: null,
    }
  },

  computed: {
    ...mapState('survey', {
      item: state => state.item,
    }),

    plotId () {
      return this.item ? this.item.plot_id : null
    },
  },

  methods: {
    editPlotOnMap () {
      this.$router.push({
        name: 'map',
        params: {
          plotId: this.plotId
        }
      })
    },

    setMapLoaded () {
      this.mapHasFeatures = true
    },

    fitArea () {
      const map = this.$refs.mapComponent
      if (!map) return

      const features = map.features

      map.fitBounds(features, false)
    },

    toggleBaselayer () {
      const map = this.$refs.mapComponent
      if (!map) return

      map.toggleBaselayer()
    },
  }
}
</script>

<style>

</style>
