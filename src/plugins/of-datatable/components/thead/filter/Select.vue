<template>
  <form @submit.prevent="$emit('update')">
    <v-select
      placeholder="Select..."
      v-model="value"
      :items="items"
      :loading="loading"
      solo
      flat
      hide-details
    />
  </form>
</template>

<script>
export default {
  props: {
    active: Boolean,
    type: String,
    selectedFilter: {
      type: Object,
      default: null,
    },
    filter: {
      type: Object,
      default: null,
    }
  },

  mounted () {
    this.fetch()

    if (this.selectedFilter && this.selectedFilter.type === this.type) {
      this.value = this.selectedFilter.value
    }
  },

  data () {
    return {
      loading: false,
      value: null,
      items: [],
    }
  },

  computed: {
    settings () {
      return this.filter.getType(this.type)
    },

    itemText () {
      return this.settings.itemText || null
    }
  },

  watch: {
    active: {
      handler (active) {
        if (active) this.$emit('input', this.value)
      },
      immediate: true,
    },
    value: {
      handler (value) {
        this.$emit('input', value)
      },
      immediate: true,
    },
  },

  methods: {
    async fetch () {
      if (this.settings && !this.settings.dispatch) return

      this.loading = true

      try {
        await this.$store.dispatch(this.settings.dispatch).then(items => {
          this.items = this.itemText ? items.map(item => item[this.itemText]) : items
        })
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style>

</style>
