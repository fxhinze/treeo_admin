<template>
  <v-toolbar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    id="app-toolbar"
    color="primary"
    dark
    app
    fixed
    flat
  >
    <v-toolbar-side-icon
      v-if="!isHome"
      @click.stop="toggleSidebar"
    />
    <v-img
      src="/logo-small.png"
      :aspect-ratio="16/9"
      contain max-height="60%"
      position="left center"
      style="cursor: pointer"
      class="ml-2"
      max-width="150px"
      @click="goTo"
    />
    <v-spacer />
    <v-toolbar-items class="hidden-sm-and-down">
      <toolbar-routes-component :routes="persistentNavRoutes" />
      <toolbar-routes-component v-if="loggedIn" :routes="loggedInNavRoutes" />
      <toolbar-routes-component v-else :routes="loggedOutNavRoutes" />
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapActions } from 'vuex'
import { authComputed } from '@/store/helpers'

import ToolbarRoutesComponent from './ToolbarRoutes'

export default {
  components: {
    ToolbarRoutesComponent,
  },

  data () {
    return {
      persistentNavRoutes: [],
      loggedInNavRoutes: [
        {
          name: 'farmer-register',
          title: 'Register Farmer',
        },
        {
          name: 'dashboard',
          title: 'Dashboard',
          icon: 'dashboard',
        },
        {
          name: 'profile',
          title: 'Profile',
          icon: 'person',
        },
        {
          name: 'logout',
          title: 'Log out',
          icon: 'exit_to_app',
          tooltip: 'Sign out'
        },
      ],
      loggedOutNavRoutes: [],
    }
  },

  computed: {
    ...authComputed,

    isHome () {
      return this.$route.name === 'home' ||
        this.$route.name === 'login' ||
        this.$route.name === 'lost-password' ||
        this.$route.name === 'reset-password'
    }
  },

  methods: {
    ...mapActions('global', {
      toggleVisibility: 'toggleSidebarVisibility'
    }),

    toggleSidebar () {
      this.toggleVisibility()
    },

    goTo () {
      const name = this.loggedIn ? 'dashboard' : 'home'

      this.$router.push({
        name
      })
    },
  }
}
</script>

<style>

</style>
