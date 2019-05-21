<template>
  <div class="of-map-container">
    <div :id="mapId" class="of-map" />
    <div class="of-map-hidden">
      <slot v-if="loaded" :map="map" />
    </div>
    <div class="of-map-visible">
      <slot name="visible" />
    </div>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import cuid from 'cuid'
import { featureCollection, bbox } from '@turf/turf'

export default {
  props: {
    accessToken: {
      type: String,
      required: true
    },
    mapStyle: {
      type: String,
      default: 'empty-v9'
    },
    mapSprite: {
      type: String,
      default: 'satellite-v9'
    },
    hideNavigationControl: {
      type: Boolean,
      default: false,
    },
    staticMap: {
      type: Boolean,
      default: false,
    }
  },

  created () {
    mapboxgl.accessToken = this.accessToken
  },

  mounted () {
    this.$nextTick(() => {
      this.$emit('event:loaded', this.loaded)

      this.map = new mapboxgl.Map({
        container: this.mapId,
        style: `mapbox://styles/mapbox/${this.mapStyle}`,
        sprite: `mapbox://sprites/mapbox/${this.mapSprite}`,
        interactive: !this.staticMap,
        maxZoom: 18,
      })

      if (!this.hideNavigationControl) {
        this.map.addControl(new mapboxgl.NavigationControl(), 'bottom-right')
      }

      if (this.map.loaded()) {
        this.onLoad()
      } else {
        this.map.once('load', this.onLoad)
      }
    })
  },

  data () {
    return {
      map: null,
      mapId: cuid(),
      loaded: false,
    }
  },

  methods: {
    onLoad () {
      this.$nextTick(() => {
        this.map.addLayer({
          id: 'baselayer-placeholder',
          paint: {
            'background-color': 'rgba(0,0,0,0)'
          },
          type: 'background'
        }, 'background')

        this.loaded = true
        this.$emit('event:loaded', this.loaded)
        this.map.getCanvas().style.cursor = 'default'
      })
    },

    fitBounds ({ feature = null, features = [], animate = false, padding = 120, maxZoom = 22 }) {
      return new Promise(resolve => {
        if (!this.loaded) return resolve()

        let collection = null

        if (feature) {
          collection = featureCollection([ feature ])
        }

        if (features.length) {
          collection = featureCollection(features)
        }

        if (!collection) return resolve()

        this.map.once('moveend', resolve)

        let bounds = bbox(collection)
        this.map.fitBounds(
          bounds,
          {
            padding,
            animate,
            maxZoom: maxZoom,
          }
        )
      })
    },
  },

  beforeDestroy () {
  }
}
</script>

<style lang="scss" scoped>
@import './../../../node_modules/mapbox-gl/dist/mapbox-gl.css';

.of-map-container {
  position: relative;
  width: 100%;
  flex: 1 0 auto;
}

.of-map {
  position: absolute !important;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.of-map-hidden {
  display: none;
}

</style>
