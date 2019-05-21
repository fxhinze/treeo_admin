<template>
  <div>
    <v-toolbar
      flat
      color="white"
      dense
    >
      <v-icon>poll</v-icon>
      <v-toolbar-title>
        Surveys
      </v-toolbar-title>

      <v-spacer />
    </v-toolbar>
    <v-divider />
    <v-data-table
      v-if="!loading"
      :headers="headers"
      :items="items"
      :pagination.sync="pagination"
    >
      <template slot="items" slot-scope="props">
        <td style="white-space: nowrap;">
          <router-link :to="{ name: 'survey-overview', params: { id: props.item.id }}">{{ props.item.identifier }}</router-link>
        </td>
        <td style="white-space: nowrap;">{{ props.item.date_start }}</td>
        <td style="white-space: nowrap;">{{ props.item.date_end }}</td>
        <td style="white-space: nowrap; text-align: right;">{{ props.item.dbh_mean }}</td>
        <td style="white-space: nowrap; text-align: right;">{{ props.item.treecount }}</td>
        <td style="white-space: nowrap; text-align: right;">{{ props.item.tree_volume }}</td>
        <td style="white-space: nowrap; text-align: right;">{{ props.item.value_ird }}</td>
        <td style="white-space: nowrap;">{{ props.item.created_at }}</td>
        <td style="white-space: nowrap;">{{ props.item.updated_at }}</td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  props: {
    id: {
      type: String,
      default: null
    }
  },

  async mounted () {
    this.loading = true

    await this.fetch({
      id: this.id
    })

    this.loading = false
  },

  data () {
    return {
      loading: true,
      headers: [
        { text: 'ID', value: 'identifier', sortable: false },
        { text: 'Start', value: 'date_start_sortable' },
        { text: 'End', value: 'date_end_sortable' },
        { text: 'DBH (mean)', value: 'dbh_mean_sortable' },
        { text: 'Treecount', value: 'treecount' },
        { text: 'Volume', value: 'volume' },
        { text: 'Value [IDR]', value: 'value_ird_sortable' },
        { text: 'Created', value: 'created_at_sortable' },
        { text: 'Updated', value: 'updated_at_sortable' },
      ],
      pagination: {
        descending: true,
        page: 1,
        rowsPerPage: 25,
        sortBy: 'date_start_sortable',
      }
    }
  },

  computed: {
    ...mapState('plot', {
      items: state => state.surveys,
    }),
  },

  methods: {
    ...mapActions('plot', {
      fetch: 'fetchSurveys',
    }),
  },
}
</script>

<style>

</style>
