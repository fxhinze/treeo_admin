<template>
  <v-navigation-drawer
    :mini-variant.sync="mini"
    :clipped="$vuetify.breakpoint.lgAndUp"
    v-model="visibility"
    fixed
    app
    stateless
    width="250"
    floating
    style="border-right: 1px solid #e0e0e0;"
  >
    <div :style="toolbarStyle">
      <v-toolbar flat class="transparent">
        <v-list style="width: 100%;" class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title class="body-1">Logged in as {{ loggedIn ? currentUser.name : '' }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-divider></v-divider>
    </div>

    <v-list class="pt-0">
      <v-list-tile
        v-for="(route, index) in persistentNavRoutesFiltered"
        :key="index"
        @click="onClick(route.name)"
        :value="isActive(route.name)"
      >
        <v-list-tile-action>
          <v-icon>{{ route.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>
          {{ route.title }}
        </v-list-tile-title>
        <v-btn v-if="route.action" @click.stop="route.action" icon class="ma-0" style="margin-right: -8px !important;">
          <v-icon>{{ route.actionIcon }}</v-icon>
        </v-btn>
      </v-list-tile>
      <v-list-group
        prepend-icon="view_module"
        :value="showMasterData"
      >
        <v-list-tile slot="activator">
          <v-list-tile-title>Master Data</v-list-tile-title>
        </v-list-tile>
        <sidebar-routes-component :routes="masterDataNavRoutes" />
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import routerHelpers from '@/router/helpers'

import SidebarRoutesComponent from './SidebarRoutes'

export default {
  components: {
    SidebarRoutesComponent
  },

  mounted () {
    this.showMasterData = this.$route.matched.some(record => {
      return this.masterDataNavRoutes
        .map(item => item.name)
        .indexOf(record.name) !== -1
    })
  },

  data () {
    return {
      mini: false,
      showMasterData: null,
      query: {},
      persistentNavRoutes: [
        {
          name: 'dashboard',
          title: 'Dashboard',
          icon: 'dashboard',
        },
        {
          name: 'map',
          title: 'Map',
          icon: 'map',
        },
        {
          name: 'farmers',
          title: 'Farmers',
          icon: 'person',
          action: () => {
            this.$router.push({
              name: 'farmer-register',
            })
          },
          actionIcon: 'add'
        },
        {
          name: 'plots',
          title: 'Plots',
          icon: 'place',
        },
        {
          name: 'surveys',
          title: 'Surveys',
          icon: 'poll',
        },
        {
          name: 'trees',
          title: 'Trees',
          icon: 'nature',
          disabled: false,
        },
        {
          name: 'supporters',
          title: 'Supporters',
          icon: 'public',
          disabled: false,
        },
        {
          name: 'users',
          title: 'Users',
          icon: 'group',
          disabled: false,
          roles: ['admin'],
        },
      ],

      masterDataNavRoutes: [
        {
          name: 'districts',
          icon: 'remove',
          title: 'Districts',
        },
        {
          name: 'hotspots',
          icon: 'remove',
          title: 'Hotspots',
        },
        {
          name: 'legal-status',
          icon: 'remove',
          title: 'Legal Status',
        },
        {
          name: 'nurseries',
          icon: 'remove',
          title: 'Nurseries',
        },
        {
          name: 'planting-distances',
          icon: 'remove',
          title: 'Planting Distances',
        },
        {
          name: 'field-coordinators',
          icon: 'remove',
          title: 'Field Coordinators',
        },
        {
          name: 'projects',
          icon: 'remove',
          title: 'Projects',
        },
        {
          name: 'soil-types',
          icon: 'remove',
          title: 'Soil Types',
        },
        {
          name: 'species',
          icon: 'remove',
          title: 'Species',
        },
        {
          name: 'survey-status',
          icon: 'remove',
          title: 'Survey Status',
        },
        {
          name: 'villages',
          icon: 'remove',
          title: 'Villages',
        },
      ]
    }
  },

  computed: {
    ...mapGetters('auth', {
      loggedIn: 'loggedIn',
      roles: 'roles',
      hasPermission: 'hasPermission',
    }),

    ...mapState('global', {
      getVisibility: state => state.sidebarVisibility
    }),

    ...mapState('auth', {
      currentUser: state => state.currentUser
    }),

    persistentNavRoutesFiltered () {
      return this.persistentNavRoutes.filter(route => {
        return route.hasOwnProperty('roles') ? this.hasPermission(route.roles) : true
      })
    },

    visibility: {
      get () {
        return this.getVisibility
      },

      set (value) {
        this.setVisibility(value)
      }
    },

    toolbarStyle () {
      return {
        background: 'white',
        position: 'sticky',
        zIndex: 1,
        top: 0,
      }
    },
  },
  methods: {
    ...mapActions('global', {
      setVisibility: 'setSidebarVisibility'
    }),

    isActive (routeTo) {
      return this.$route.matched.some(route => route.name === routeTo)
    },

    onClick (name) {
      let route = routerHelpers.getRouteByName(this.$router.options.routes, name)
      route.query = routerHelpers.getCachedQuery(route)

      this.$router.push(route)
    },
  }
}
</script>

<style>

</style>
