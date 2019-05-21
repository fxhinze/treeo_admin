<template>
  <of-datatable
    :datatable="datatable"
    @fetchData="fetchData"
    @action:create="onCreate"
    @action:edit="id => onEdit(id)"
    @action:delete="id => onDelete(id)"
    create-btn="Create"
    hide-action-forward
    hide-action-menu
    :title="title"
    fixed-header
  >
    <template slot="popups">
      <popup-component
        :title="titleCreateItem"
        cancel-label="Cancel"
        confirm-label="Save"
        :has-content="true"
        v-model="createPopup"
        @action:confirm="$refs.createForm.submit()"
      >
        <component :is="formComponent"
          ref="createForm"
          @success="createPopup = false"
          type="create"
          hide-actions
        />
      </popup-component>

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
      default: 'CREATE ITEM'
    },

    titleEditItem: {
      type: String,
      default: 'EDIT ITEM'
    },

    titleDeleteItem: {
      type: String,
      default: 'DELETE ITEM'
    },

    formComponent: {}
  },

  components: {
    PopupComponent,
  },

  mounted () {
    this.fetchData()
  },

  data () {
    return {
      datatable: this.$createDatatable(this.config),
      createPopup: null,
      editPopup: null,
      deletePopup: null,
      itemId: null,
    }
  },

  watch: {
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
      return this.$store.getters[this.storeModule].getItem
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

    item () {
      return this.$store.state[this.storeModule].item
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

    fetchData () {
      this.setQuery(this.datatable.getQueryApi())

      this.fetchItems()
    },

    onCreate () {
      this.createPopup = true
    },

    onEdit (id) {
      if (id) {
        this.fetchItem(id).then(() => {
          this.itemId = id
          this.editPopup = true
        })
      }
    },

    onDelete (id) {
      if (id) {
        this.itemId = id
        this.deletePopup = true
      }
    },
  },

  beforeDestroy () {
    let modules = Object.keys(this.$store._actions)
    if (modules.indexOf(`${this.storeModule}/clear`) !== -1) {
      this.$store.dispatch(`${this.storeModule}/clear`)
    }
  }
}
</script>
