<template>
  <div>
    <v-toolbar
      flat
      color="white"
      dense
    >
      <v-icon>poll</v-icon>
      <v-toolbar-title>
        Plots
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
        <td>
          <div style="white-space: nowrap; width: 50px;">
            <router-link :to="{ name: 'plot-overview', params: { id: props.item.id }}">
              {{ props.item.id }}
            </router-link>
          </div>
        </td>
        <td>
          <div style="white-space: nowrap; width: 70px;">
            {{ props.item.latest_survey_date }}
          </div>
        </td>
        <td>
          <div style="white-space: nowrap; width: 100px;">
            {{ props.item.species }}
          </div>
        </td>
        <td>
          <div style="white-space: nowrap; width: 70px;">
            {{ props.item.survey_count }}
          </div>
        </td>
        <td>
          <div style="white-space: nowrap; width: 50px;">
            {{ props.item.latest_survey_treecount }}
          </div>
        </td>
        <td>
          <div style="white-space: nowrap; width: 50px;">
            {{ props.item.latest_survey_dbh_mean }}
          </div>
        </td>
        <td>
          <div style="white-space: nowrap; width: 50px;">
            {{ props.item.latest_survey_height_mean }}
          </div>
        </td>
        <td>
          <div style="white-space: nowrap; width: 50px;">
            {{ props.item.latest_survey_tree_volume }}
          </div>
        </td>
        <td>
          <div style="white-space: nowrap; width: 100px;">
            {{ props.item.latest_survey_value_ird }}
          </div>
        </td>
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
        { text: 'ID', value: 'id', sortable: false, align: 'left' },
        { text: 'Last Survey', value: 'latest_survey_date_sortable' },
        { text: 'Species', value: 'species' },
        { text: 'Survey Count', value: 'survey_count' },
        { text: 'Tree count', value: 'latest_survey_treecount' },
        { text: 'DBH [cm]', value: 'latest_survey_dbh_mean_sortable' },
        { text: 'Height [m]', value: 'latest_survey_height_mean_sortable' },
        { text: 'Volume [m³]', value: 'latest_survey_tree_volume_sortable' },
        { text: 'Value [IDR]', value: 'latest_survey_value_ird_sortable' },
      ],
      pagination: {
        descending: true,
        page: 1,
        rowsPerPage: 25,
        sortBy: 'latest_survey_date_sortable',
      }
    }
  },

  computed: {
    ...mapState('farmer', {
      items: state => state.plots,
    }),
  },

  methods: {
    ...mapActions('farmer', {
      fetch: 'fetchPlots',
    }),
  },
}
</script>

<style>

</style>
