<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12 pa-3">
          <div class="pa-2">
            <div class="title mb-3">Forgot password?</div>
            <div v-if="!success" class="body mb-3">If you can’t remember your password, enter the email address associated with your treeo membership. We’ll send you an email with your user name and a link for resetting your password.</div>
          </div>

          <template v-if="success">
            <v-alert
              :value="success"
              type="success"
            >
              We sent you an email with your user name and a link for resetting your password
            </v-alert>
          </template>

          <template v-else>
            <v-alert
              :value="error"
              type="error"
            >
              {{ error }}
            </v-alert>

            <v-form @submit.prevent="submit" ref="form" v-model="valid" lazy-validation>
              <div class="pa-2">
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  prepend-icon="person"
                  name="email"
                  label="Email"
                  type="text"
                  required
                ></v-text-field>
              </div>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="!valid" :loading="tryingToLogIn" color="primary" type="submit">
                  <span>Send</span>
                  <span slot="loader" class="custom-loader">
                    <v-icon light>cached</v-icon>
                  </span>
                </v-btn>
              </v-card-actions>
            </v-form>
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

  data () {
    return {
      valid: true,
      error: null,
      success: null,
      tryingToLogIn: false,
      email: '',
      emailRules: [
        v => !!v || 'Email is required',
      ],
    }
  },

  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        this.tryTo()
      }
    },

    tryTo () {
      this.tryingToLogIn = true
      this.error = null

      const baseUrl = window.location.protocol + '//' + window.location.host

      return api.auth.lostPassword({
        email: this.email,
        reseturl: `${baseUrl}/reset-password`,
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
  }
}
</script>
