<template>
  <table-component />
</template>

<script>
import TableComponent from '@/modules/nursery/components/Table'

export default {
  name: 'nursery-table',

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
