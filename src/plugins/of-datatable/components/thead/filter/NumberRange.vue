<template>
  <form>
    <div style="display: flex; width: 100%; max-width: 300px;">
      <div style="flex: 1 1 auto;">
        <v-text-field
          v-model="value.from"
          placeholder="From"
          solo
          flat
          hide-details
          type="number"
        ></v-text-field>
      </div>

      <v-divider vertical />

      <div style="flex: 1 1 auto;">
        <v-text-field
          v-model="value.to"
          placeholder="To"
          solo
          flat
          hide-details
          type="number"
        ></v-text-field>
      </div>
    </div>
    <template v-if="range">
      <v-divider />
      <div style="display: flex; padding-top: 44px;" class="px-4">
        <v-range-slider
          v-model="valueRange"
          :max="range[1]"
          :min="range[0]"
          :step="step"
          hide-details
          class="ma-0"
          thumb-label="always"
        ></v-range-slider>
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
      default: null
    },
    filter: {
      type: Object,
      default: null
    }
  },

  mounted () {
    if (this.selectedFilter && this.selectedFilter.type === this.type) {
      let value = this.selectedFilter.value.split('~')
      this.value.from = value[0]
      this.value.to = value[1]
    }
  },

  data () {
    return {
      value: {
        from: null,
        to: null
      }
    }
  },

  computed: {
    settings () {
      return this.filter.getType(this.type)
    },

    isValid () {
      return this.value.from || this.value.to
    },

    range () {
      return this.settings && this.settings.range ? this.settings.range : null
    },

    step () {
      return this.settings && this.settings.step ? this.settings.step : 1
    },

    valueRange: {
      get () {
        return [this.value.from, this.value.to]
      },
      set (value) {
        this.value.from = value[0]
        this.value.to = value[1]
      }
    },

    valueFormatted () {
      return (this.value.from || '') + '~' + (this.value.to || '')
    }
  },

  watch: {
    active: {
      handler (active) {
        if (active) {
          this.$emit('input', this.isValid ? this.valueFormatted : null)
        }
      },
      immediate: true,
    },
    value: {
      handler () {
        this.$emit('input', this.isValid ? this.valueFormatted : null)
      },
      deep: true,
      immediate: true,
    },
  },
}
</script>

<style>

</style>
