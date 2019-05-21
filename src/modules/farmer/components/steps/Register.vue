<template>
  <v-card width="500px" style="margin: 64px auto;">
    <v-card-text>
      <div class="title mb-2">Register Farmer</div>
      <div class="body-1">Enter an email</div>
    </v-card-text>

    <v-divider />

    <v-card-text class="py-4">
      <of-form
        ref="farmerForm"
        :config="formConfig"
        @update="update"
      >
        <template slot-scope="{ form }">
          <of-form-field-text :field="form.getField('name')" />
          <of-form-field-text :field="form.getField('email')" />
        </template>
      </of-form>
    </v-card-text>

    <v-divider />

    <v-card-actions class="pa-3">
      <v-btn color="primary" outline @click="prev">
        Back
      </v-btn>

      <v-spacer />

      <v-btn :loading="loading" :disabled="!isValid" color="primary" @click="next">
        Register
        <v-icon class="ml-2">navigate_next</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import config from './../../form'

export default {
  components: {
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
      formConfig: {
        fields: [
          {
            name: 'id',
            label: 'ID',
          },
          {
            name: 'name',
            label: 'Name',
          },
          {
            name: 'email',
            label: 'Email',
          },
        ],
        type: 'register'
      },
      email: null,
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.farmerForm.setValues(this.value)
      this.farmerForm.setDisabled('name', true)
    })
  },

  computed: {
    farmerForm () {
      return this.$refs.farmerForm
    },

    isValid () {
      return this.email && this.email !== ''
    },
  },

  methods: {
    ...mapActions('farmer', {
      createItem: 'createItem',
      registerItem: 'registerItem',
    }),

    prev () {
      this.$emit('event:select', null)
    },

    async next () {
      let form = this.farmerForm.getForm()

      let values = form.getValues()

      if (values.id) {
        this.loading = true

        try {
          const response = await this.registerItem(values)

          this.$emit('event:profile', response.data.data)
        } catch (error) {
          form.setError(error)
          document.documentElement.scrollTop = 0
        } finally {
          this.loading = false
        }
      } else {
        this.loading = true

        try {
          const response = await this.createItem(values)

          this.$emit('event:profile', response.data.data)
        } catch (error) {
          form.setError(error)
          document.documentElement.scrollTop = 0
        } finally {
          this.loading = false
        }
      }
    },

    update (form) {
      this.email = form.getValues().email
    }
  }
}
</script>

<style>

</style>
