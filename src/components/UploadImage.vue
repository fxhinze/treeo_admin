<template>
  <v-dialog v-model="dialog" :disabled="disabled" lazy persistent max-width="400">
    <slot v-if="hasActivator" slot="activator" />

    <v-btn
      v-else
      slot="activator"
      :disabled="disabled"
      :light="!activatorDark"
      :dark="activatorDark"
      :color="activatorDark ? 'blue-grey darken-3' : 'white'"
      icon
      fab
      small
      class="ma-2"
      @click="$emit('closeMenu')"
    >
      <v-icon>edit</v-icon>
    </v-btn>

    <div style="background-color: #fff;">
      <v-toolbar flat dark color="blue-grey darken-2">
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer />
        <v-btn icon @click.native="dialog = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>

      <template v-if="imageUrl && !loading">
        <v-img
          :src="imageUrl"
          :contain="imageContain"
          height="200px"
          class="white--text"
        >
          <v-layout column class="media">
            <v-flex align-self-end pa-3>
              <v-btn class="ma-0" dark icon fab small color="primary" @click="resetForm">
                <v-icon>delete</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-img>
      </template>

      <template v-else>
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 200px;">
          <div>
            <v-progress-circular v-if="loading" :size="72" :width="15" :rotate="-90" :value="uploadProgress" color="primary">
              {{ uploadProgress }}
            </v-progress-circular>
            <v-btn v-if="!loading && !image" large fab color="primary" dark icon @click="onPickFile">
              <v-icon style="font-size: 20px">
                photo_camera
              </v-icon>
            </v-btn>

            <input ref="fileInput" type="file" style="display: none" accept="image/*" @change="onFilePicked" />
          </div>
        </div>

        <v-divider />
      </template>
      <v-card flat tile>
        <v-card-actions>
          <v-btn
            :disabled="loading"
            flat
            class="elevation-0"
            @click.native="dialog = false"
          >
            Cancel
          </v-btn>
          <v-spacer />
          <v-btn
            :dark="saveBtnDark"
            :color="saveBtnColor"
            :loading="loading"
            :disabled="saveBtnDisabled"
            @click="onSave"
          >
            {{ saveBtnText }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: 'UploadPopup',

  props: {
    title: {
      type: String,
      default: 'Upload',
    },

    activatorDark: {
      type: Boolean,
      default: false,
    },

    imageContain: {
      type: Boolean,
      default: false,
    },

    imageField: {
      type: String,
      default: 'image',
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    url: {
      type: String,
      default: null,
    },

    payload: {
      type: Object,
      default: () => { return {} },
    },

    actionUpload: {
      type: Function,
      default: null,
    },

    actionDelete: {
      type: Function,
      default: null,
    },
  },

  data () {
    return {
      dialog: false,
      loading: false,
      imageUrl: null,
      image: null,
      uploadProgress: 0,
    }
  },

  watch: {
    dialog () {
      if (this.dialog) {
        this.onMounted()
      } else {
        this.onDestroy()
      }
    },
  },

  computed: {
    hasActivator () {
      return !!this.$slots.default
    },

    isUpload () {
      return !!(this.image !== null && this.actionUpload)
    },

    isDelete () {
      return !!(!this.imageUrl && this.url && this.actionDelete ? true : null)
    },

    saveBtnDark () {
      return !!(this.isUpload || this.isDelete)
    },

    saveBtnColor () {
      return 'primary'
    },

    saveBtnDisabled () {
      if (this.loading) return true

      return !this.isUpload && !this.isDelete
    },

    saveBtnText () {
      if (this.isUpload) {
        return 'Upload'
      } else if (this.isDelete) {
        return 'Save'
      } else {
        return 'Save'
      }
    },
  },

  methods: {
    onPickFile () {
      this.$refs.fileInput.click()
    },

    onFilePicked (event) {
      const files = event.target.files

      // create a preview
      this.imageUrl = URL.createObjectURL(files[0])

      this.image = files[0]
    },

    deleteImage () {
      this.imageUrl = null
      this.image = null
    },

    resetForm () {
      this.deleteImage()
      this.uploadProgress = 0
    },

    onSave () {
      this.onDelete()
      this.onUpload()
    },

    async onUpload () {
      if (this.isUpload) {
        this.loading = true

        const formData = new FormData()
        formData.append(this.imageField, this.image)

        Object.keys(this.payload).forEach(entry => {
          formData.append(entry, this.payload[entry])
        })

        try {
          await this.actionUpload({
            data: formData,
            callback: (progressEvent) => {
              this.uploadProgress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            },
          })
        } finally {
          this.loading = false
          this.dialog = false
        }
      }
    },

    async onDelete () {
      if (this.isDelete) {
        this.loading = true

        try {
          await this.actionDelete(this.payload)
        } finally {
          this.loading = false
          this.dialog = false
        }
      }
    },

    onMounted () {
      this.resetForm()

      this.$nextTick(() => {
        this.imageUrl = this.url
      })
    },

    onDestroy () {
    },
  },
}
</script>
