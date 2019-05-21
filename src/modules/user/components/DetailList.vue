<template>
  <detail-list-widget-component
    :item="item"
    :list-items="listItems"
  />
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import DetailListWidgetComponent from '@/components/overview-widgets/DetailList'

import { detailList } from './../overview'

export default {
  components: {
    DetailListWidgetComponent
  },

  data () {
    return {
      listItems: detailList
    }
  },

  computed: {
    ...mapState('user', {
      item: state => state.item
    })
  },
}
</script>
