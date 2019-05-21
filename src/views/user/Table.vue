<template>
  <table-component />
</template>

<script>
import TableComponent from '@/modules/user/components/Table'

export default {
  name: 'user-table',

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
