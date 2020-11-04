<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import { featureCollection, bbox } from '@turf/turf'

import mapboxgl from 'mapbox-gl'

import { buildTooltipHtml, getUniqueFeatures } from './../helpers'

let tooltipFeatureId = null

export default {
  props: {
    mode: {
      type: String,
      default: 'default'
    }
  },

  data () {
    return {
      bounds: null,
      tooltip: new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      }),
    }
  },

  computed: {
    ...mapState('map', {
      plot: state => state.plot,
      plots: state => state.plots,
    }),

    map () {
      return this.$parent.map
    }
  },

  watch: {
    mode: { handler: 'setMode', immediate: true },
    plots: { handler: 'setSource', immediate: true },
  },

  methods: {
    setMode (value) {
      this.$nextTick(() => {
        this.addLayerAndSource()

        switch (value) {
          case 'edit': return this.modeEdit()
          default: return this.modeDefault()
        }
      })
    },

    addLayerAndSource () {
      if (!this.map.getSource('plots')) {
        this.map.addSource('plots', {
          type: 'geojson',
          data: featureCollection(this.plots)
        })
      }

      if (!this.map.getLayer('plots-fill')) {
        this.map.addLayer({
          id: 'plots-fill',
          type: 'fill',
          source: 'plots',
          paint: {
            'fill-color': '#F44336',
            'fill-opacity': 0.2
          }
        })
      }

      if (!this.map.getLayer('plots-line')) {
        this.map.addLayer({
          id: 'plots-line',
          type: 'line',
          source: 'plots',
          paint: {
            'line-color': '#F44336',
            'line-width': 1
          }
        })
      }
    },

    modeDefault () {
      this.map.setFilter('plots-fill', null)
      this.map.setFilter('plots-line', null)

      this.addEvents()
    },

    modeEdit () {
      if (this.plot) {
        this.map.setFilter('plots-fill', [ '!=', 'id', this.plot ])
        this.map.setFilter('plots-line', [ '!=', 'id', this.plot ])
      }

      this.removeEvents()

      // remove popups
      this.onMouseLeaveFeature()
    },

    setSource (features) {
      if (this.map.getSource('plots')) {
        this.$nextTick(() => {
          this.map.getSource('plots').setData(
            featureCollection(features)
          )
        })
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
            .setHTML(buildTooltipHtml(feature.properties))
            .addTo(this.map)
          this.tooltip.setHTML(buildTooltipHtml(feature.properties))

          this.tooltipFeatureId = feature.properties.id
        }
      }
    },

    onMouseLeaveFeature (event) {
      this.map.getCanvas().style.cursor = ''

      this.tooltip.remove()

      this.tooltipFeatureId = null
    },

    onMouseClickFeature (event) {
      if (event.features.length) {
        let feature = event.features[0]

        this.$emit('update:mode', {
          mode: 'edit',
          id: feature.properties.id,
          animate: true,
        })
      }
    },

    addEvents () {
      this.map.on('mousemove', 'plots-fill', this.onMouseMoveFeature)
      this.map.on('mouseleave', 'plots-fill', this.onMouseLeaveFeature)
      this.map.on('click', 'plots-fill', this.onMouseClickFeature)
      this.map.on('movestart', this.onMouseLeaveFeature)
    },

    removeEvents () {
      this.map.off('mousemove', 'plots-fill', this.onMouseMoveFeature)
      this.map.off('mouseleave', 'plots-fill', this.onMouseLeaveFeature)
      this.map.off('click', 'plots-fill', this.onMouseClickFeature)
      this.map.off('movestart', this.onMouseLeaveFeature)
    },
  },

  render () {
    return null
  },

  beforeDestroy () {
    if (this.map.getLayer('plots-fill')) {
      this.map.removeLayer('plots-fill')
    }

    if (this.map.getLayer('plots-line')) {
      this.map.removeLayer('plots-line')
    }

    if (this.map.getSource('plots')) {
      this.map.removeSource('plots')
    }

    this.removeEvents()
  }
}
</script>