<template>
  <form>
    <div style="display: flex;">
      <div style="flex: 1 0 auto;">
        <v-text-field
          v-model="value"
          placeholder="Number"
          solo
          flat
          hide-details
          type="number"
        ></v-text-field>
      </div>

      <v-divider vertical />
    </div>
    <template v-if="range">
      <v-divider />
      <div style="display: flex; padding-top: 44px;" class="px-4">
        <v-slider
          v-model="value"
          :max="range[1]"
          :min="range[0]"
          :step="step"
          hide-details
          class="ma-0"
          thumb-label="always"
        ></v-slider>
      </div>
    </template>
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
  },

  data () {
    return {
      value: null
    }
  },

  computed: {
    settings () {
      return this.filter.getType(this.type)
    },

    isValid () {
      return this.value
    },

    range () {
      return this.settings && this.settings.range ? this.settings.range : null
    },

    step () {
      return this.selectedFilter && this.selectedFilter.step ? this.selectedFilter.step : 1
    },
  },

  watch: {
    active: {
      handler (active) {
        if (active) this.$emit('input', this.isValid ? this.value : null)
      },
      immediate: true,
    },
    value: {
      handler () {
        this.$emit('input', this.isValid ? this.value : null)
      },
      deep: true,
      immediate: true,
    },
  }
}
</script>

<style>

</style>
