<template>
  <v-card flat>
    <v-tabs
      v-model="active"
      color="primary"
      dark
      slider-color="transparent"
    >
      <v-tab v-for="type in types" :key="type.name" ripple :href="'#' + type.name">
        {{ type.label }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="active">
      <v-tab-item v-for="type in types" :key="type.name" :value="type.name">
        <component
          :is="getComponent(type.name)"
          :active="type.name === active"
          :type="type.name"
          :selected-filter="selected"
          :filter="settings"
          @input="setValue"
          @update="updateFilter"
          @close="$emit('action:close')"
        />
      </v-tab-item>
    </v-tabs-items>
    <v-divider />
    <v-card-actions>
      <v-btn flat color="primary" @click="$emit('action:close')">Cancel</v-btn>
      <v-spacer></v-spacer>
      <v-btn flat color="primary" @click="updateFilter">OK</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import FilterTextComponent from './filter/Text'
import FilterNumberComponent from './filter/Number'
import FilterNumberRangeComponent from './filter/NumberRange'
import FilterDateComponent from './filter/Date'
import FilterDateRangeComponent from './filter/DateRange'
import FilterBoolComponent from './filter/Bool'
import FilterEmptyComponent from './filter/Empty'
import FilterSelectComponent from './filter/Select'
import FilterSelectIdComponent from './filter/SelectId'
import FilterSelectMultiComponent from './filter/SelectMulti'
import FilterSelectMultiIdComponent from './filter/SelectMultiId'

export default {
  components: {
    FilterTextComponent,
    FilterNumberComponent,
    FilterNumberRangeComponent,
    FilterDateComponent,
    FilterDateRangeComponent,
    FilterBoolComponent,
    FilterEmptyComponent,
    FilterSelectComponent,
    FilterSelectIdComponent,
    FilterSelectMultiComponent,
    FilterSelectMultiIdComponent,
  },

  props: {
    settings: Object,
    selected: Object,
  },

  mounted () {
    if (this.selected) {
      this.active = this.selected.type
    } else {
      this.active = this.types[0].name
    }
  },

  data () {
    return {
      active: null,
      value: null,
    }
  },

  watch: {
  },

  computed: {
    types () {
      return this.settings.getTypes() || []
    }
  },

  methods: {
    getComponent (name) {
      return 'filter-' + name.split('_').join('-') + '-component'
    },

    setValue (value) {
      this.$nextTick(() => {
        this.value = value
      })
    },

    updateFilter () {
      this.$emit('update', {
        type: this.active,
        value: this.value
      })
    }
  }
}
</script>

<style>

</style>
