<template>
  <of-form ref="form" :config="formConfig">
    <template slot-scope="{ form }">
      <of-form-field-text :field="form.getField('name')" />
      <of-form-field-text :field="form.getField('username')" />
      <of-form-field-text :field="form.getField('email')" />
      <of-form-field-text :field="form.getField('password')" />
      <of-form-field-checkbox :field="form.getField('admin')" />
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
    ...mapActions('user', {
      createItem: 'createItem',
      updateItem: 'updateItem',
    }),

    ...mapActions('auth', {
      updateProfile: 'updateProfile',
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
            this.$emit('error')
            form.setError(response)
            document.documentElement.scrollTop = 0
          })
      }

      if (form.type === 'edit') {
        this.updateItem(form.getValues())
          .then(response => {
            this.$emit('success')
          })
          .catch(response => {
            this.$emit('error')
            form.setError(response)
            document.documentElement.scrollTop = 0
          })
      }

      if (form.type === 'profile') {
        this.updateProfile(form.getValues())
          .then(response => {
            this.$emit('success')
          })
          .catch(response => {
            this.$emit('error')
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
