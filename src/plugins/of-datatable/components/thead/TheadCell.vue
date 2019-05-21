<template>
  <th
    ref="column"
    :data-column-name="columnName"
    :style="{ width: resize.width + 'px' }"
    :class="[fixedHeaderClass, fixedColumnClass, sortedByClass, orderByClass, actionsClass, filterClass]"
    :area-sort="query.orderBy === column.name ? query.sortedBy : 'none'"
    :area-filter="isFilterActive ? filter.getSelectedItem(columnName) : 'none'"
    :area-label="column.label"
    class="of-datatable__table-th"
  >
    <div class="of-datatable__cell-container">
      <div
        :class="{ 'sortable': column.sortable }"
        class="of-datatable__cell-title"
        @click.passive="updateSort(column)"
      >
        <div class="of-datatable__cell-label of-text-overflow">{{ column.label }}</div>
        <div class="of-datatable__cell-sort" v-if="column.sortable">
          <v-icon >{{ getSortIcon(query.orderBy === column.name ? query.sortedBy : null ) }}</v-icon>
        </div>
      </div>

      <div :class="[menu ? 'open' : '']" class="of-datatable__cell-filter" v-if="column.filterable">
        <v-menu
          ref="menu"
          :close-on-content-click="false"
          v-model="menu"
          lazy
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <div slot="activator">
            <v-icon>filter_list</v-icon>
          </div>

          <template v-if="menu">
            <filter-tabs-component
              :settings="filterSettings"
              :selected="filterSelected"
              @action:close="closeMenu"
              @update="updateFilter"
            />
          </template>
        </v-menu>
      </div>
    </div>
    <div v-if="column.resizable" ref="resize" class="of-datatable__cell-resize"></div>
  </th>
</template>

<script>
import FilterTabsComponent from './FilterTabs'

export default {
  props: {
    datatable: Object,
    thead: Object,
    filter: Object,
    columnName: String,
    query: Object,
    fixedHeader: Boolean,
    showSearch: Boolean
  },

  components: {
    FilterTabsComponent,
  },

  mounted () {
    this.resize.width = this.column.width

    if (this.column.resizable) {
      this.$refs.resize.addEventListener('mousedown', this.onMouseDown)
    }
  },

  data () {
    return {
      menu: null,
      date: '',
      resize: {
        elem: null,
        startWidth: 0,
        startOffset: 0,
        startOffsetWidth: 0,
        width: 100
      }
    }
  },

  computed: {
    column () {
      return this.thead.getColumn(this.columnName)
    },

    fixedHeaderClass () {
      return this.fixedHeader ? 'of-sticky of-y' : ''
    },

    fixedColumnClass () {
      return this.column.fixedColumn ? 'of-x' : ''
    },

    actionsClass () {
      return this.columnName === 'actions' ? 'of-datatable__cell-actions' : ''
    },

    sortedByClass () {
      return this.query.orderBy === this.columnName ? 'sorting' : ''
    },

    orderByClass () {
      return this.query.sortedBy
    },

    isFilterActive () {
      return this.filter.isItemSelected(this.columnName)
    },

    filterClass () {
      return this.isFilterActive ? 'filtering' : ''
    },

    filterSettings () {
      return this.filter.getItem(this.columnName)
    },

    filterSelected () {
      return this.filter.getSelectedItem(this.columnName)
    }
  },

  watch: {
    menu (value) {
      if (value) {
        this.$parent.$refs.tableScrollBox.addEventListener('scroll', this.onScroll)
      }
    }
  },

  methods: {
    updateFilter ({ type = 'text', value = null }) {
      if (value !== null) {
        this.filter.addSelectedItem(this.columnName, type, value)
        this.filter.setItem(this.columnName, type, value)
      } else {
        this.filter.removeSelectedItem(this.columnName)
      }

      this.datatable.setQuery({ page: 1 })
      this.$emit('fetchData')

      this.menu = false
    },

    updateSort (column) {
      if (!column.sortable) return

      this.$emit('updateSort', column)
    },

    closeMenu () {
      this.menu = false
    },

    getSortIcon (orderBy = null) {
      if (!orderBy) return 'unfold_more'

      return orderBy === 'asc' ? 'arrow_upward' : 'arrow_downward'
    },

    onMouseDown (e) {
      this.resize.elem = e.target.parentNode
      this.resize.startOffsetWidth = this.resize.elem.offsetWidth
      this.resize.startOffset = this.resize.startOffsetWidth - e.pageX
      this.resize.startWidth = this.resize.width

      document.body.classList.add('disableSelection')

      this.tableWidthBefore = this.$parent.tableWidth

      document.addEventListener('mousemove', this.onMouseMove)
      document.addEventListener('mouseup', this.onMouseUp)
    },

    onMouseMove (e) {
      if (this.resize.elem) {
        let width = this.resize.startOffset + e.pageX

        // set column width
        this.resize.width = width

        let i = width - this.resize.startOffsetWidth

        this.$parent.tableWidth = this.tableWidthBefore + i
      }
    },

    onMouseUp () {
      document.removeEventListener('mousemove', this.onMouseMove)
      document.removeEventListener('mouseup', this.onMouseUp)

      this.$parent.tableContainerWidth = this.$parent.tableWidth

      document.body.classList.remove('disableSelection')
    },

    onScroll (e) {
      this.$parent.$refs.tableScrollBox.removeEventListener('scroll', this.onScroll)
      this.menu = null
    }
  },

  beforeDestroy () {
    if (this.column.resizable) {
      this.$refs.resize.removeEventListener('mousedown', this.onMouseDown)
    }
  }
}
</script>

<style>

</style>
