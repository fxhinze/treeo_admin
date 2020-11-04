<template>
  <div style="display: flex; flex-direction: column; height: 100%; background-color: #37474F;">
    <v-toolbar flat dark color="transparent">
      <v-toolbar-side-icon @click="goToItem('farmers')">
        <v-icon>arrow_back</v-icon>
      </v-toolbar-side-icon>
      <v-toolbar-title>FARMER STATISTICS</v-toolbar-title>

      <v-spacer />

      <v-btn light>Overall</v-btn>
      <v-btn light>Trees</v-btn>
      <v-btn light>Farmer</v-btn>
    </v-toolbar>
    <v-divider dark />
    <div v-resize-directive:debounce.300="onResize" style="flex: 1 0 auto; display: flex; flex-direction: column; position: relative;">
      <chart-component
        :size="chartSize"
      />
    </div>
  </div>
</template>

<script>
import routerHelpers from '@/router/helpers'

import resizeDirective from '@/directives/of-resize'
import ChartComponent from '@/modules/farmer/components/Chart'

export default {
  name: 'farmer-statistics',

  components: {
    ChartComponent
  },

  directives: {
    resizeDirective
  },

  props: {
  },

  mounted () {
  },

  data () {
    return {
      chartSize: {
        width: '100%',
        height: '100%',
      }
    }
  },

  methods: {
    goToItem (name) {
      let route = routerHelpers.getRouteByName(this.$router.options.routes, name)
      route.query = routerHelpers.getCachedQuery(route)

      this.$router.push(route)
    },

    onResize (payload = null) {
      if (!payload) return

      const { left, top, width, height } = payload

      this.chartSize = {
        width: width,
        height: height,
      }
    }
  }
}
</script>

<style>

</style>
