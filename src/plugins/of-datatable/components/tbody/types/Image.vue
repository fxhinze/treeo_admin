<template>
  <div style="width: 37px; height: 37px;" class="grey lighten-3">
    <template v-if="isValid">
      <v-img width="37px" height="37px" :src="src" :aspect-ratio="1" contain />
    </template>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String],
      default: null,
    },
  },

  computed: {
    isValid () {
      return this.value !== null
    },

    src () {
      return `${process.env.VUE_APP_API_URL}/media/small_square/${this.value}`
    },
  }
}
</script>
