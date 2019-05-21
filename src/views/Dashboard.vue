<template>
  <div :style="backgroundStyle" style="height: 100%;">
    <cards-group-component />
  </div>
</template>

<script>
import CardsGroupComponent from '@/modules/dashboard/components/CardsGroup'

export default {
  name: 'dashboard-index',

  components: {
    CardsGroupComponent,
  },

  data () {
    return {
      backgroundStyle: {
        background: 'url(/img/handy-wicaksono-1254975-unsplash.jpg)',
        backgroundPosition: 'top center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      },
    }
  }
}
</script>
