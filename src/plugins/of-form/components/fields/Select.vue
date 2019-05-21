<template>
  <v-select
    v-if="field"
    v-bind="settings"
    v-model="value"
    :items="availableItems"
    :loading="loading"
    :error-messages="errorMessages"
  />
</template>

<script>
export default {
  props: {
    field: {
      type: Object,
      default: null
    },
    items: {
      type: Array,
      default: null
    },
    fetch: {
      type: Function,
      default: null
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.fetchItems()
    })
  },

  data () {
    return {
      loading: false,
      availableItems: []
    }
  },

  watch: {
    items: {
      handler: function (value) {
        if (!value) return

        this.availableItems = value
      },
      immediate: true
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
  },

  methods: {
    async fetchItems () {
      if (!this.fetch) return

      this.loading = true

      try {
        this.availableItems = await this.fetch()
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style>

</style>
