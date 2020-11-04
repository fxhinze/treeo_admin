<template>
  <!-- <div v-if="createPopup"> -->
  <div>
    <template v-if="mode === 'modal' && createPopup">
      <v-dialog v-model="editPopup" lazy :max-width="maxWidth" persistent :scrollable="hasContent">
        <v-card>
          <v-toolbar :dark="toolbarDark" :color="toolbarColor" flat>
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click.native="onCancel" :dark="toolbarDark">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar>

          <v-divider v-if="hasContent" />

          <v-card-text v-if="hasContent" style="max-height: 1000px;" ref="scrollContainer">
            <slot />
          </v-card-text>

          <slot v-if="!hasContent" />

          <v-divider v-if="hasContent" />

          <v-card-actions>
            <v-btn v-if="!hideCancelBtn" flat class="elevation-0" @click.native="onCancel">
              {{ cancelLabel }}
            </v-btn>
            <v-spacer></v-spacer>

            <v-btn v-if="!hideConfirmBtn" :disabled="confirmDisabled" :color="confirmColor" @click="onConfirm" :loading="loading">
              {{ confirmLabel }}
              <span slot="loader" class="custom-loader">
                <v-icon light>cached</v-icon>
              </span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <template v-if="mode === 'overlay'">
      <v-navigation-drawer
        v-model="editPopup"
        fixed
        temporary
        disable-resize-watcher
        right
        :width="overlayWidth"
        style="max-width: 100%;"
      >
        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: #37474f;">
          <slot v-if="createPopup" />
        </div>
      </v-navigation-drawer>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      default: 'modal',
    },

    value: {
      type: Boolean,
      default: false
    },

    toolbarDark: {
      type: Boolean,
      default: false
    },

    toolbarColor: {
      type: String,
      default: 'white'
    },

    title: {
      type: String,
      default: 'Popup Title'
    },

    hasContent: {
      type: Boolean,
      default: false
    },

    hideConfirmBtn: {
      type: Boolean,
      default: false,
    },

    confirmLabel: {
      type: String,
      default: 'OK'
    },

    confirmDisabled: {
      type: Boolean,
      default: false
    },

    confirmColor: {
      type: String,
      default: 'primary'
    },

    hideCancelBtn: {
      type: Boolean,
      default: false,
    },

    cancelLabel: {
      type: String,
      default: 'Cancel'
    },

    maxWidth: {
      type: [String, Number],
      default: '600'
    }
  },

  mounted () {
    this.$emit('input', false)
  },

  data () {
    return {
      loading: false,
      createPopup: false,
      editPopup: false
    }
  },

  watch: {
    value (value) {
      if (value) {
        this.open()
      } else {
        this.close()
      }
    },
    editPopup (value) {
      if (!value) {
        this.$emit('input', false)
        // this.close()
      }
    }
  },

  computed: {
    overlayWidth () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '600px'
        case 'sm': return '960px'
        case 'md': return '960px'
        case 'lg': return '1264px'
        case 'xl': return '1904px'
        default: return '1000px'
      }
    }
  },

  methods: {
    open () {
      this.createPopup = true

      this.$nextTick(() => {
        this.editPopup = true
      })
    },

    close () {
      this.editPopup = false

      this.$nextTick(() => {
        this.createPopup = false
      })
    },

    onCancel () {
      this.$emit('input', false)
    },

    onConfirm () {
      if (this.hasContent) {
        this.$refs.scrollContainer.scrollTop = 0
      }
      this.$emit('action:confirm', false)
    }
  }
}
</script>

<style>

</style>
