<template>
  <div :style="backgroundStyle" style="height: 100%;">
    <v-stepper v-model="step" :style="toolbarStyle" style="position: sticky; z-index: 1;">
      <v-stepper-header flat style=" background-color: #fff;">
        <v-stepper-step :complete="step > 1" step="1">
          Select
          <small>select a farmer</small>
        </v-stepper-step>

        <v-divider />

        <v-stepper-step :complete="step > 2" step="2">
          Register
          <small>register farmer</small>
        </v-stepper-step>

        <v-divider />

        <v-stepper-step :complete="step > 3" step="3">
          Profile
          <small>update farmer details</small>
        </v-stepper-step>

        <v-divider />

        <v-stepper-step :complete="step > 4" step="4">
          Overview
          <small>farmer details</small>
        </v-stepper-step>
      </v-stepper-header>
    </v-stepper>

    <v-stepper v-model="step" style="background-color: transparent; box-shadow: none;" flat>
      <v-stepper-items>
        <v-stepper-content step="1" style="transition: none;" class="pa-0">
          <transition name="fade" mode="out-in">
            <step-select-component
              v-if="step === '1'"
              v-model="farmer"
              @event:register="onRegister"
              @event:profile="onProfile"
            />
          </transition>
        </v-stepper-content>

        <v-stepper-content step="2" style="transition: none;" class="pa-0">
          <transition name="fade" mode="out-in">
            <step-register-component
              v-if="step === '2'"
              v-model="farmer"
              @event:select="onSelect"
              @event:profile="onProfile"
            />
          </transition>
        </v-stepper-content>

        <v-stepper-content step="3" style="transition: none;" class="pa-0">
          <transition name="fade" mode="out-in">
            <step-profile-component
              v-if="step === '3'"
              v-model="farmer"
              @event:select="onSelect"
              @event:overview="onOverview"
            />
          </transition>
        </v-stepper-content>

        <v-stepper-content step="4" style="transition: none;" class="pa-0">
          <transition name="fade" mode="out-in">
            <step-overview-component
              v-if="step === '4'"
              v-model="farmer"
              @event:select="onSelect"
              @event:profile="onProfile"
            />
          </transition>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
import routerHelpers from '@/router/helpers'

import StepSelectComponent from '@/modules/farmer/components/steps/Select'
import StepRegisterComponent from '@/modules/farmer/components/steps/Register'
import StepProfileComponent from '@/modules/farmer/components/steps/Profile'
import StepOverviewComponent from '@/modules/farmer/components/steps/Overview'

export default {
  name: 'farmer-create',

  components: {
    StepSelectComponent,
    StepRegisterComponent,
    StepProfileComponent,
    StepOverviewComponent,
  },

  data () {
    return {
      step: '1',
      farmer: null,
      backgroundStyle: {
        background: 'url(/img/handy-wicaksono-1254975-unsplash.jpg)',
        backgroundPosition: 'top center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      },
    }
  },

  computed: {
    toolbarStyle () {
      return {
        top: this.$vuetify.breakpoint.smAndDown ? '48px' : '64px'
      }
    }
  },

  methods: {
    goToItem (name) {
      let route = routerHelpers.getRouteByName(this.$router.options.routes, name)
      route.query = routerHelpers.getCachedQuery(route)

      this.$router.push(route)
    },

    onSelect (payload) {
      document.documentElement.scrollTop = 0

      this.step = '1'
      this.farmer = payload
    },

    onRegister (payload) {
      document.documentElement.scrollTop = 0

      this.step = '2'
      this.farmer = payload
    },

    onProfile (payload) {
      document.documentElement.scrollTop = 0

      this.step = '3'
      this.farmer = payload
    },

    onOverview (payload) {
      document.documentElement.scrollTop = 0

      this.step = '4'
      this.farmer = payload
    }
  }
}
</script>

<style>

</style>
