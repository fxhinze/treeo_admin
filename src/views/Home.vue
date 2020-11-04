<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12 pa-3">
          <div class="pa-2">
            <div class="title mb-3">Welcome to the TREEO administration tool!</div>
          </div>
          <v-card-actions>
            <template v-if="loggedIn">
              <v-btn color="primary" :to="{ name: 'dashboard' }">Go to Dashboard</v-btn>
            </template>
            <template v-else>
              <v-btn color="primary" :to="{ name: 'login' }">Go to Login</v-btn>
            </template>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { authComputed } from '@/store/helpers'

export default {
  name: 'home',

  computed: {
    ...authComputed,
  },
}
</script>
