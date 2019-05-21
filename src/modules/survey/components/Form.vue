<template>
  <of-form ref="surveyForm" :config="formConfig">
    <template slot-scope="{ form }">
      <of-form-field-text :field="form.getField('id')" />
      <of-form-field-date :field="form.getField('date_start')" />
      <of-form-field-date :field="form.getField('date_end')" />
      <of-form-field-autocomplete :field="form.getField('plot_id')" :fetch="fetchPlots" />
      <of-form-field-textarea :field="form.getField('notes')" />
      <of-form-field-text :field="form.getField('treecount')" />
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
    ...mapActions('survey', {
      createItem: 'createItem',
      updateItem: 'updateItem',
      fetchPlots: 'fetchPlots',
    }),

    setFormData () {
      if (this.id && this.item) {
        this.$nextTick(() => {
          this.$refs.surveyForm.setValues(this.item)
        })
      }
    },

    submit () {
      let form = this.$refs.surveyForm.getForm()

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
