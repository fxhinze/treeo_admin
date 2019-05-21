<template>
  <of-form ref="plotForm" :config="formConfig">
    <template slot-scope="{ form }">
      <of-form-field-text :field="form.getField('identifier')" />
      <of-form-field-autocomplete :field="form.getField('farmer_id')" :fetch="fetchFarmers" />
      <of-form-field-autocomplete :field="form.getField('species_id')" :fetch="fetchSpecies" />
      <of-form-field-autocomplete :field="form.getField('soil_type_id')" :fetch="fetchSoilTypes" />
      <of-form-field-autocomplete :field="form.getField('legal_status_id')" :fetch="fetchLegalStatuses" />
      <of-form-field-autocomplete :field="form.getField('village_id')" :fetch="fetchVillages" />
      <of-form-field-autocomplete :field="form.getField('planting_distance_id')" :fetch="fetchPlantingDistances" />
      <of-form-field-autocomplete :field="form.getField('field_coordinator_id')" :fetch="fetchFieldCoordinators" />
      <of-form-field-autocomplete :field="form.getField('supporter_id')" :fetch="fetchSupporters" />
      <of-form-field-date :field="form.getField('planting_date')" />
      <of-form-field-text :field="form.getField('video')" />
      <of-form-field-checkbox :field="form.getField('active')" />
      <of-form-field-checkbox :field="form.getField('sample')" />
      <of-form-field-text :field="form.getField('plants_planted')" />
      <template v-if="!hideActions">
        <v-btn @click="submit(form)" >
          save
        </v-btn>
      </template>
    </template>
  </of-form>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import config from './../form'

export default {
  props: {
    type: {
      type: String,
      default: ''
    },

    hideActions: {
      type: Boolean,
      default: false
    },

    id: {
      type: [Number, String],
      default: null
    },

    item: {
      type: Object,
      default: null,
    },
  },

  mounted () {
    this.setFormData()
  },

  data () {
    return {
      valid: true,
      formConfig: {
        fields: config.fields,
        type: this.type
      }
    }
  },

  methods: {
    ...mapActions('plot', {
      createItem: 'createItem',
      updateItem: 'updateItem',
      fetchFarmers: 'fetchFarmers',
      fetchSpecies: 'fetchSpecies',
      fetchSoilTypes: 'fetchSoilTypes',
      fetchLegalStatuses: 'fetchLegalStatuses',
      fetchVillages: 'fetchVillages',
      fetchPlantingDistances: 'fetchPlantingDistances',
      fetchFieldCoordinators: 'fetchFieldCoordinators',
      fetchSupporters: 'fetchSupporters',
    }),

    setFormData () {
      if (this.id && this.item) {
        this.$nextTick(() => {
          this.$refs.plotForm.setValues(this.item)
        })
      }
    },

    submit () {
      let form = this.$refs.plotForm.getForm()

      if (form.type === 'create') {
        this.createItem(form.getValues())
          .then(response => {
            this.$emit('success')
          })
          .catch(response => {
            form.setError(response)
            document.documentElement.scrollTop = 0
          })
      }

      if (form.type === 'edit') {
        this.updateItem({
          id: this.id,
          ...form.getValues()
        })
          .then(response => {
            this.$emit('success')
          })
          .catch(response => {
            form.setError(response)
            document.documentElement.scrollTop = 0
          })
      }
    }
  }
}
</script>

<style>

</style>
