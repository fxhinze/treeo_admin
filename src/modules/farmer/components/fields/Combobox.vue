<template>
  <v-combobox
    ref="combobox"
    v-model="inputValue"
    :search-input.sync="search"
    :items="availableItems"
    :loading="loading"
    :disabled="disabled"
    label="Search for a farmer name or create a new one"
    item-value="id"
    item-text="name"
    hide-details
    light
    flat
  >
    <template v-if="search" v-slot:prepend-item>
      <v-list-tile @click="test">
        <v-list-tile-content>
          <v-list-tile-title style="display: flex; align-items: center;">
            <v-icon class="mr-2">add</v-icon>
            Register new farmer
            <v-chip small class="ml-2">{{ search }}</v-chip>
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider />
    </template>
    <template v-slot:no-data>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>
            No results matching "<strong>{{ search }}</strong>".
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-combobox>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          id: null,
          name: null,
          email: null,
        }
      },
    },

    fetch: {
      type: Function,
      default: null
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.fetchItems()
    })
  },

  data () {
    return {
      loading: false,
      availableItems: [],
      search: null,
      disabled: false,
    }
  },

  watch: {
    items: {
      handler: function (value) {
        if (!value) return

        this.availableItems = value
      },
      immediate: true
    },

    value (value) {
      if (value.id || value.name || value.email) {
        this.disabled = true

        this.$refs.combobox.blur()
      } else {
        this.disabled = false
      }
    }
  },

  computed: {
    inputValue: {
      get () {
        if (typeof this.value === 'string') {
          return this.value.name
        }

        if (typeof this.value === 'object') {
          return this.value
        }

        return this.value
      },

      set (value) {
        this.setValue(value)
      }
    }
  },

  methods: {
    async fetchItems () {
      if (!this.fetch) return

      this.loading = true

      try {
        this.availableItems = await this.fetch()
      } finally {
        this.loading = false
      }
    },

    test () {
      this.setValue(this.search)
    },

    setValue (value) {
      this.$nextTick(() => {
        if (typeof value === 'string') {
          this.$emit('input', {
            id: null,
            name: value,
            email: null,
          })
        } else if (typeof value === 'object') {
          this.$emit('input', {
            id: value.id || null,
            name: value.name || null,
            email: value.email || null
          })
        }
      })
    },
  }
}
</script>

<style>

</style>
