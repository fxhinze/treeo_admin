<script>
import api from '@/api'

function removeLayerBaseLayer ({
  map = null,
  type,
}) {
  if (!map) return

  if (map.getLayer(type)) {
    map.removeLayer(type)
  }

  if (map.getSource(type)) {
    map.removeSource(type)
  }
}

function toggleLayerBaseLayer ({
  map = null,
  type,
  source
}) {
  if (!map) return

  removeLayerBaseLayer({ map, type })

  map.addSource(type, source)
  map.addLayer({
    id: type,
    type: 'raster',
    source: type,
  }, 'baselayer-placeholder')
}

export default {
  props: {
    layer: {
      type: String,
      default: 'bing_satellite'
    }
  },

  created () {
    this.$emit('available-layers', this.baselayers)
  },

  mounted () {
    this.onInit()
  },

  data () {
    return {
      baselayers: [
        { label: 'Bing - Satellite', name: 'bing_satellite' },
        { label: 'Bing - Hybrid', name: 'bing_hybrid' },
        { label: 'Bing - Streets', name: 'bing_streets' },
        { label: 'Mapbox - Satellite', name: 'mapbox_satellite' },
        { label: 'Mapbox - Hybrid', name: 'mapbox_streets-satellite' },
        { label: 'Mapbox - Streets', name: 'mapbox_streets' },
        { label: 'Mapbox - Light', name: 'mapbox_light' },
        { label: 'Mapbox - Dark', name: 'mapbox_dark' },
        { label: 'Mapbox - Streets Basic ', name: 'mapbox_streets-basic' },
        { label: 'Mapbox - Outdoors', name: 'mapbox_outdoors' },
        { label: 'Mapbox - High Contrast', name: 'mapbox_high-contrast' },
      ]
    }
  },

  computed: {
    map () {
      return this.$parent.map
    },
  },

  watch: {
    layer: {
      handler: 'setLayer',
    }
  },

  methods: {
    onInit () {
      this.setLayer(this.layer)
    },

    async setLayer (value) {
      if (!value) {
        return removeLayerBaseLayer({
          map: this.map,
          type: 'baselayer'
        })
      }

      const source = await api.map.fetchBaselayerSource(value)

      if (source) {
        return toggleLayerBaseLayer({
          map: this.map,
          type: 'baselayer',
          source: source,
        })
      }

      return removeLayerBaseLayer({
        map: this.map,
        type: 'baselayer'
      })
    },
  },

  render () {
    return null
  },
}
</script>
