<template>
  <v-container fluid grid-list-xl>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 lg3>
        <v-card style="display: flex;">
          <v-layout>
            <v-flex xs5 py-3 pl-4>
              <v-icon color="primary" light style="font-size: 80px;">person</v-icon>
            </v-flex>
            <v-flex xs7>
              <v-card-title primary-title class="pt-3">
                <div>
                  <div class="title mb-2 mt-1">Farmers</div>
                  <div class="subheading">{{ farmer.totalCount }}</div>
                </div>
              </v-card-title>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>

      <v-flex xs12 sm6 md4 lg3>
        <v-card style="display: flex;">
          <v-layout>
            <v-flex xs5 py-3 pl-4>
              <v-icon color="primary" light style="font-size: 80px;">place</v-icon>
            </v-flex>
            <v-flex xs7>
              <v-card-title primary-title class="pt-3">
                <div>
                  <div class="title mb-2 mt-1">Plots</div>
                  <div class="subheading">{{ plot.totalCount }}</div>
                </div>
              </v-card-title>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>

      <v-flex xs12 sm6 md4 lg3>
        <v-card style="display: flex;">
          <v-layout>
            <v-flex xs5 py-3 pl-4>
              <v-icon color="primary" light style="font-size: 80px;">poll</v-icon>
            </v-flex>
            <v-flex xs7>
              <v-card-title primary-title class="pt-3">
                <div>
                  <div class="title mb-2 mt-1">Surveys</div>
                  <div class="subheading">{{ survey.totalCount }}</div>
                </div>
              </v-card-title>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>

      <v-flex xs12 sm6 md4 lg3>
        <v-card style="display: flex;">
          <v-layout>
            <v-flex xs5 py-3 pl-4>
              <v-icon color="primary" light style="font-size: 80px;">nature</v-icon>
            </v-flex>
            <v-flex xs7>
              <v-card-title primary-title class="pt-3">
                <div>
                  <div class="title mb-2 mt-1">Trees</div>
                  <div class="subheading">{{ tree.totalCount }}</div>
                </div>
              </v-card-title>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import api from '@/api'

export default {
  mounted () {
    this.fetchFarmers()
    this.fetchPlots()
    this.fetchSurveys()
    this.fetchTrees()
  },

  data () {
    return {
      farmer: {
        totalCount: null,
      },
      plot: {
        totalCount: null,
      },
      survey: {
        totalCount: null,
      },
      tree: {
        totalCount: null,
      }
    }
  },

  methods: {
    fetchFarmers () {
      api.farmer.getFilteredItems({
        limit: 1,
        // query: [
        //   { field: 'email', type: 'empty', value: 1 },
        // ]
      }).then(({ meta }) => {
        this.farmer.totalCount = meta.pagination.total
      })
    },

    fetchPlots () {
      api.plot.getFilteredItems({
        limit: 1,
      }).then(({ meta }) => {
        this.plot.totalCount = meta.pagination.total
      })
    },

    fetchSurveys () {
      api.survey.getFilteredItems({
        limit: 1,
      }).then(({ meta }) => {
        this.survey.totalCount = meta.pagination.total
      })
    },

    fetchTrees () {
      api.tree.getFilteredItems({
        limit: 1,
      }).then(({ meta }) => {
        this.tree.totalCount = meta.pagination.total
      })
    }
  }
}
</script>

<style>

</style>
