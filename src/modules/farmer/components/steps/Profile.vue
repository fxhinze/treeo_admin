<template>
  <v-card width="500px" style="margin: 64px auto;">
    <v-card-text>
      <div class="title mb-2">Farmer Profile</div>
      <div class="body-1">Update farmer profile informations</div>
    </v-card-text>

    <v-divider />

    <v-card-text class="py-4">
      <of-form
        ref="farmerForm"
        :config="formConfig"
        @update="update"
      >
        <template slot-scope="{ form }">
          <of-form-field-text :field="form.getField('email')" />
          <of-form-field-text :field="form.getField('name')" />
          <of-form-field-autocomplete :field="form.getField('project_id')" :fetch="fetchProjects" />
          <of-form-field-text :field="form.getField('children')" />
          <of-form-field-date :field="form.getField('birthday')" />
          <of-form-field-select :field="form.getField('gender_id')" :fetch="fetchGenders" />
          <of-form-field-text :field="form.getField('main_occupation')" />
          <of-form-field-text :field="form.getField('side_occupation')" />
          <of-form-field-text :field="form.getField('spouse_name')" />
          <of-form-field-date :field="form.getField('spouse_birthday')" />
          <of-form-field-text :field="form.getField('spouse_main_occupation')" />
          <of-form-field-text :field="form.getField('spouse_side_occupation')" />
          <of-form-field-text :field="form.getField('family_income_idr')" />
          <of-form-field-textarea :field="form.getField('address')" />
          <of-form-field-textarea :field="form.getField('story')" />
        </template>
      </of-form>
    </v-card-text>

    <v-divider />

    <v-card-actions class="pa-3">
      <v-btn color="primary" outline @click="prev">
        Back
      </v-btn>

      <v-spacer />

      <v-btn :loading="loading" color="primary" @click="next">
        Save
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

  mounted () {
    this.clearItem()
    this.fetchItem({
      id: this.value.id
    })
  },

  data () {
    return {
      loading: false,
      formConfig: {
        fields: config.fields,
        type: 'edit'
      },
    }
  },

  computed: {
    ...mapState('farmer', {
      item: state => state.item
    }),

    farmerForm () {
      return this.$refs.farmerForm
    },
  },

  watch: {
    item: {
      handler: 'setFormData',
      immediate: true
    }
  },

  methods: {
    ...mapActions('farmer', {
      clearItem: 'clearItem',
      updateItem: 'updateItem',
      fetchItem: 'fetchItem',
      fetchGenders: 'fetchGenders',
      fetchProjects: 'fetchProjects',
      fetchUsers: 'fetchUsers',
    }),

    setFormData () {
      this.$nextTick(() => {
        if (this.item) {
          this.farmerForm.setValues(this.item)
        }
      })
    },

    prev () {
      this.$emit('event:select', null)
    },

    async next () {
      let form = this.farmerForm.getForm()

      let payload = {
        ...form.getValues(),
        id: this.value.id,
      }

      this.loading = true

      try {
        await this.updateItem(payload)

        this.$emit('event:overview', payload)
      } catch (error) {
        form.setError(error)
        document.documentElement.scrollTop = 0
      } finally {
        this.loading = false
      }
    },

    update (form) { }
  },
}
</script>

<style>

</style>
