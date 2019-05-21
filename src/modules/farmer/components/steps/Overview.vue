<template>
  <v-card width="500px" style="margin: 64px auto;">
    <v-card-text>
      <div class="title">Farmer Overview</div>
    </v-card-text>

    <v-divider />

    <detail-list-component
      :id="value.id"
    />

    <v-card-actions class="pa-3">
      <v-btn color="primary" outline @click="prev">
        Edit profile
      </v-btn>

      <v-spacer />

      <v-btn :loading="loading" color="primary" @click="next">
        Register a new farmer
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import DetailListComponent from './../DetailList'

export default {
  components: {
    DetailListComponent,
  },

  props: {
    value: {
      type: Object,
      default: null,
    }
  },

  data () {
    return {
      loading: false,
    }
  },

  methods: {
    ...mapActions('farmer', {
      createItem: 'createItem',
    }),

    prev () {
      this.$emit('event:profile', this.value)
    },
    next () {
      this.$emit('event:select', null)
    },
  }
}
</script>

<style>

</style>
