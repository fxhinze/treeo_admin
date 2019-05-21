<template>
  <form @submit.prevent="$emit('update')">
    <v-text-field
      ref="input"
      v-model="value"
      placeholder="Search..."
      solo
      flat
      hide-details
    ></v-text-field>
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
      this.value = this.selectedFilter.value
    }

    setTimeout(() => {
      this.$refs.input.focus()
    }, 200)
  },

  data () {
    return {
      value: null,
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
