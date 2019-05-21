
<script>
export default {
  props: {
    image: {
      type: String,
      default: null,
    },

    size: {
      type: String,
      default: 'medium',
    },

    default: {
      type: String,
      default: 'default_header.png',
    },
  },

  computed: {
    getImage () {
      return `${process.env.VUE_APP_API_URL}/media/${this.size}/${(this.image || this.default)}`
    },

    getLazyImage () {
      return `${process.env.VUE_APP_API_URL}/media/thumbnail/${(this.image || this.default)}`
    },
  },

  render () {
    return this.$scopedSlots.default({
      src: this.getImage,
      lazySrc: this.getLazyImage,
    })
  },
}
</script>
