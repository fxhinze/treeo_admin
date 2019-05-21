<template>
  <div :style="backgroundStyle" style="height: 100%;">
    <div style="overflow: hidden;">
      <profile-component />
    </div>
  </div>
</template>

<script>
import ProfileComponent from '@/modules/user/components/Profile'

export default {
  name: 'profile-index',

  components: {
    ProfileComponent,
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
