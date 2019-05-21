<template>
  <v-card width="500px" style="margin: 64px auto;">
    <v-card-text>
      <div class="title mb-2">Register Farmer</div>
      <div class="body-1">Select a farmer or create a new one</div>
    </v-card-text>

    <v-divider />

    <v-card-text class="py-5">
      <form-field-combobox-component
        v-model="test"
        :fetch="fetchFarmers"
      />
    </v-card-text>

    <v-divider />

    <v-card-actions class="pa-3">
      <v-btn :disabled="!isTestSelected" color="primary" outline @click="test = { id: null, name: null, email: null}">
        Change Selection
        <v-icon right>refresh</v-icon>
      </v-btn>

      <v-spacer />

      <v-btn :disabled="!isTestSelected" color="primary" @click="next">
        Next
        <v-icon class="ml-2">navigate_next</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import FormFieldComboboxComponent from './../fields/Combobox'

export default {
  components: {
    FormFieldComboboxComponent,
  },

  props: {
    value: {
      type: Object,
      default: null,
    }
  },

  mounted () {
    if (this.value) {
      this.test = {
        id: this.value.id || null,
        name: this.value.name || null,
        email: this.value.email || null,
      }
    }
  },

  data () {
    return {
      test: {
        id: null,
        name: null,
        email: null,
      },
      state: null,
    }
  },

  computed: {
    hasId () {
      return !!this.test.id
    },

    hasName () {
      return !!this.test.name
    },

    hasEmail () {
      return !!this.test.email
    },

    isTestSelected () {
      return this.hasId || this.hasName || this.hasEmail
    },
  },

  watch: {
    isTestSelected (value) {
      if (this.hasId && this.hasName && this.hasEmail) {
        this.state = 'test1'
      } else if (this.hasId && !this.hasEmail) {
        this.state = 'test2'
      } else if (!this.hasId && !this.hasEmail && this.hasName) {
        this.state = 'test3'
      } else {
        this.state = null
      }
    }
  },

  methods: {
    ...mapActions('farmer', {
      fetchFarmers: 'fetchFarmers'
    }),

    next () {
      switch (this.state) {
        case 'test1': {
          return this.$emit('event:profile', this.test)
        }
        case 'test2': {
          return this.$emit('event:register', this.test)
        }
        case 'test3': {
          return this.$emit('event:register', this.test)
        }
      }
    },
  }
}
</script>

<style>

</style>
