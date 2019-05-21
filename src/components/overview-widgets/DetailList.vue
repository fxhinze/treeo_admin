<template>
  <v-list two-line class="pa-0" v-if="item" dense>
    <template v-for="(listItem, index) in filteredListItems">
      <v-list-tile :key="index + '_item'">
        <v-list-tile-action v-if="listItem.icon">
          <v-icon>{{ listItem.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ listItem.label }}</v-list-tile-title>
          <v-list-tile-sub-title>
            <template v-if="!listItem.hasOwnProperty('type')">{{ item[listItem.name] }}</template>
            <template v-else-if="listItem.type === 'bool'">
              <v-chip small outline :color="item[listItem.name] ? 'green': 'red'" class="ml-0">{{ item[listItem.name] }}</v-chip>
            </template>
          </v-list-tile-sub-title>
        </v-list-tile-content>

        <v-list-tile-action v-if="listItem.route && item[listItem.name]">
          <v-btn flat icon @click="goTo(item, listItem.route)">
            <v-icon color="primary">forward</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>

      <v-divider v-if="index + 1 < filteredListItems.length" :key="index + '_divider'"></v-divider>
    </template>
  </v-list>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  props: {
    item: {
      type: Object,
      default: null
    },
    listItems: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    filteredListItems () {
      return this.listItems.filter(item => {
        return this.item[item.name]
      })
    }
  },

  methods: {
    goTo (item, route) {
      this.$router.push({
        name: route.name,
        params: { id: item[route.id] }
      })
    }
  }
}
</script>

<style>

</style>
