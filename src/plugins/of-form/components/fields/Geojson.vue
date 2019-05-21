<template>
  <div>
    <v-layout v-if="field">
      <v-flex>
        <v-text-field
          v-model="lat"
          :rules="latRules"
          label="Latitude"
        />
      </v-flex>

      <v-divider class="mx-3" vertical />

      <v-flex>
        <v-text-field
          v-model="lng"
          :rules="lngRules"
          label="Longitude"
        />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { featureCollection, feature } from '@turf/turf'
import { point } from '@turf/helpers'

export default {
  props: {
    field: {
      type: Object,
      default: null
    },
  },

  data () {
    return {
      latRules: [
        v => /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/.test(v) || 'Latitude must be valid'
      ],
      lngRules: [
        v => /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/.test(v) || 'Longitude must be valid'
      ],
      lat: null,
      lng: null,
    }
  },

  watch: {
    value: {
      handler: 'setValue',
      deep: true,
      immediate: true,
    },

    lat: 'updateValue',
    lng: 'updateValue',
  },

  computed: {
    value () {
      return this.field.getValue()
    },

    settings () {
      return this.field.getSettings()
    },

    errorMessages () {
      return this.field.getErrorMessages()
    }
  },

  methods: {
    setValue () {
      let value = JSON.parse(this.value)

      if (!value) return

      if (!value.features.length) return

      if (!value.features[0].geometry) return

      if (!value.features[0].geometry.coordinates) return

      let coords = value.features[0].geometry.coordinates

      this.lng = coords[0]
      this.lat = coords[1]
    },

    updateValue () {
      if (!this.lat || !this.lng) return

      let value = JSON.stringify(
        featureCollection([
          point([
            parseFloat(this.lng),
            parseFloat(this.lat),
          ])
        ])
      )

      this.field.setValue(value)
    }
  }
}
</script>
