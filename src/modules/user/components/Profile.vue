<template>
  <v-card width="500px" style="margin: 64px auto;">
    <v-card-text>
      <div class="title mb-2">Your Profile</div>
      <div class="body-1" v-if="currentUser">Email: {{ currentUser.email }}</div>
    </v-card-text>

    <v-divider />

    <div class="pa-3" v-if="currentUser">
      <form-component
        ref="editForm"
        :id="currentUser.id"
        :item="currentUser"
        type="profile"
        hide-actions
        @success="success"
        @error="error"
      />
    </div>

    <v-divider />

    <v-card-actions class="pa-3">
      <v-spacer />

      <v-btn :loading="loading" color="primary" @click="update">
        Update
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import FormComponent from '@/modules/user/components/Form'

export default {
  components: {
    FormComponent,
  },

  mounted () {
  },

  data () {
    return {
      loading: false,
      item: null,
    }
  },

  computed: {
    ...mapState('auth', {
      currentUser: state => state.currentUser
    }),
  },

  methods: {
    ...mapActions('user', {
      fetchItem: 'fetchItem',
    }),

    update () {
      this.loading = true
      this.$refs.editForm.submit()
    },

    async success () {
      this.loading = false
    },

    async error () {
      this.loading = false
    }
  },
}
</script>

<style>

</style>
