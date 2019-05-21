<template>
  <v-menu
    :close-on-content-click="false"
    v-model="menu"
    lazy
    transition="scale-transition"
    offset-y
    full-width
    min-width="290px"
  >
    <v-text-field
      slot="activator"
      v-if="field"
      v-bind="settings"
      v-model="value"
      :error-messages="errorMessages"
      readonly
    />
    <v-date-picker v-model="value" @input="menu = false"></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  props: {
    field: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      menu: false,
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
