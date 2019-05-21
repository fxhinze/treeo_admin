<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12 pa-3">
          <v-alert
            :value="authError"
            type="error"
          >
            {{ authError }}
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
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                id="password"
                prepend-icon="lock"
                name="password"
                label="Password"
                type="password"
                required
              ></v-text-field>
            </div>
            <v-card-actions>
              <v-btn :to="{ name: 'lost-password' }" flat>Lost password?</v-btn>
              <v-spacer></v-spacer>
              <v-btn :disabled="!valid" :loading="tryingToLogIn" color="primary" type="submit">
                <span>Login</span>
                <span slot="loader" class="custom-loader">
                  <v-icon light>cached</v-icon>
                </span>
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { authMethods } from '@/store/helpers'

export default {
  name: 'login',

  data () {
    return {
      valid: true,
      authError: null,
      tryingToLogIn: false,
      email: '',
      emailRules: [
        v => !!v || 'Email is required',
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
      ]
    }
  },

  methods: {
    ...authMethods,

    submit () {
      if (this.$refs.form.validate()) {
        this.tryToLogIn()
      }
    },

    tryToLogIn () {
      this.tryingToLogIn = true
      this.authError = null

      return this.logIn({
        email: this.email,
        password: this.password,
      })
        .then(user => {
          this.tryingToLogIn = false

          this.$router.push({ name: 'dashboard' })
        })
        .catch(response => {
          this.tryingToLogIn = false

          if (
            response !== undefined &&
            response.hasOwnProperty('response') &&
            response.response.hasOwnProperty('data')
          ) {
            const errorObj = response.response.data

            this.authError = errorObj.message || 'Error!'
          }
        })
    },
  }
}
</script>
