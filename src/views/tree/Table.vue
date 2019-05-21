<template>
  <table-component />
</template>

<script>
import TableComponent from '@/modules/tree/components/Table'

export default {
  name: 'tree-table',

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
