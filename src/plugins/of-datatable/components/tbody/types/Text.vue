<template>
  <div :class="classes">
    <template v-if="isValid">
      {{ value }}
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

    textAlign: {
      type: String,
      default: null,
    },
  },

  computed: {
    isValid () {
      return this.value !== null || this.value !== undefined
    },

    classes () {
      let classes = ['of-text-overflow']

      if (this.textAlign && this.textAlign === 'right') {
        classes.push('text-xs-right')
      }

      return classes
    }
  }
}
</script>
