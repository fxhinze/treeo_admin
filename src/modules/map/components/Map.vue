<template>
  <div style="display: flex; flex: 1 0 auto; flex-direction: column; height: 100%;">
    <div style="flex: 0 0 auto;" class="of-map__header">
      <v-toolbar flat light color="white">
        <v-toolbar-title>MAP</v-toolbar-title>

        <v-spacer />
        <div style="width: 200px">
          <v-select
            :items="dronelayers"
            v-model="selectedDronelayers"
            label="Drone Layer"
            solo
            hide-details
            dense
            flat
            item-text="label"
            item-value="id"
            multiple
          ></v-select>
        </div>

        <div style="width: 200px">
          <v-select
            :items="baselayers"
            v-model="selectedBaselayer"
            solo
            hide-details
            dense
            flat
            item-text="label"
            item-value="name"
          ></v-select>
        </div>

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon @click="zoomToProjectArea">
              <v-icon>gps_fixed</v-icon>
            </v-btn>
          </template>
          <span>Fit project area</span>
        </v-tooltip>
      </v-toolbar>
      <v-divider />
    </div>
    <div class="of-map__body-container">
      <div class="of-map__body-sidebar-container">
        <div class="of-map__body-sidebar-search">
          <v-text-field
            v-model="search"
            :disabled="mode === 'edit'"
            clearable
            placeholder="Search..."
            solo
            flat
            hide-details
          />
          <v-divider />
        </div>
        <div class="of-map__body-sidebar-content">
          <v-list dense two-line class="of-map__body-sidebar-content-list pa-0">
            <recycle-scroller
              ref="scrollArea"
              :items="plotsFiltered(search)"
              :item-size="60"
              key-field="id"
            >
              <v-list-tile
                slot-scope="{ item }"
                :key="item.id"
                :disabled="isItemDisabled(item.properties.id)"
                class="of-map__body-sidebar-content-list-tile"
                @click="zoomToFeature(item.properties.id)"
              >
                <v-list-tile-content>
                  <v-list-tile-title>Plot <span class="font-weight-bold">{{ item.id }}</span></v-list-tile-title>
                  <v-list-tile-sub-title>Farmer {{ item.properties.farmer }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <div>
                    <v-btn :disabled="!loaded" icon @click.native.stop="zoomToFeature(item.properties.id, true)">
                      <v-icon :color="!isItemActive(item.properties.id) ? 'grey' : ''">zoom_in</v-icon>
                    </v-btn>
                    <v-btn :disabled="!loaded" icon @click.native.stop="editFeature(item.properties.id)">
                      <v-icon :color="!isItemActive(item.properties.id) ? 'grey' : ''">{{ isItemActive(item.properties.id) ? 'close' : 'edit' }}</v-icon>
                    </v-btn>
                  </div>
                </v-list-tile-action>
              </v-list-tile>
            </recycle-scroller>
          </v-list>
        </div>
      </div>
      <div style="display: flex; flex: 1 0 auto; position: relative;" class="of-map__body-map-container">
        <div :id="mapId" style="position: absolute !important; top: 0; left: 0; right: 0; bottom: 0;" class="of-map__body-map">
          <div style="display: none;">
            <template v-if="loaded">
              <baselayer-component
                :layer="selectedBaselayer"
                @available-layers="items => baselayers = items"
              />
              <dronelayer-component
                :layers="selectedDronelayers"
                @available-layers="items => dronelayers = items"
              />
              <plots-component
                :mode="mode"
                @update:mode="setMode"
              />
            </template>
          </div>
          <transition name="fade" mode="out-in">
            <draw-toolbar-component
              v-if="editMode"
              style="position: absolute; top: 24px; left: 24px; right: 24px; z-index: 2;"
              @event:close="closeEditFeature"
            />
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import cuid from 'cuid'
import { featureCollection, bbox } from '@turf/turf'

import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

import { buildTooltipHtml } from './../helpers'

import BaselayerComponent from '@/components/of-map/Baselayer'
import DronelayerComponent from './Dronelayer'
import PlotsComponent from './Plots'
import DrawToolbarComponent from './DrawToolbar'

const ACCESS_TOKEN = process.env.VUE_APP_MAP_MAPBOX_TOKEN

export default {
  components: {
    BaselayerComponent,
    DronelayerComponent,
    PlotsComponent,
    DrawToolbarComponent,
  },

  created () {
    mapboxgl.accessToken = ACCESS_TOKEN
  },

  mounted () {
    this.fetch()

    this.onInit()
  },

  data () {
    return {
      map: null,
      mapId: cuid(),
      loaded: false,
      draw: null,
      selectedBaselayer: 'bing_satellite',
      selectedDronelayers: [],
      baselayers: [],
      dronelayers: [],
      search: null,
      mode: 'default',
    }
  },

  computed: {
    ...mapGetters('map', {
      plotsFiltered: 'plotsFiltered',
      getFeatureById: 'getPlotById',
    }),

    ...mapState('map', {
      loadStatusData: state => state.loadStatusData,
      plot: state => state.plot,
      plots: state => state.plots,
    }),

    scrollArea () {
      return this.$refs.scrollArea.$el
    },

    editMode () {
      return this.loaded && this.mode === 'edit' && this.plot
    }
  },

  watch: {
    search () {
      this.$nextTick(() => {
        this.scrollArea.scrollTop = 0
      })
    },
    loaded: { handler: 'loadedTest', immediate: true },
    loadStatusData: { handler: 'loadedTest', immediate: true },
  },

  methods: {
    ...mapActions('map', {
      fetch: 'fetch',
      clear: 'clear',
    }),

    ...mapMutations('map', {
      setLoadStatusData: 'SET_LOADSTATUS_DATA',
      setPlot: 'SET_PLOT',
    }),

    onInit () {
      this.map = new mapboxgl.Map({
        container: this.mapId,
        style: `mapbox://styles/mapbox/empty-v9`,
        sprite: `mapbox://sprites/mapbox/satellite-v9`,
        maxZoom: 20,
      })

      this.map.addControl(new mapboxgl.NavigationControl(), 'bottom-right')

      if (this.map.loaded()) {
        this.onLoad()
      } else {
        this.map.once('load', this.onLoad)
      }
    },

    onLoad () {
      this.map.addLayer({
        id: 'baselayer-placeholder',
        paint: {
          'background-color': 'rgba(0,0,0,0)'
        },
        type: 'background'
      }, 'background')

      this.map.addLayer({
        id: 'dronelayer-placeholder',
        paint: {
          'background-color': 'rgba(0,0,0,0)'
        },
        type: 'background'
      }, 'background')

      this.$nextTick(() => {
        this.loaded = true
      })

      this.draw = new MapboxDraw({
        displayControlsDefault: false,
        keybindings: true,
        controls: {
          trash: true,
        }
      })

      this.map.addControl(this.draw)
    },

    zoomToFeature (id, animate = false, padding = undefined) {
      return this.fitBounds({
        feature: this.getFeatureById(id),
        animate,
        padding,
      })
    },

    zoomToProjectArea () {
      this.fitBounds({
        features: this.plots,
        animate: true,
      })
    },

    loadedTest () {
      if (this.loaded && this.loadStatusData === 2) {
        this.$nextTick(() => {
          if (this.plot) {
            this.setMode({
              mode: 'edit',
              id: this.plot,
              animate: false,
            })
          } else {
            this.fitBounds({
              features: this.plots,
            })
          }
        })
      }
    },

    fitBounds ({ feature = null, features = [], animate = false, padding = 120 }) {
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
          }
        )
      })
    },

    editFeature (id) {
      if (this.isItemActive(id)) {
        this.closeEditFeature()
      } else {
        this.setMode({
          mode: 'edit',
          id: id,
        })
      }
    },

    closeEditFeature () {
      this.setMode({
        mode: 'default',
      })
    },

    isItemDisabled (id) {
      return this.mode === 'edit' && this.plot && id !== this.plot
    },

    isItemActive (id) {
      return this.mode === 'edit' && this.plot && id === this.plot
    },

    getInformation (properties) {
      return buildTooltipHtml(properties)
    },

    setMode ({ mode = null, id = null, animate = false }) {
      if (!mode) return

      if (mode === 'edit' && !id) return

      this.zoomToFeature(id, animate).then(() => {
        this.mode = mode
        this.setPlot(id)
      })
    }
  },

  beforeDestroy () {
    this.setLoadStatusData(0)
  }
}
</script>

<style>
.mapbox-gl-draw_ctrl-draw-btn.mapbox-gl-draw_trash {
  display: none;
}
</style>
