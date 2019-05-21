<template>
  <table-component />
</template>

<script>
import TableComponent from '@/modules/hotspot/components/Table'

export default {
  name: 'hotspot-table',

  components: {
    TableComponent
  },

  mounted () {
  },

  watch: {
    $route (to, from) {
    }
  }
}
</script>
