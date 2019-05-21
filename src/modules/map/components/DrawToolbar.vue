<template>
  <v-card v-if="plot">
    <v-toolbar color="white" flat>
      <template v-if="modified">
        <v-btn color="white" @click="cancel">Cancel</v-btn>

        <v-spacer />

        <v-btn color="white" @click="discard">Discard</v-btn>
        <v-btn color="primary" @click="save">Save</v-btn>
      </template>
      <template v-else>
        <v-list dense two-line class="pa-0" style="background: transparent">
          <v-list-tile :to="{ name: 'plot-overview', params: { id: plot.properties.id }, }">
            <v-list-tile-content>
              <v-list-tile-title>
                Plot <span class="font-weight-bold">{{ plot.properties.id }}</span>
              </v-list-tile-title>
              <v-list-tile-sub-title>
                Farmer {{ plot.properties.farmer }}
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-spacer />

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon @click="popup.info = true">
              <v-icon>info</v-icon>
            </v-btn>
          </template>
          <span>About plot</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon @click="zoomTo">
              <v-icon>zoom_in</v-icon>
            </v-btn>
          </template>
          <span>Fit plot</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon @click="popup.upload = true">
              <v-icon>file_upload</v-icon>
            </v-btn>
          </template>
          <span>Upload geojson file</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon @click="deletePolygon">
              <v-icon>delete</v-icon>
            </v-btn>
          </template>
          <span>Delete polygon</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon @click="goToPlot">
              <v-icon>forward</v-icon>
            </v-btn>
          </template>
          <span>Plot overview</span>
        </v-tooltip>

        <v-btn icon @click="$emit('event:close')">
          <v-icon>close</v-icon>
        </v-btn>
      </template>
    </v-toolbar>
    <popup-component
      v-model="popup.info"
      title="About plot"
      confirm-label="Close"
      hide-cancel-btn
      has-content
      max-width="400px"
      @action:confirm="popup.info = null"
    >
      <div class="of-tooltip-container auto-width" v-html="getInformation(plot.properties)" />
    </popup-component>
    <popup-component
      v-model="popup.upload"
      title="Upload Geojson"
      cancel-label="Cancel"
      hide-confirm-btn
      has-content
      max-width="400px"
    >
      <upload-geo-component
        :uploadFunction="parseGeojson"
        @success="popup.upload = null"
        @features="setFeatures"
      />
    </popup-component>
  </v-card>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { featureCollection, bbox } from '@turf/turf'

import PopupComponent from '@/components/Popup'
import UploadGeoComponent from '@/components/of-map/ParseGeojson'

import { buildTooltipHtml } from './../helpers'

export default {
  components: {
    PopupComponent,
    UploadGeoComponent,
  },

  mounted () {
    this.draw.add(this.plot)

    this.addEvents()
  },

  data () {
    return {
      modified: false,
      popup: {
        info: null,
        upload: null,
      },
    }
  },

  computed: {
    ...mapState('map', {
      id: state => state.plot,
    }),

    ...mapGetters('map', {
      getPlotById: 'getPlotById'
    }),

    plot () {
      return this.getPlotById(this.id)
    },

    map () {
      return this.$parent.map
    },

    draw () {
      return this.$parent.draw
    },
  },

  methods: {
    ...mapActions('map', {
      updatePlot: 'updatePlot',
      deletePlotPolygon: 'deletePlotPolygon',
      parseGeojson: 'parseGeojson',
    }),

    onDrawUpdate () {
      this.modified = true
    },

    cancel () {
      this.$emit('event:close')
    },

    discard () {
      this.draw.deleteAll()

      this.draw.add(this.plot)

      this.modified = false
    },

    async save () {
      try {
        await this.updatePlot({
          id: this.id,
          geodata: JSON.stringify(this.draw.getAll())
        })
      } finally {
        this.modified = false
        this.draw.changeMode('simple_select')
      }
    },

    setFeatures (features) {
      if (!features.length) return

      this.draw.deleteAll()

      this.draw.add(
        featureCollection(features)
      )

      this.onDrawUpdate()

      this.$parent.fitBounds({
        features: this.draw.getAll().features,
      })
    },

    getInformation (properties) {
      return buildTooltipHtml(properties)
    },

    zoomTo () {
      this.$parent.fitBounds({
        features: this.draw.getAll().features,
        animate: true,
      })
    },

    deletePolygon () {
      this.deletePlotPolygon(this.id)
        .then(response => {
          this.$parent.closeEditFeature()
        })
    },

    goToPlot () {
      this.$router.push({
        name: 'plot-overview',
        params: { id: this.id },
      })
    },

    addEvents () {
      this.map.on('draw.update', this.onDrawUpdate)
    },

    removeEvents () {
      this.map.off('draw.update', this.onDrawUpdate)
    },
  },

  beforeDestroy () {
    this.draw.deleteAll()

    this.addEvents()
  }
}
</script>

<style>

</style>
