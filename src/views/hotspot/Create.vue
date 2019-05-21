<template>
  <div>
    <v-toolbar flat light color="white">
      <v-toolbar-side-icon @click="goToItem('hotspots')">
        <v-icon>arrow_back</v-icon>
      </v-toolbar-side-icon>
      <v-toolbar-title>CREATE A HOTSPOT</v-toolbar-title>
    </v-toolbar>
    <v-divider />
    <v-container>
      <v-layout row wrap justify-start style="max-width: 600px;">
        <v-flex xs12>
          <v-card>
            <v-card-text>
              <form-component @success="goToItem('hotspots')" type="create" />
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import routerHelpers from '@/router/helpers'

import FormComponent from '@/modules/hotspot/components/Form'

export default {
  name: 'hotspot-create',

  components: {
    FormComponent
  },

  methods: {
    goToItem (name) {
      let route = routerHelpers.getRouteByName(this.$router.options.routes, name)
      route.query = routerHelpers.getCachedQuery(route)

      this.$router.push(route)
    }
  }
}
</script>

<style>

</style>
