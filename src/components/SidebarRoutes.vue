<script>
export default {
  functional: true,

  props: {
    routes: {
      type: Array,
      required: true
    }
  },

  render (h, { props }) {
    function getRouteTitle (route) {
      return typeof route.title === 'function' ? route.title() : route.title
    }

    function getDisabled (route) {
      return route.hasOwnProperty('disabled') ? route.disabled : false
    }

    return props.routes.map(route => (
      <v-list-tile
        key={route.name}
        to={getDisabled(route) ? undefined : route}
        disabled={getDisabled(route)}
      >
        <v-list-tile-action>
          <v-icon>{route.icon}</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>
          <span>{getRouteTitle(route)}</span>
        </v-list-tile-title>
      </v-list-tile>
    ))
  }
}
</script>