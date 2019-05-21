<template>
  <table-component />
</template>

<script>
import TableComponent from '@/modules/farmer/components/Table'

export default {
  name: 'farmer-table',

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
