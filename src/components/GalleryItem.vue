<template>
  <v-layout row wrap v-if="photo">
    <v-flex :grow="grid" :shrink="!grid">
      <v-hover>
        <template slot-scope="{ hover }">
          <image-source-component :image="photo" size="medium">
            <v-img
              slot-scope="{ src }"
              :src="src"
              :width="grid ? 'auto' : '200px'"
              :class="{ 'ma-2': grid }"
              aspect-ratio="1"
              class="grey lighten-2"
            >
              <template v-slot:placeholder>
                <v-layout
                  fill-height
                  align-center
                  justify-center
                  ma-0
                >
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-layout>
              </template>
              <v-scale-transition>
                <v-layout
                  v-if="hover"
                  fill-height
                  align-center
                  justify-center
                  ma-0
                  style="background-color: rgba(0,128,43,0.5)"
                >
                  <v-btn light icon fab small color="white" @click="fullscreen = true">
                    <v-icon>fullscreen</v-icon>
                  </v-btn>
                  <v-btn light icon fab small color="white" @click="onDeletePopup">
                    <v-icon>delete</v-icon>
                  </v-btn>
                </v-layout>
              </v-scale-transition>
            </v-img>
          </image-source-component>
        </template>
      </v-hover>
    </v-flex>
    <v-scale-transition mode="out-in" hide-on-leave>
      <v-flex v-if="!grid">
        <div>
          <v-textarea
            :counter="255"
            :rules="captionRules"
            solo
            label="Caption"
            auto-grow
            v-model="captionTemp"
            @focus="onFocus"
            @blur="onBlur"
          ></v-textarea>

          <v-scale-transition>
            <v-layout v-if="active || changed" justify-end row class="px-1 py-3">
              <div>
                <v-btn
                  :loading="loadingUpdate"
                  :disabled="!changed || captionTemp.length > 255"
                  color="primary"
                  class="white--text"
                  @click="onUpdate"
                >
                  Save
                </v-btn>
              </div>
            </v-layout>
          </v-scale-transition>
        </div>
      </v-flex>
    </v-scale-transition>

    <popup-component
      v-model="deletePopup"
      title="DELETE PHOTO"
      toolbar-dark
      toolbar-color="blue-grey darken-3"
      cancel-label="Cancel"
      confirm-label="Delete"
      confirm-color="error"
      max-width="400"
      @action:confirm="onDelete"
    />

    <v-dialog
      v-model="fullscreen"
      :transition="false"
      fullscreen
      hide-overlay
    >
      <v-layout
        fill-height
        align-center
        justify-center
        ma-0
        class="black"
        @click="fullscreen = false"
      >
        <image-source-component :image="photo" size="large">
          <v-img
            slot-scope="{ src, lazySrc }"
            :src="src"
            :lazy-src="lazySrc"
            max-height="100vh"
            max-width="100vw"
            contain
            @click="fullscreen = false"
          >
            <template v-slot:placeholder>
              <v-layout
                fill-height
                align-center
                justify-center
                ma-0
              >
                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
              </v-layout>
            </template>
            <v-layout
              v-if="caption"
              fill-height
              align-end
              justify-center
              ma-0
            >
              <div style="width: 100%; background-color: rgba(0,0,0,0.5)" class="px-3 py-2 white--text d-flex justify-center">
                <div style="width: 100%; max-width: 600px; text-align: center;">{{ caption }}</div>
              </div>
            </v-layout>
          </v-img>
        </image-source-component>
      </v-layout>
    </v-dialog>
  </v-layout>
</template>

<script>
import ImageSourceComponent from '@/components/ImageSource'
import PopupComponent from '@/components/Popup'

export default {
  components: {
    ImageSourceComponent,
    PopupComponent,
  },

  props: {
    grid: {
      type: Boolean,
      default: true,
    },

    id: {
      type: String,
      default: null,
    },

    photoId: {
      type: String,
      default: null,
    },

    photo: {
      type: String,
      default: null,
    },

    caption: {
      type: String,
      default: null,
    },

    updateAction: {
      type: Function,
      default: null,
    },

    deleteAction: {
      type: Function,
      default: null,
    },
  },

  data () {
    return {
      captionTemp: '',
      active: false,
      loadingUpdate: false,
      deletePopup: null,
      fullscreen: false,
      captionRules: [
        v => v.length <= 255 || 'Caption must be less than 255 characters'
      ],
    }
  },

  watch: {
    caption: {
      handler (value) {
        this.captionTemp = value || ''
      },
      immediate: true,
    }
  },

  computed: {
    changed () {
      return (this.caption || '') !== this.captionTemp
    }
  },

  methods: {
    onFocus () {
      this.active = true
    },

    onBlur () {
      this.active = false
    },

    onUpdate () {
      if (!this.updateAction) return

      if (this.captionTemp.length > 255) return

      this.loadingUpdate = true
      this.updateAction({
        id: this.id,
        photoId: this.photoId,
        caption: this.captionTemp,
      }).then(response => {
        this.loadingUpdate = false

        return response
      })
    },

    onDelete () {
      if (!this.deleteAction) return

      this.deleteAction({
        id: this.id,
        photoId: this.photoId,
      }).then(response => {
        this.deletePopup = false

        return response
      })
    },

    onDeletePopup () {
      this.deletePopup = true
    },
  }
}
</script>

<style>

</style>
