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
    function getIcon (route) {
      return route.hasOwnProperty('icon') ? route.icon : null
    }

    function getRouteTitle (route) {
      return typeof route.title === 'function' ? route.title() : route.title
    }

    function genChildren (h, route) {
      let children = []

      if (getIcon(route)) {
        children.push(
          h('v-icon', getIcon(route))
        )
      } else {
        children.push(
          h('span', getRouteTitle(route))
        )
      }

      return children
    }

    return props.routes.map(route => {
      return h('v-btn', {
        props: {
          flat: true,
          to: route,
          key: route.name,
          exact: true,
          icon: !!getIcon(route)
        }
      }, genChildren(h, route))
    })
  }
}
</script>