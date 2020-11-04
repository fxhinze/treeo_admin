<template>
  <div>
    <v-progress-linear
      v-if="loading"
      :indeterminate="true"
      height="2"
      class="ma-0"
    />
  </div>
</template>

<script>
import service from '@/utils/request'

export default {
  props: {
    query: {
      type: Object,
      default: () => {},
    },
  },

  data () {
    return {
      loading: false,
    }
  },

  methods: {
    async download () {
      const today = new Date()
      let dd = today.getDate()
      let mm = today.getMonth() + 1

      let yyyy = today.getFullYear()
      if (dd < 10) dd = '0' + dd
      if (mm < 10) mm = '0' + mm
      const filename = `farmer-${yyyy}${mm}${dd}`

      try {
        this.loading = true

        const response = await service.request({
          url: '/farmers/csv',
          method: 'get',
          responseType: 'blob',
          params: this.query,
        })

        const url = window.URL.createObjectURL(new Blob([response.data]))
        const element = document.createElement('a')
        element.setAttribute('href', url)
        element.setAttribute('download', filename + '.csv')
        element.style.display = 'none'
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)

        this.loading = false

        this.$emit('action:close')

        return Promise.resolve()
      } catch (error) {
        return Promise.reject(error)
      }
    }
  },
}
</script>

<style lang="scss">
</style>
