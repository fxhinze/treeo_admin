<template>
  <div style="width: 100%; height: 400px; display: flex; background-color: rgb(55, 71, 79);">
    <template v-if="loading">
      <div style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;">
        <div style="color: #fff;" class="headline">Loading map...</div>
      </div>
    </template>
    <map-component
      ref="mapComponent"
      v-if="!loading && features.length > 0"
      :access-token="accessToken"
      @event:loaded="setMapLoaded"
    >
      <baselayer-component
        :layer="selectedBaselayer"
      />

      <polygon-features-component
        :features="polygonFeatures"
      />

      <point-features-component
        :features="pointFeatures"
      />
    </map-component>
    <template v-if="!loading && features.length === 0">
      <div style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;">
        <div style="color: #fff;" class="headline">No plot or trees found</div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import MapComponent from '@/components/of-map/Map'
import BaselayerComponent from '@/components/of-map/Baselayer'
import PolygonFeaturesComponent from '@/components/of-map/PolygonFeatures'
import PointFeaturesComponent from '@/components/of-map/PointFeatures'

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
    PointFeaturesComponent,
  },

  mounted () {
  },

  data () {
    return {
      accessToken: ACCESS_TOKEN,
      loading: true,
      features: [],
      polygonFeatures: [],
      pointFeatures: [],
      mapLoaded: false,
      selectedBaselayer: null,
    }
  },

  watch: {
    item: {
      handler (value) {
        if (!value) return

        this.fetch({
          plotId: value.plot_id || null,
          surveyId: value.id || null,
        }).then(({ polygon, points }) => {
          this.polygonFeatures = polygon ? [polygon] : []
          this.pointFeatures = points
          this.features = [
            ...this.polygonFeatures,
            ...this.pointFeatures,
          ]

          this.loading = false
        })
      },
      immediate: true,
    }
  },

  computed: {
    ...mapState('survey', {
      item: state => state.item,
    }),
  },

  methods: {
    ...mapActions('survey', {
      fetch: 'fetchMap',
      fetchPlotMap: 'fetchPlotMap',
    }),

    setMapLoaded (loaded) {
      if (!loaded) return

      this.fitInitalBounds()
    },

    fitInitalBounds () {
      if (!this.features) return

      const features = this.polygonFeatures.length
        ? this.polygonFeatures
        : this.pointFeatures

      this.fitBounds(features)

      this.$emit('event:loaded')
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
