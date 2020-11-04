<template>
  <div>
    <v-toolbar
      flat
      color="white"
      dense
    >
      <v-icon>map</v-icon>
      <v-toolbar-title>
        Map
      </v-toolbar-title>

      <v-spacer />

      <span class="error--text">{{ errorMessage }}</span>

      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn :disabled="!lastSurvey || !!errorMessage" v-on="on" icon @click="generatePlotMap">
            <v-icon>update</v-icon>
          </v-btn>
        </template>
        <span>Generate plot polygon</span>
      </v-tooltip>

      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn :disabled="!loading && !polygonFeatures.length" v-on="on" icon @click="toggleBaselayer">
            <v-icon>{{ !selectedBaselayer ? 'layers' : 'layers_clear' }}</v-icon>
          </v-btn>
        </template>
        <span>{{ !selectedBaselayer ? 'Show' : 'Hide' }} satellite basemap</span>
      </v-tooltip>

      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn :disabled="!loading && !polygonFeatures.length" v-on="on" icon @click="editPlotOnMap">
            <v-icon>map</v-icon>
          </v-btn>
        </template>
        <span>Edit plot on map</span>
      </v-tooltip>
    </v-toolbar>
    <div style="width: 100%; height: 400px; display: flex; background-color: rgb(55, 71, 79);">
      <template v-if="loading">
        <div style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;">
          <div style="color: #fff;" class="headline">Loading map...</div>
        </div>
      </template>
      <map-component
        ref="mapComponent"
        v-if="!loading && polygonFeatures.length"
        :access-token="accessToken"
        @event:loaded="setMapLoaded"
      >
        <baselayer-component
          :layer="selectedBaselayer"
        />
        <polygon-features-component
          :features="polygonFeatures"
        />
      </map-component>
      <template v-if="!loading && !polygonFeatures.length">
        <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; width: 100%; height: 100%;">
          <div style="color: #fff;" class="headline mb-3">No Polygon found</div>
          <div @click="popup.upload = true"><v-btn color="success">Upload</v-btn></div>
        </div>

        <popup-component
          v-model="popup.upload"
          title="Upload Geojson"
          cancel-label="Cancel"
          hide-confirm-btn
          has-content
          max-width="400px"
        >
          <upload-geo-component
            :uploadFunction="uploadGeojson"
            @success="popup.upload = null"
          />
        </popup-component>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import { feature } from '@turf/turf'

import MapComponent from '@/components/of-map/Map'
import BaselayerComponent from '@/components/of-map/Baselayer'
import PolygonFeaturesComponent from '@/components/of-map/PolygonFeatures'
import PopupComponent from '@/components/Popup'
import UploadGeoComponent from '@/components/of-map/ParseGeojson'

const ACCESS_TOKEN = process.env.VUE_APP_MAP_MAPBOX_TOKEN

export default {
  props: {
    id: {
      type: String,
      default: null
    }
  },

  components: {
    MapComponent,
    BaselayerComponent,
    PolygonFeaturesComponent,
    PopupComponent,
    UploadGeoComponent,
  },

  data () {
    return {
      accessToken: ACCESS_TOKEN,
      loading: true,
      polygonFeatures: [],
      popup: {
        upload: null,
      },
      selectedBaselayer: null,
      errorMessage: null,
    }
  },

  watch: {
    identifier: {
      handler: 'fetchMapItems',
      immediate: true,
    }
  },

  computed: {
    ...mapState('plot', {
      item: state => state.item,
      lastSurvey: state => {
        return state.surveys.length
          ? state.surveys[0]
          : null
      },
    }),

    identifier () {
      return this.id
    },
  },

  methods: {
    ...mapActions('plot', {
      fetch: 'fetchItemMap',
      parseGeojson: 'parseGeojson',
      updatePlotPolygon: 'updatePlotPolygon',
      generatePlot: 'generatePlotMap',
      forcePlot: 'forcePlotMap',
    }),

    editPlotOnMap () {
      this.$router.push({
        name: 'map',
        params: {
          plotId: this.id
        }
      })
    },

    async fetchMapItems (value) {
      if (!value) return

      await this.fetch(value).then(feature => {
        if (feature) {
          this.polygonFeatures = [feature]
        }

        this.loading = false
      })
    },

    async uploadGeojson (payload) {
      this.loading = true

      const response = await this.parseGeojson(payload)

      await this.updatePlotPolygon({
        id: this.id,
        geodata: JSON.stringify(response)
      })

      await this.fetchMapItems(this.id)

      return response
    },

    generatePlotMap () {
      if (!this.id) return

      this.generatePlot(this.id)
        .then(response => {
          const polygon = response.polygon
          this.polygonFeatures = polygon ? [feature(polygon)] : []

          this.loading = false

          this.fitInitalBounds()
        })
        .catch(response => {
          if (
            response !== undefined &&
            response.hasOwnProperty('response') &&
            response.response.hasOwnProperty('data')
          ) {
            const errorObj = response.response.data

            this.errorMessage = errorObj.message || 'Error!'
          }
        })
    },

    forcePlotMap () {
      if (!this.lastSurvey) return

      this.forcePlot(this.lastSurvey.id)
        .then(response => {
          const polygon = response.polygon
          this.polygonFeatures = polygon ? [feature(polygon)] : []

          this.loading = false

          this.fitInitalBounds()
        })
        .catch(response => {
          if (
            response !== undefined &&
            response.hasOwnProperty('response') &&
            response.response.hasOwnProperty('data')
          ) {
            const errorObj = response.response.data

            this.errorMessage = errorObj.message || 'Error!'
          }
        })
    },

    setMapLoaded (loaded) {
      if (!loaded) return

      this.fitInitalBounds()
    },

    fitInitalBounds () {
      if (!this.polygonFeatures.length) return

      this.fitBounds(this.polygonFeatures)
    },

    fitBounds (features, animate = false) {
      if (!this.$refs.mapComponent) return

      this.$refs.mapComponent.fitBounds({
        features,
        animate,
        padding: 20,
        maxZoom: 18,
      })
    },

    toggleBaselayer () {
      const selected = !this.selectedBaselayer ? 'bing_satellite' : null

      this.selectedBaselayer = selected
      this.$parent.baselayer = selected
    },
  },
}
</script>

<style>

</style>
