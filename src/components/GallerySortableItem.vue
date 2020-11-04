<template>
  <v-flex xs6 sm6 md4 lg3 xl2 d-flex class="pa-0">
    <slot />
  </v-flex>
</template>

<script>
import { ElementMixin } from 'vue-slicksort'

export default {
  mixins: [
    ElementMixin,
  ],
}
</script>

<style>

</style>