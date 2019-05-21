<template>
  <v-checkbox
    v-if="field"
    v-bind="settings"
    v-model="value"
    :error-messages="errorMessages"
  />
</template>

<script>
export default {
  props: {
    field: {
      type: Object,
      default: null
    }
  },

  computed: {
    value: {
      get () {
        return this.field.getValue()
      },

      set (value) {
        this.field.setValue(value)
      }
    },

    settings () {
      return this.field.getSettings()
    },

    errorMessages () {
      return this.field.getErrorMessages()
    }
  }
}
</script>

<style>

</style>
