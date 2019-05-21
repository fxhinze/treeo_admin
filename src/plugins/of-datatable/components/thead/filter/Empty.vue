<template>
  <form @submit.prevent="save">
    <v-select
      v-model="value"
      :items="items"
      placeholder="Select..."
      item-text="name"
      item-value="id"
      solo
      hide-details
      flat
      clearable
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
    if (this.selectedFilter && this.selectedFilter.type === this.type) {
      this.value = this.selectedFilter.value || undefined
    }
  },

  data () {
    return {
      value: undefined,
      items: [
        { id: 0, name: 'NOT FILLED' },
        { id: 1, name: 'FILLED' },
      ]
    }
  },

  computed: {
    settings () {
      return this.filter.getType(this.type)
    },
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
  }
}
</script>

<style>

</style>
