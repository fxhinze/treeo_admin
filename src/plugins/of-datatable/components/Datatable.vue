<template>
  <div class="of-datatable">
    <div class="of-datatable__container">
      <v-progress-linear
        :active="loading"
        class="of-datatable__progress"
        :indeterminate="true"
        height="5"
        color="primary"
        :style="progressStyle"
      ></v-progress-linear>
      <header-component
        :datatable="datatable"
        :filter="filter"
        :search-bar="searchBar"
        :columns="columns"
        :search="search"
        @updateSearchbar="value => searchBar = value"
        @updateSearch="value => updateSearch(value)"
        @clearFilterValue="column => clearFilterValue(column)"
        ref="test"
      >
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-btn v-if="createBtn" flat @click="$emit('action:create')">{{createBtn}}</v-btn>
        <div v-if="showActiveFilter" class="ml-3" style="cursor: pointer;" @click="searchBar = true">
          Active Filter ({{ datatable.filter.getSelectedItemsLength() + (hasSearch ? 1 : 0) }})
        </div>
        <v-spacer />
        <div style="width: 80px">
          <v-select
            :items="tableSizes"
            label="Overflow Btn"
            v-model="tableSize"
            solo
            hide-details
            dense
            flat
          ></v-select>
        </div>

        <v-btn icon @click="searchBar = !searchBar">
          <v-icon :color="searchBar ? 'primary' : ''">filter_list</v-icon>
        </v-btn>

        <v-tooltip v-if="hideActionChart" top>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon @click="$emit('action:chart')">
              <v-icon>show_chart</v-icon>
            </v-btn>
          </template>
          <span>Statistics</span>
        </v-tooltip>

        <v-tooltip v-if="hideActionDownload" top>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon @click="$emit('action:download')">
              <v-icon>cloud_download</v-icon>
            </v-btn>
          </template>
          <span>Download data as csv</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon @click="$emit('fetchData', true)" :loading="loading">
              <v-icon>refresh</v-icon>
            </v-btn>
          </template>
          <span>Reload</span>
        </v-tooltip>

        <v-btn icon disabled>
          <v-icon>more_vert</v-icon>
        </v-btn>
      </header-component>
      <div
        class="of-datatable__body"
        :style="{ 'padding-right': sidebar ? '300px' : '0' }">
        <div class="of-datatable__body-scroll-container" ref="tableScrollBox">
          <div class="of-datatable__body-scroll-container-inner" :style="{ width: tableContainerWidth + 'px' }">
            <table
              ref="table"
              :style="{ width: tableWidth + 'px' }"
              :class="['of-table-size-' + tableSize, tableBordered ? 'of-table-bordered' : '']"
              class="of-datatable__table"
            >
              <thead ref="tableHeader" class="of-datatable__table-thead">
                <tr>
                  <thead-cell-component
                    v-for="(column, index) in thead.columnsVisible"
                    :datatable="datatable"
                    :thead="thead"
                    :filter="filter"
                    :columnName="column"
                    :query="query"
                    :key="index"
                    :fixed-header="fixedHeader"
                    :show-search="searchBar"
                    @updateSort="column => updateSort(column)"
                    @fetchData="$emit('fetchData')"
                  />
                </tr>
              </thead>
              <tbody ref="tableBody" class="of-datatable__tbody">
                <tr
                  v-for="(row, i) in tbodyRows" :key="i"
                >
                  <tbody-cell-actions-component
                    :row="row"
                    :hideActionForward="hideActionForward"
                    :hideActionMenu="hideActionMenu"
                  />
                  <tbody-cell-component
                    v-for="(column, j) in filteredColumns(row)"
                    :key="i + '_' + j"
                    :row="row"
                    :column="column"
                  />
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div
          class="of-datatable__body-sidebar"
          :style="{ 'transform': 'translateX(' + (sidebar ? '0' : '300px') + ')' }"
        >
          <template v-if="sidebarContent === 'filter'">
            <v-toolbar flat dense color="white">
              <v-toolbar-title>Filter</v-toolbar-title>
              <v-spacer />
              <v-btn icon @click="sidebar = false; sidebarContent = null">
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-container>
            </v-container>
          </template>

          <template v-if="sidebarContent === 'column-visibility'">
            <v-toolbar flat dense color="white">
              <v-toolbar-title>Column Visibility</v-toolbar-title>
              <v-spacer />
              <v-btn icon @click="sidebar = false; sidebarContent = null">
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-container>
              <div v-for="(column, index) in columns" :key="index">
                <v-checkbox :disabled="column.name === 'index'" v-model="columnsVisible" :label="column.label" :value="column.name" hide-details class="mt-0"></v-checkbox>
              </div>
            </v-container>
          </template>
        </div>
      </div>

      <footer-component
        :datatable="datatable"
        :query="query"
        :pagination="pagination"
        @updateQuery="query => updateQuery(query)"
      />
    </div>

    <slot name="popups" />
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import helpers from './../utils/helpers'

