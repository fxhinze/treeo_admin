<template>
  <table-component />
</template>

<script>
import TableComponent from '@/modules/survey/components/Table'

export default {
  name: 'survey-table',

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
