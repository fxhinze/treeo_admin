<template>
  <v-layout row wrap style="align-self: start;">
    <slot />
  </v-layout>
</template>

<script>
import { ContainerMixin } from 'vue-slicksort'

export default {
  mixins: [
    ContainerMixin,
  ],
}
</script>

<style>

</style>