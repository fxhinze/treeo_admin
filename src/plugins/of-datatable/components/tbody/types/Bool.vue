<template>
  <div class="of-text-overflow">
    <v-chip small outline :color="color" class="ml-0">
      {{ value }}
    </v-chip>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number, Boolean],
      default: null,
    }
  },

  computed: {
    color () {
      return this.value ? 'green' : 'red'
    }
  }
}
</script>
