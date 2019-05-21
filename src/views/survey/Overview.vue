<template>
  <div>
    <div :style="toolbarStyle">
      <v-toolbar flat light color="white">
        <v-toolbar-side-icon @click="goToItem('surveys')">
          <v-icon>arrow_back</v-icon>
        </v-toolbar-side-icon>
        <v-toolbar-title>SURVEY OVERVIEW</v-toolbar-title>

        <v-spacer />

        <div v-if="!survey" class="subheading">Loading...</div>
        <v-btn v-if="survey" flat @click="editPopup = true">Edit Survey</v-btn>
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
      title="EDIT SURVEY"
      cancel-label="Cancel"
      confirm-label="Save"
      :has-content="true"
      v-model="editPopup"
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
  },

  methods: {
    ...mapActions('survey', {
      fetch: 'fetchItem',
      clearItem: 'clearItem',
      clearTrees: 'clearTrees',
    }),

    setRoute (routeTo, routeFrom) {
      this.setRouteFrom(routeFrom)
    },

    setRouteFrom (routeFrom) {
      this.routeFrom = routeFrom
    },

    goToItem (name) {
      if (this.routeFrom && !this.routeFrom.matched.some(route => route.name === name)) {
        this.$router.go(-1)
      } else {
        let route = routerHelpers.getRouteByName(this.$router.options.routes, name)
        route.query = routerHelpers.getCachedQuery(route)

        this.$router.push(route)
      }
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
