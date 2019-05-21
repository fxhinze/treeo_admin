<template>
  <of-form ref="form" :config="formConfig">
    <template slot-scope="{ form }">
      <of-form-field-autocomplete :field="form.getField('survey_id')" :fetch="fetchSurveys" />
      <of-form-field-autocomplete :field="form.getField('species_id')" :fetch="fetchSpecies" />
      <of-form-field-text :field="form.getField('dbh_cm')" />
      <of-form-field-text :field="form.getField('height_m')" />
      <of-form-field-date :field="form.getField('timestamp')" />
      <of-form-field-textarea :field="form.getField('comment')" />
      <of-form-field-text :field="form.getField('amigo_id')" />
      <of-form-field-text :field="form.getField('health')" />
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
    ...mapActions('tree', {
      createItem: 'createItem',
      updateItem: 'updateItem',
      fetchSurveys: 'fetchSurveys',
      fetchSpecies: 'fetchSpecies',
    }),

    setFormData () {
      if (this.id && this.item) {
        this.$nextTick(() => {
          this.$refs.form.setValues(this.item)
        })
      }
    },

    submit () {
      let form = this.$refs.form.getForm()

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
