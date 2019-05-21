<template>
  <v-container style="min-height: 200px;" class="pa-0 mt-2">
    <template v-if="!success">
      <v-layout v-if="geojson && !loading && !error" class="px-3">
        <v-flex xs12>
          <div class="my-3 subheading">{{ title }}</div>
        </v-flex>
      </v-layout>
      <v-layout style="height: 168px;" row wrap align-center justify-center fill-height>
        <v-flex class="text-xs-center">
          <v-progress-circular v-if="loading" :size="72" :width="15" :rotate="-90" :value="progress" color="primary">
            {{ progress }}
          </v-progress-circular>

          <v-btn v-if="!loading" large fab color="primary" dark icon @click="$refs.fileInput.click()">
            <v-icon style="font-size: 20px">file_upload</v-icon>
          </v-btn>

          <input type="file" style="display: none" ref="fileInput" accept=".json,.geojson" @change="onFilePicked">
        </v-flex>
      </v-layout>
    </template>

    <template v-if="success">
      <v-layout class="px-2">
        <v-flex xs12>
          <div class="body-2">Found {{ geojson.features.length }} features</div>
        </v-flex>
      </v-layout>
    </template>

    <template v-if="error">
      <div class="px-3 pb-3 subheading red--text">{{ errorMsg }}</div>
    </template>
  </v-container>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Upload Geojson'
    },

    uploadFunction: {
      type: Function,
      default: null
    },
  },

  data () {
    return {
      progress: 0,
      loading: false,
      error: false,
      errorMsg: null,
      success: false,
      geojson: null,
    }
  },

  methods: {
    onFilePicked (event) {
      const files = event.target.files
      this.parseFile(files[0])
    },

    async parseFile (file) {
      if (!this.uploadFunction) return
      if (!file) return

      this.resetData()

      const formData = new FormData()
      formData.append('geojson', file)

      const data = {
        data: formData,
        callback: (progressEvent) => {
          this.progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        }
      }

      this.loading = true

      try {
        const response = await this.uploadFunction(data)
        this.success = true

        this.geojson = response

        this.applyFeatures(this.geojson)

        this.$emit('success')
      } catch (error) {
        this.error = true
        this.errorMsg = error.response.data.message

        this.$emit('error')
      } finally {
        this.loading = false
      }
    },

    uploadNew () {
      this.resetData()
      this.applyFeatures()
    },

    applyFeatures (featureCollection = null) {
      let features = []

      if (
        featureCollection &&
        featureCollection.hasOwnProperty('features')
      ) {
        featureCollection.features.forEach(feature => {
          if (feature.geometry.type === 'MultiPolygon') {
            features.push({
              type: 'Feature',
              properties: {},
              ...feature,
            })
          }
        })
      }

      this.$emit('features', features)
    },

    resetData () {
      this.progress = 0
      this.loading = false
      this.error = false
      this.errorMsg = null
      this.success = false
    },
  },
}
</script>
