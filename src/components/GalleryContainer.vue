<template>
  <div>
    <v-toolbar
      flat
      color="white"
      dense
    >
      <v-icon>collections</v-icon>
      <v-toolbar-title>
        Gallery
      </v-toolbar-title>

      <v-spacer />

      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <upload-image-component
            :payload="{ id }"
            :action-upload="actionUpload"
            image-field="album[]"
            title="UPLOAD PHOTO"
            image-contain
          >
            <v-btn v-on="on" :disabled="loading" icon>
              <v-icon>add_a_photo</v-icon>
            </v-btn>
          </upload-image-component>
        </template>
        <span>Upload photo to gallery</span>
      </v-tooltip>

      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" :disabled="loading || !items.length" icon @click="grid = !grid">
            <v-icon>{{ grid ? 'grid_off' : 'grid_on' }}</v-icon>
          </v-btn>
        </template>
        <span>{{ grid ? 'Hide grid' : 'Show grid' }}</span>
      </v-tooltip>
    </v-toolbar>
    <v-divider />
    <v-container grid-list-sm fluid fill-height style="min-height: 300px;">
      <template v-if="loading || !items.length">
        <v-layout align-center justify-center row fill-height>
          <div v-if="loading" class="headline">loading...</div>
          <div v-else class="headline">No photos found</div>
        </v-layout>
      </template>

      <template v-if="!loading && items.length">
        <v-layout row wrap style="align-self: start;">
          <v-flex
            v-for="photo in items"
            :key="photo.id"
            :xs6="grid"
            :xs12="!grid"
            :sm6="grid"
            :sm12="!grid"
            :md4="grid"
            :md12="!grid"
            :lg3="grid"
            :lg12="!grid"
            :xl2="grid"
            :xl12="!grid"
            d-flex
          >
            <slot
              :grid="grid"
              :id="id"
              :photo-id="photo.id"
              :photo="photo.file"
              :caption="photo.caption"
            />
          </v-flex>
        </v-layout>
      </template>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import UploadImageComponent from '@/components/UploadImage'

export default {
  components: {
    UploadImageComponent,
  },

  props: {
    id: {
      type: String,
      default: null
    },
    loading: {
      type: Boolean,
      default: true,
    },
    items: {
      type: Array,
      default: () => []
    },
    actionUpload: {
      type: Function,
      default: null,
    },
  },

  data () {
    return {
      grid: true,
    }
  },
}
</script>

<style>

</style>
