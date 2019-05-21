<template>
  <div class="of-datatable__footer">
    <div
      :style="{ opacity: isInitialLoading ? 0 : 1 }"
      class="of-datatable__footer-inner"
    >
      <v-pagination
        style="flex: 1 0 auto;"
        v-model="page"
        :length="pagination.total_pages"
        :total-visible="5"
        circle
        color="grey"
      ></v-pagination>

      <div class="of-datatable__footer-limit-container">
        <span>{{ limitTitle }}</span>
        <div style="width: 100px;">
          <v-select
            :value="limit"
            :items="filterLimitItems"
            hide-details
            @change="value => $emit('updateQuery', { limit: value })"
          />
        </div>
      </div>

      <div class="of-datatable__footer-navigation-container">
        <div class="of-datatable__footer-navigation-info">
          <span>{{ navigationInfo }}</span>
        </div>

        <v-btn icon flat style="color: inherit;"
          :disabled="hasPrevPage"
          @click="prevPage"
        >
          <v-icon>keyboard_arrow_left</v-icon>
        </v-btn>

        <v-btn icon flat style="color: inherit;"
          :disabled="hasNextPage"
          @click="nextPage">
          <v-icon>keyboard_arrow_right</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    datatable: Object,
    query: Object,
    pagination: Object,
  },

  data () {
    return {
      filterLimitItems: [25, 50, 100, 200],
      limitTitle: 'Rows per page:'
    }
  },

  watch: {
  },

  computed: {
    isInitialLoading () {
      return this.datatable.isInitialLoading()
    },

    limit () {
      return parseInt(this.query.limit)
    },

    page: {
      get () {
        return this.query.page
      },

      set (value) {
        this.$emit('updateQuery', {
          page: parseInt(value)
        })
      }
    },

    from () {
      return (this.pagination.count * (this.pagination.current_page - 1)) + 1 || 1
    },

    to () {
      return this.pagination.count * this.pagination.current_page || 1
    },

    hasPrevPage () {
      return (this.pagination.current_page - 1) === 0
    },

    hasNextPage () {
      return this.pagination.total_pages === this.pagination.current_page
    },

    navigationInfo () {
      return this.from + '-' + this.to + ' of ' + this.pagination.total
    },
  },

  methods: {
    prevPage () {
      this.$emit('updateQuery', { page: this.pagination.current_page - 1 })
    },

    nextPage () {
      this.$emit('updateQuery', { page: this.pagination.current_page + 1 })
    }
  }
}
</script>

<style>

</style>
