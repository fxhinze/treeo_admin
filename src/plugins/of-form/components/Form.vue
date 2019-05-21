<template>
  <form @keyup="update">
    <slot :form="form" />
  </form>
</template>

<script>
import Form from './../utils/form'

export default {
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          fields: [],
          type: null
        }
      }
    }
  },

  mounted () {
  },

  data () {
    return {
      form: new Form(this.config),
      delay: 200,
    }
  },

  methods: {
    setValues (values) {
      this.form.setValues(values)
    },

    setSettings (field, settings) {
      this.form.getField(field).setSettings(settings)
    },

    setDisabled (field, disabled) {
      this.form.getField(field).setDisabled(disabled)
    },

    getForm () {
      return this.form
    },

    getValue (field) {
      return this.form.getField(field).getValue()
    },

    update () {
      clearTimeout(this.timeout)

      this.timeout = setTimeout(() => {
        this.$emit('update', this.form)
      }, this.delay)
    }
  }
}
</script>

<style>

</style>
