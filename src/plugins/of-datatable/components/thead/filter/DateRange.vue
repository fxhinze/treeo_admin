<template>
  <form>
    <div style="display: flex;">
      <div style="flex: 1 0 auto;">
        <v-text-field
          v-model="value.from"
          placeholder="From"
          solo
          flat
          hide-details
          readonly
        ></v-text-field>
      </div>

      <v-divider vertical />

      <div style="flex: 1 0 auto;">
        <v-text-field
          v-model="value.to"
          placeholder="To"
          solo
          flat
          hide-details
          readonly
        ></v-text-field>
      </div>
    </div>
    <v-divider />
    <div style="display: flex;">
      <v-date-picker :max="value.to ? value.to : null" width="200" :show-current="false" class="of-no-shadow of-datatable__filter" v-model="value.from" no-title scrollable type="month" />
      <v-divider vertical />
      <v-date-picker :min="value.from ? value.from : null" width="200" :show-current="false" class="of-no-shadow of-datatable__filter" v-model="value.to" no-title scrollable type="month" />
    </div>
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
      },
    }
  },

  computed: {
    settings () {
      return this.filter.getType(this.type)
    },

    isValid () {
      return this.value.from || this.value.to
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

  methods: {
  }
}
</script>

<style>

</style>
