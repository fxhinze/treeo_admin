<template>
  <form>
    <div style="display: flex;">
      <div style="flex: 1 0 auto;">
        <v-text-field
          v-model="value"
          placeholder="Date"
          solo
          flat
          hide-details
          readonly
        ></v-text-field>
      </div>
    </div>
    <v-divider />
    <div style="display: flex;">
      <v-date-picker width="300" :show-current="false" class="of-no-shadow of-datatable__filter" v-model="value" no-title scrollable :type="dateType" />
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
      this.value = this.selectedFilter.value
    }
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

    isValid () {
      return this.value
    },

    dateType () {
      return this.settings && this.settings.dateType ? this.settings.dateType : 'month'
    }
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
  },

  methods: {
  }
}
</script>

<style>

</style>
