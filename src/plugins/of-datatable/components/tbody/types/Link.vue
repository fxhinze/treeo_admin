<template>
  <div class="of-text-overflow">
    <template v-if="value">
      <router-link :to="{
        name: name,
        params: {
          id: $parent.getColumnProperty(id)
        }
      }">
        {{ value }}
      </router-link>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number, Boolean],
      default: null,
    },

    link: {
      type: Object,
      default: null
    }
  },

  mounted () {
    this.to = {
      name: this.column.link.name,
      params: {
        id: this.id
      }
    }
  },

  data () {
    const row = this.$parent.row
    const column = this.$parent.column

    return {
      row: row,
      column: column,
      linkId: column.link.id,
      to: {},
    }
  },

  computed: {
    id () {
      return this.link.id
    },
    name () {
      return this.link.name
    }
  }
}
</script>
