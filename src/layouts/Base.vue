<template>
  <v-app>
    <the-toolbar-component />
    <v-content :style="backgroundStyle">
      <transition name="fade" mode="out-in">
        <router-view :key="$route.path" />
      </transition>
    </v-content>
    <the-footer-component v-if="footer" />
  </v-app>
</template>

<script>
import TheToolbarComponent from './../components/TheToolbar'
import TheFooterComponent from './../components/TheFooter'

export default {
  components: {
    TheToolbarComponent,
    TheFooterComponent,
  },

  data () {
    return {
      footer: false,
      backgroundStyle: {
        background: 'url(/img/ryan-wan-663829-unsplash.jpg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      },
    }
  },
}
</script>

<style>

</style>
