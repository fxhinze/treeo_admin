<template>
  <v-app>
    <the-sidebar-component />
    <the-toolbar-component />
    <v-content>
      <transition :name="transition" mode="out-in">
        <keep-alive :include="cachedViews">
          <router-view :key="$route.path" />
        </keep-alive>
      </transition>
    </v-content>
    <the-footer-component v-if="footer" />
  </v-app>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import TheSidebarComponent from './../components/TheSidebar'
import TheToolbarComponent from './../components/TheToolbar'
import TheFooterComponent from './../components/TheFooter'

export default {
  components: {
    TheSidebarComponent,
    TheToolbarComponent,
    TheFooterComponent,
  },

  data () {
    return {
      footer: false,
      drawer: true,
    }
  },

  computed: {
    ...mapGetters('global', {
      transition: 'getTransition',
    }),

    ...mapState('global', {
      cachedViews: 'cachedViews',
    })
  }
}
</script>

<style>

</style>
