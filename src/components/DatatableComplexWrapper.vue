<template>
  <of-datatable
    :datatable="datatable"
    :create-btn="titleCreateItem"
    :title="title"
    :hide-action-chart="!!chartComponent"
    :hide-action-download="!!downloadComponent"
    fixed-header
    hide-action-menu
    @fetchData="refresh => fetchData(refresh)"
    @action:create="onCreate"
    @action:edit="id => onEdit(id)"
    @action:delete="id => onDelete(id)"
    @action:forward="id => onForward(id)"
    @action:chart="() => onChart()"
    @action:download="() => onDownload()"
  >
    <template slot="popups">
      <popup-component
        :title="titleEditItem"
        cancel-label="Cancel"
        confirm-label="Save"
        :has-content="true"
        v-model="editPopup"
        @action:confirm="$refs.editForm.submit()"
      >
        <component :is="formComponent"
          :id="itemId"
          :item="getItem(itemId)"
          ref="editForm"
          @success="editPopup = false"
          type="edit"
          hide-actions
        />
      </popup-component>

      <popup-component
        :title="titleDeleteItem"
        toolbar-dark
        toolbar-color="blue-grey darken-3"
        cancel-label="Cancel"
        confirm-label="Delete"
        confirm-color="error"
        max-width="400"
        v-model="deletePopup"
        @action:confirm="deleteItem(itemId).then(() => deletePopup = false)"
      />

      <popup-component
        v-model="chartPopup"
        :title="titleChartItem"
        mode="overlay"
        has-content
      >
        <component
          :is="chartComponent"
          :filter="datatable.filter"
          @action:close="chartPopup = false"
        />
      </popup-component>

      <popup-component
        title="Download csv"
        cancel-label="Cancel"
        confirm-label="Download"
        v-model="downloadPopup"
        max-width="400"
        @action:confirm="$refs.download.download()"
      >
        <component
          ref="download"
          :is="downloadComponent"
          :query="datatable.getQueryApi()"
          @action:close="downloadPopup = false"
        />
      </popup-component>
    </template>
  </of-datatable>
</template>

<script>
import PopupComponent from '@/components/Popup'

export default {
  props: {
    storeModule: {
      type: String,
      required: true
    },

    config: {
      type: Object,
      required: true
    },

    title: {
      type: String,
      default: 'ITEMS'
    },

    titleCreateItem: {
      type: String,
      default: 'CREATE'
    },

    titleEditItem: {
      type: String,
      default: 'EDIT ITEM'
    },

    titleDeleteItem: {
      type: String,
      default: 'DELETE ITEM'
    },

    titleChartItem: {
      type: String,
      default: 'CHART'
    },

    routerNameOnCreate: {
      type: String,
      default: null
    },

    routerNameOnForward: {
      type: String,
      default: null
    },

    formComponent: {
      default: null,
    },

    chartComponent: {
      default: null,
    },

    downloadComponent: {
      default: null,
    },
  },

  components: {
    PopupComponent,
  },

  data () {
    return {
      datatable: this.$createDatatable(this.config),
      editPopup: null,
      deletePopup: null,
      chartPopup: null,
      downloadPopup: null,
      itemId: null,
    }
  },

  watch: {
    $route: {
      handler (routeTo, routeFrom = null) {
        if (routeFrom && routeFrom.name !== routeTo.name) {
          // console.log('somewhere else')
        } else {
          // same view
          this.datatable.setQueryRouter(routeTo)
          this.setQuery(this.datatable.getQueryApi())
          this.fetchItems()
        }
      },
      immediate: true,
    },

    loadStatus: {
      handler (value) {
        this.datatable.setLoadStatus(value)
      },
      immediate: true
    },

    items: {
      handler (value) {
        this.datatable.setRows(value)
      },
      immediate: true
    },

    meta: {
      handler (value) {
        this.datatable.setMeta(value)
      },
      immediate: true
    }
  },

  computed: {
    getItem () {
      return this.$store.getters[`${this.storeModule}/getItem`]
    },

    loadStatus () {
      return this.$store.state[this.storeModule].loadStatus
    },

    query () {
      return this.$store.state[this.storeModule].query
    },

    items () {
      return this.$store.state[this.storeModule].items
    },

    meta () {
      return this.$store.state[this.storeModule].meta
    },
  },

  methods: {
    setQuery (payload) {
      return this.$store.dispatch(`${this.storeModule}/setQuery`, payload)
    },

    fetchItem (payload) {
      return this.$store.dispatch(`${this.storeModule}/fetchItem`, payload)
    },

    fetchItems (payload) {
      return this.$store.dispatch(`${this.storeModule}/fetchItems`, payload)
    },

    deleteItem (payload) {
      return this.$store.dispatch(`${this.storeModule}/deleteItem`, payload)
    },

    fetchData (refresh) {
      this.$router.push({
        name: this.$route.name,
        query: this.datatable.getQueryRouter(this.$route)
      })

      if (refresh) {
        this.fetchItems()
      }
    },

    onCreate () {
      this.$router.push({ name: this.routerNameOnCreate })
    },

    onEdit (id) {
      if (id) {
        this.itemId = id
        this.editPopup = true
      }
    },

    onDelete (id) {
      if (id) {
        this.itemId = id
        this.deletePopup = true
      }
    },

    onForward (id) {
      if (id) {
        this.$nextTick(() => {
          this.$router.push({
            name: this.routerNameOnForward,
            params: { id, item: this.getItem(id) }
          })
        })
      }
    },

    onChart (payload = {}) {
      this.chartPopup = true
    },

    onDownload (payload = {}) {
      this.downloadPopup = true
    },
  }
}
</script>
