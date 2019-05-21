<template>
  <div>
    <v-data-table
      v-if="!loading"
      :headers="headers"
      :items="items"
      :pagination.sync="pagination"
    >
      <template slot="items" slot-scope="props">
        <td style="white-space: nowrap;">
          <router-link :to="{ name: 'tree-overview', params: { id: props.item.id }}">{{ props.item.identifier }}</router-link>
        </td>
        <td style="white-space: nowrap; text-align: right;">{{ props.item.dbh_cm }}</td>
        <td style="white-space: nowrap; text-align: right;">{{ props.item.height_m }}</td>
        <td style="white-space: nowrap;">{{ props.item.point_id ? props.item.point_coords : '' }}</td>
        <td style="white-space: nowrap;">{{ props.item.species }}</td>
        <td style="white-space: nowrap;">{{ props.item.timestamp }}</td>
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
        { text: 'ID', value: 'identifier', sortable: false, align: 'left' },
        { text: 'DBH [cm]', value: 'dbh_cm_sortable', align: 'left' },
        { text: 'Height [m]', value: 'height_m_sortable' },
        { text: 'Point', value: 'point_id', sortable: false },
        { text: 'Species', value: 'species' },
        { text: 'Timestamp', value: 'timestamp_sortable' },
        { text: 'Created', value: 'created_at_sortable' },
        { text: 'Updated', value: 'updated_at_sortable' },
      ],
      pagination: {
        descending: false,
        page: 1,
        rowsPerPage: 25,
        sortBy: 'dbh_cm_sortable',
      }
    }
  },

  computed: {
    ...mapState('survey', {
      items: state => state.trees,
    }),
  },

  methods: {
    ...mapActions('survey', {
      fetch: 'fetchTrees',
    }),
  }
}
</script>

<style>

</style>
