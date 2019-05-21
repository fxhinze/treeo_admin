<script>
import mapboxgl from 'mapbox-gl'

import { featureCollection, bbox } from '@turf/turf'

let tooltipFeatureId = null

export default {
  props: {
    features: {
      type: Array,
      default: () => [],
    },
  },

  mounted () {
    this.$nextTick(() => {
      this.addLayerAndSource()
    })
  },

  data () {
    return {
      tooltip: new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      }),
    }
  },

  watch: {
    features: {
      handler (value) {
        this.setSource(value)
        this.fitBounds(value)
      },
      immediate: true,
    },
  },

  computed: {
    map () {
      return this.$parent.map
    },
  },

  methods: {
    setSource (features = []) {
      this.$nextTick(() => {
        if (this.map.getSource('points')) {
          this.map.getSource('points').setData(
            featureCollection(features)
          )
        }
      })
    },

    fitBounds (features = []) {
      // this.$parent.fitBounds({
      //   features,
      //   padding: 20,
      // })
    },

    addLayerAndSource () {
      if (!this.map.getSource('points')) {
        this.map.addSource('points', {
          type: 'geojson',
          data: featureCollection(this.features)
        })
      }

      if (!this.map.getLayer('points-circle')) {
        this.map.addLayer({
          id: 'points-circle',
          type: 'circle',
          source: 'points',
          paint: {
            'circle-radius': 7,
            // 'circle-radius': ['get', 'dbh_cm'],
            'circle-color': '#ff5723',
            'circle-stroke-width': 1,
            'circle-stroke-color': '#ffffff',
          }
        })

        // add events
        this.map.on('mousemove', 'points-circle', this.onMouseMoveFeature)
        this.map.on('mouseleave', 'points-circle', this.onMouseLeaveFeature)
        this.map.on('movestart', this.onMouseLeaveFeature)
      }
    },

    onMouseMoveFeature (event) {
      if (event.features.length) {
        this.map.getCanvas().style.cursor = 'pointer'

        this.tooltip.setLngLat(event.lngLat)

        let feature = event.features[0]

        if (feature.properties.id !== this.tooltipFeatureId) {
          this.tooltip
            .setLngLat(event.lngLat)
            .setHTML(feature.properties.id)
            .addTo(this.map)
          this.tooltip.setHTML(feature.properties.id)

          this.tooltipFeatureId = feature.properties.id
        }
      }
    },

    onMouseLeaveFeature (event) {
      this.map.getCanvas().style.cursor = ''

      this.tooltip.remove()

      this.tooltipFeatureId = null
    },
  },

  render () {
    return null
  },

  beforeDestroy () {
    if (this.map.getLayer('points-circle')) {
      this.map.removeLayer('points-circle')
    }

    if (this.map.getSource('points')) {
      this.map.removeSource('points')
    }

    // remove events
    this.map.off('mousemove', 'points-circle', this.onMouseMoveFeature)
    this.map.off('mouseleave', 'points-circle', this.onMouseLeaveFeature)
    this.map.off('movestart', this.onMouseLeaveFeature)
  },
}
</script>
