<template>
  <map-component />
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

import MapComponent from '@/modules/map/components/Map'

export default {
  name: 'map-index',

  components: {
    MapComponent
  },

  beforeRouteEnter (to, from, next) {
    next(vm =>
      vm.setPlot(to.params.hasOwnProperty('plotId') ? to.params.plotId : null)
    )
  },

  methods: {
    ...mapMutations('map', {
      setPlot: 'SET_PLOT',
    }),
  }
}
</script>
