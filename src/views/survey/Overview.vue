<template>
  <div>
    <div :style="toolbarStyle">
      <v-toolbar flat light color="white">
        <v-toolbar-side-icon @click="goToItem('surveys')">
          <v-icon>arrow_back</v-icon>
        </v-toolbar-side-icon>

        <v-toolbar-title v-text="'SURVEY OVERVIEW'" />

        <v-spacer />

        <div
          v-if="loading"
          class="subheading"
          v-text="'Loading...'"
        />

        <template v-else>
          <v-btn flat @click="editPopup = true">
            <span v-text="'Edit Survey'" />
          </v-btn>

          <v-btn depressed color="error" @click="deletePopup = true">
            <span v-text="'Delete'" />
            <v-icon right small>delete</v-icon>
          </v-btn>
        </template>
      </v-toolbar>

      <v-divider />
    </div>

    <transition name="fade-transform-top-bottom" mode="out-in">
      <v-container
        v-if="showDetails"
        fluid grid-list-xl
      >
        <v-layout row wrap>
          <v-flex sm12 md6 lg4>
            <v-card tile>
              <detail-list-componenent :id="id" />
            </v-card>
          </v-flex>
          <v-flex sm12 md6 lg8>
            <v-card tile>
              <detail-trees-component :id="id" />
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </transition>

    <popup-component
      v-model="editPopup"
      title="EDIT SURVEY"
      cancel-label="Cancel"
      confirm-label="Save"
      has-content
      @action:confirm="$refs.editForm.submit()"
    >
      <form-component
        :id="id"
        :item="survey"
        ref="editForm"
        @success="editPopup = false"
        type="edit"
        hide-actions
      />
    </popup-component>

    <popup-component
      v-model="deletePopup"
      title="DELETE SURVEY"
      toolbar-dark
      toolbar-color="blue-grey darken-3"
      cancel-label="Cancel"
      confirm-label="Delete"
      confirm-color="error"
      max-width="400"
      @action:confirm="deleteItem(id).then(() => goToItem())"
    />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import routerHelpers from '@/router/helpers'

import PopupComponent from '@/components/Popup'
import FormComponent from '@/modules/survey/components/Form'

import DetailListComponenent from '@/modules/survey/components/DetailList'
import DetailTreesComponent from '@/modules/survey/components/DetailTrees'

export default {
  name: 'survey-overview',

  beforeRouteEnter (to, from, next) {
    next(vm => vm.setRoute(to, from))
  },

  components: {
    PopupComponent,
    FormComponent,
    DetailListComponenent,
    DetailTreesComponent,
  },

  props: {
    id: {
      type: String,
      default: null
    },

    item: {
      type: Object,
      default: null,
    },
  },

  async mounted () {
    await this.fetch({
      id: this.id,
      item: this.item
    })

    this.onEnter()
  },

  data () {
    return {
      showDetails: false,
      routeFrom: null,
      editPopup: false,
      deletePopup: false,
    }
  },

  computed: {
    ...mapState('survey', {
      survey: 'item',
    }),

    toolbarTop () {
      return this.$vuetify.application.top
    },

    toolbarStyle () {
      return {
        position: 'sticky',
        zIndex: 1,
        top: this.toolbarTop + 'px',
      }
    },

    loading () {
      return !this.survey
    },
  },

  methods: {
    ...mapActions('survey', {
      fetch: 'fetchItem',
      clearItem: 'clearItem',
      clearTrees: 'clearTrees',
      deleteItem: 'deleteItem',
    }),

    setRoute (routeTo, routeFrom) {
      this.setRouteFrom(routeFrom)
    },

    setRouteFrom (routeFrom) {
      this.routeFrom = routeFrom
    },

    goToItem (name = null) {
      if (!name) {
        return this.$router.push({
          name: 'survey-table'
        })
      }

      if (this.routeFrom && !this.routeFrom.matched.some(route => route.name === name)) {
        return this.$router.go(-1)
      }

      let route = routerHelpers.getRouteByName(this.$router.options.routes, name)
      route.query = routerHelpers.getCachedQuery(route)

      return this.$router.push(route)
    },

    onEnter () {
      this.$nextTick(() => {
        this.showDetails = true
      })
    }
  },

  beforeRouteLeave (to, from, next) {
    this.showDetails = false
    next()
  },

  beforeDestroy () {
    this.clearItem()
    this.clearTrees()
  }
}
</script>

<style>

</style>
