<template>
  <table-component />
</template>

<script>
import TableComponent from '@/modules/supporter/components/Table'

export default {
  name: 'supporter-table',

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
