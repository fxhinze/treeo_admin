<template>
  <td :class="[column.fixedColumn ? 'of-sticky of-x' : '']" >
    <component
      :is="getComponent(column)"
      :default="column.default"
      :value="column.label"
      :link="column.link"
      :text-align="column.textAlign"
    />
  </td>
</template>

<script>
import TypeDefaultComponent from './types/Default'
import TypeTextComponent from './types/Text'
import TypeBoolComponent from './types/Bool'
import TypeLinkComponent from './types/Link'
import TypeImageComponent from './types/Image'

export default {
  props: {
    column: {
      type: Object,
      default: null,
    },

    row: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    getComponent (column) {
      switch (column.type) {
        case 'text': return TypeTextComponent
        case 'bool': return TypeBoolComponent
        case 'link': return TypeLinkComponent
        case 'image': return TypeImageComponent
        default: return TypeDefaultComponent
      }
    },

    getColumnProperty (key) {
      let property = this.row.find(column => {
        return column.name === key
      }) || null

      return property ? property.label : null
    },
  }
}
</script>

<style>

</style>