import TheadCellComponent from './thead/TheadCell'
import TbodyCellComponent from './tbody/TbodyCell'
import TbodyCellActionsComponent from './tbody/TbodyCellActions'
import HeaderComponent from './header/Header'
import FooterComponent from './footer/Footer'

export default {
  components: {
    TheadCellComponent,
    TbodyCellComponent,
    TbodyCellActionsComponent,
    HeaderComponent,
    FooterComponent
  },

  props: {
    title: {
      type: String,
      default: 'Datatable'
    },

    createBtn: {
      type: String,
      default: null
    },

    datatable: {
      type: Object,
      required: true,
    },

    fixedHeader: {
      type: Boolean,
      default: false
    },

    tableBordered: {
      type: Boolean,
      default: false
    },

    hideActionForward: {
      type: Boolean,
      default: false
    },

    hideActionMenu: {
      type: Boolean,
      default: false
    },

    hideActionChart: {
      type: Boolean,
      default: false,
    },

    hideActionDownload: {
      type: Boolean,
      default: false,
    },
  },

  mounted () {
    this.calcLoadingIndicator()
  },

  data () {
    return {
      searchBar: true,
      tableWidth: 0,
      tableContainerWidth: 0,
      tableSize: 'md',
      tableSizes: ['xs', 'md'],
      sidebar: false,
      sidebarContent: null,
      columnAction: helpers.createColumnAction(),
      progressStyle: {
        top: 0,
        right: 0,
        opacity: 0
      },
    }
  },

  watch: {
    loading: {
      handler: function (value) {
        if (value) {
          this.$refs.tableScrollBox.scrollTop = 0
        }

        this.progressStyle.opacity = value ? 1 : 0
      }
    },

    columnsVisible (value) {
      this.columns = this.columns.map(column => {
        return {
          ...column,
          visible: value.includes(column.name)
        }
      })

      this.calcColumnsWidth()
    },
    searchBar: 'calcLoadingIndicator',
    sidebar: 'calcLoadingIndicator',
  },

  computed: {
    showActiveFilter () {
      return (this.hasFilter || this.hasSearch) && this.searchBar === false
    },

    initialLoading () {
      return this.datatable.initialLoading
    },

    loading () {
      return this.datatable.isLoading()
    },

    thead () {
      return this.datatable.thead
    },

    filter () {
      return this.datatable.filter
    },

    columns () {
      return this.datatable.getColumns()
    },

    columnsVisible () {
      return this.datatable.getVisibleColumns()
    },

    tbodyRows () {
      return this.datatable.getRows()
    },

    dataTest () {
      return this.datatable.getData()
    },

    rows () {
      return Object.freeze(this.datatable.getRowsNew())
    },

    hasFilter () {
      return this.datatable.filter.hasSelectedItems()
    },

    hasSearch () {
      return this.datatable.hasSearch()
    },

    search () {
      return this.datatable.getSearch()
    },

    query () {
      return this.datatable.getQuery()
    },

    pagination () {
      return this.datatable.getPagination()
    }
  },

  methods: {
    calcLoadingIndicator () {
      this.$nextTick(() => {
        let top = 0

        if (this.$refs.hasOwnProperty('tableHeader')) {
          top += this.$refs.tableHeader.clientHeight
        }

        if (this.$refs.hasOwnProperty('test')) {
          top += this.$refs.test.$el.clientHeight
        }
        this.progressStyle.top = top + 'px'

        this.progressStyle.right = this.sidebar ? 300 + 'px' : 0
        this.progressStyle.opacity = 1
      })
    },

    clearFilterValue (field) {
      this.datatable.filter.removeSelectedItem(field)
      this.datatable.setQuery({ page: 1 })
      this.$emit('fetchData')
    },

    setColumns (value) {
      this.columns = value

      this.columnsVisible = this.columns
        .filter(column => !!column.visible)
        .map(column => column.name)

      this.calcColumnsWidth()
    },

    calcColumnsWidth () {
      let count = this.datatable.calcColumnsWidth()

      count.width = count.width + this.columnAction.width

      this.tableWidth = count.width
      this.tableContainerWidth = count.width
    },

    updateQuery (value) {
      this.datatable.setQuery(value)
      this.$emit('fetchData')
    },

    updateSort ({ name, sort }) {
      if (!sort) return

      let sortedBy = null

      if (this.query.orderBy === name) {
        sortedBy = this.query.sortedBy === 'asc' ? 'desc' : 'asc'
      } else {
        sortedBy = 'asc'
      }

      this.updateQuery({
        sortedBy: sortedBy,
        orderBy: name
      })
    },

    updateSearch (value) {
      this.datatable.setSearch(value)
      this.datatable.setQuery({ page: 1 })
      this.$emit('fetchData')
    },

    filteredColumns (columns) {
      return columns.filter(column => {
        return column.visible
      })
    }
  },

  beforeDestroy () {
  }
}
</script>

<style lang="scss">

</style>
