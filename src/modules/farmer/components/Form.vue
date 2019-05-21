<template>
  <of-form ref="farmerForm" :config="formConfig">
    <template slot-scope="{ form }">
      <of-form-field-text :field="form.getField('identifier')" />
      <of-form-field-text :field="form.getField('name')" />
      <of-form-field-autocomplete :field="form.getField('project_id')" :fetch="fetchProjects" />
      <of-form-field-text :field="form.getField('email')" />
      <of-form-field-text :field="form.getField('children')" />
      <of-form-field-date :field="form.getField('birthday')" />
      <of-form-field-select :field="form.getField('gender_id')" :fetch="fetchGenders" />
      <of-form-field-text :field="form.getField('main_occupation')" />
      <of-form-field-text :field="form.getField('side_occupation')" />
      <of-form-field-text :field="form.getField('spouse_name')" />
      <of-form-field-date :field="form.getField('spouse_birthday')" />
      <of-form-field-text :field="form.getField('spouse_main_occupation')" />
      <of-form-field-text :field="form.getField('spouse_side_occupation')" />
      <of-form-field-text :field="form.getField('family_income_idr')" />
      <of-form-field-textarea :field="form.getField('address')" />
      <of-form-field-textarea :field="form.getField('story')" />
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
    ...mapActions('farmer', {
      createItem: 'createItem',
      updateItem: 'updateItem',
      fetchGenders: 'fetchGenders',
      fetchProjects: 'fetchProjects',
      fetchUsers: 'fetchUsers',
    }),

    setFormData () {
      if (this.id && this.item) {
        this.$nextTick(() => {
          this.$refs.farmerForm.setValues(this.item)
        })
      }
    },

    submit () {
      let form = this.$refs.farmerForm.getForm()

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
