<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12 pa-3">
          <div class="pa-2">
            <div class="title mb-3">Reset your password</div>
          </div>

          <template v-if="success">
            <v-alert
              :value="success"
              type="success"
            >
              Success
            </v-alert>
          </template>

          <template v-else-if="error">
            <v-alert
              :value="error"
              type="error"
            >
              {{ error }}
            </v-alert>
          </template>

          <template v-else>
            <v-card-actions>
              <v-btn :disabled="!valid" :loading="tryingToLogIn" color="primary" @click="submit">
                <span>Reset Password</span>
                <span slot="loader" class="custom-loader">
                  <v-icon light>cached</v-icon>
                </span>
              </v-btn>
            </v-card-actions>
          </template>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import api from '@/api'

export default {
  name: 'login',

  beforeRouteEnter (to, from, next) {
    next(vm => vm.setParams(to.query))
  },

  data () {
    return {
      error: null,
      success: null,
      tryingToLogIn: false,
      email: null,
      token: null,
    }
  },

  computed: {
    isEmailValid () {
      return !!this.email
    },

    isTokenValid () {
      return !!this.token
    },

    valid () {
      return this.isEmailValid && this.isTokenValid
    }
  },

  methods: {
    submit () {
      if (this.valid) {
        this.tryToLogIn()
      }
    },

    tryToLogIn () {
      this.tryingToLogIn = true
      this.error = null

      return api.auth.resetPassword({
        email: this.email,
        token: this.token,
      })
        .then(user => {
          this.tryingToLogIn = false

          this.success = true
        })
        .catch(response => {
          this.tryingToLogIn = false

          if (
            response !== undefined &&
            response.hasOwnProperty('response') &&
            response.response.hasOwnProperty('data')
          ) {
            const errorObj = response.response.data

            this.error = errorObj.message || 'Error!'
          }
        })
    },

    setParams (query) {
      this.email = query.email || null
      this.token = query.token || null
    }
  }
}
</script>
