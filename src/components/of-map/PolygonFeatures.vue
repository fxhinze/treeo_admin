<script>
import { featureCollection, bbox } from '@turf/turf'

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
        if (this.map.getSource('polygons')) {
          this.map.getSource('polygons').setData(
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
      if (!this.map.getSource('polygons')) {
        this.map.addSource('polygons', {
          type: 'geojson',
          data: featureCollection(this.features)
        })
      }

      if (!this.map.getLayer('polygons-fill')) {
        this.map.addLayer({
          id: 'polygons-fill',
          type: 'fill',
          source: 'polygons',
          paint: {
            'fill-color': '#00802b',
            'fill-opacity': 1
          }
        })
      }

      if (!this.map.getLayer('polygons-line')) {
        this.map.addLayer({
          id: 'polygons-line',
          type: 'line',
          source: 'polygons',
          paint: {
            'line-color': '#fff',
            'line-width': 2
          }
        })
      }
    },
  },

  render () {
    return null
  },

  beforeDestroy () {
    if (this.map.getLayer('polygons-fill')) {
      this.map.removeLayer('polygons-fill')
    }

    if (this.map.getLayer('polygons-line')) {
      this.map.removeLayer('polygons-line')
    }

    if (this.map.getSource('polygons')) {
      this.map.removeSource('polygons')
    }
  },
}
</script>
