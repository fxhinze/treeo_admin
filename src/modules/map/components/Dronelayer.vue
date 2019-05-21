<script>
// mapbox api
// doku: https://www.mapbox.com/api-documentation/?language=JavaScript#maps

const ACCESS_TOKEN = process.env.VUE_APP_MAP_MAPBOX_TOKEN

export default {
  props: {
    layers: {
      type: Array,
      default: () => [],
    }
  },

  created () {
    this.$emit('available-layers', this.dronelayers)
  },

  mounted () {
    this.onInit()
  },

  data () {
    return {
      dronelayers: [
        {
          id: 'drone-image-2016',
          label: '2016',
          tiles: [
            'stefanhaas.95fde065',
          ]
        },
        {
          id: 'drone-image-2017',
          label: '2017',
          tiles: [
            'stefanhaas.fd6cd82a',
            'stefanhaas.96cbe5f0',
            'stefanhaas.a4415b05',
          ]
        },
        {
          id: 'drone-image-2018',
          label: '2018',
          tiles: [
            'stefanhaas.0de4d643',
            'stefanhaas.cc102216',
            'stefanhaas.603e14f6',
            'stefanhaas.da3afe33',
            'stefanhaas.127827ea',
            'stefanhaas.4829405c',
          ]
        }
      ]
    }
  },

  computed: {
    map () {
      return this.$parent.map
    },
  },

  watch: {
    layers: {
      handler: 'setLayers',
    }
  },

  methods: {
    onInit () {
      this.setLayers(this.layers)
    },

    setLayers (value) {
      this.dronelayers.forEach(layer => this.setLayer(layer, value))
    },

    setLayer (layer, selectedIds) {
      const isVisible = selectedIds.indexOf(layer.id) > -1

      if (!this.map.getSource(layer.id)) {
        this.map.addSource(layer.id, {
          type: 'raster',
          tiles: layer.tiles.map(tile => {
            return `https://api.mapbox.com/v4/${tile}/{z}/{x}/{y}.png?access_token=${ACCESS_TOKEN}`
          }),
          tileSize: 256,
          minzoom: 10,
          maxzoom: 20,
        })
      }

      if (!this.map.getLayer(layer.id)) {
        this.map.addLayer({
          id: layer.id,
          type: 'raster',
          source: layer.id,
          layout: {
            visibility: isVisible ? 'visible' : 'none',
          },
        }, 'dronelayer-placeholder')
      }

      this.map.setLayoutProperty(layer.id, 'visibility', isVisible ? 'visible' : 'none')
    },
  },

  render () {
    return null
  },

  beforeDestroy () {
  }
}
</script>
