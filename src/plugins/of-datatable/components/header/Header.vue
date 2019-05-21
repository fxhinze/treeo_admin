<template>
  <v-toolbar flat class="of-datatable__header" color="white" :extended="searchBar">
    <slot />

    <div slot="extension" v-if="searchBar" class="of-datatable__filterbar">
      <div class="mr-3" style="padding-left: 12px;">Filters:</div>

      <v-chip v-if="hasSearch" close small @input="clearSearchValue">
        <span class="label mr-2">Search:</span>
        {{ search.value }}
      </v-chip>

      <v-chip v-for="(item, index) in filter.getSelectedItems()" :key="index" close small color="primary" text-color="white" @input="$emit('clearFilterValue', item.field)">
        <span class="label mr-2">{{ item.label }}:</span>
        {{ getValue(item) }}
      </v-chip>
    </div>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    datatable: Object,
    filter: Object,
    searchBar: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      default: () => []
    },
    search: {
      type: Object,
      default: () => {
        return {
          fields: [],
          value: ''
        }
      }
    },
  },

  data () {
    return {
      searchValue: null
    }
  },

  computed: {
    hasSearchBar () {
      return this.searchBar
    },

    hasFilter () {
      return this.filter.hasSelectedItems()
    },

    hasSearch () {
      return this.search.value && this.search.value !== ''
    }
  },

  methods: {
    showSearchBar () {
      this.$emit('updateSearchbar', true)
    },

    hideSearchBar () {
      this.$emit('updateSearchbar', false)
    },

    addSearch () {
      if (this.searchValue && this.searchValue !== '') {
        this.$emit('updateSearch', {
          value: this.searchValue
        })
        this.searchValue = ''
      }
    },

    clearSearchValue () {
      this.$emit('updateSearch', {
        value: ''
      })
    },

    getValue (filter) {
      switch (filter.type) {
        case 'empty': {
          return filter.value ? 'FILLED' : 'EMPTY'
        }

        case 'select_multi': {
          return filter.value.map(value => value).join(', ')
        }

        case 'select_id': {
          return filter.value.name
        }

        case 'select_multi_id': {
          return filter.value.map(value => value.name).join(', ')
        }

        default: {
          return filter.value
        }
      }
    }
  }
}
</script>

<style>

</style>
