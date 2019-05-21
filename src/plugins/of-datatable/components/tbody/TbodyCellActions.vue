<template>
  <td class="of-sticky of-x of-table-cell-actions">
    <v-btn icon flat small class="show-on-hover" @click.stop="$parent.$emit('action:edit', getPrimaryKey(row))"><v-icon>edit</v-icon></v-btn>
    <v-btn icon flat small class="show-on-hover" @click.stop="$parent.$emit('action:delete', getPrimaryKey(row))"><v-icon>delete</v-icon></v-btn>
    <v-btn v-if="!hideActionForward" icon flat small class="show-on-hover" @click.stop="$parent.$emit('action:forward', getPrimaryKey(row))"><v-icon>forward</v-icon></v-btn>
    <v-spacer />
    <v-btn v-if="!hideActionMenu" icon flat small><v-icon>more_vert</v-icon></v-btn>
  </td>
</template>

<script>
export default {
  props: {
    row: {
      type: Array,
      default: () => []
    },

    hideActionForward: {
      type: Boolean,
      default: false,
    },

    hideActionMenu: {
      type: Boolean,
      default: false,
    }
  },

  methods: {
    getPrimaryKey (row) {
      let column = row.find(column => {
        return column.primaryKey
      }) || null

      return column ? column.label : null
    },
  }
}
</script>

<style>

</style>
