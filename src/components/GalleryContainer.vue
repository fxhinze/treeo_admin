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

    <template v-if="updating">
      <div class="updating-container">
        <div class="headline">updating...</div>
      </div>
    </template>

    <v-container grid-list-sm fluid fill-height style="min-height: 300px;">
      <template v-if="loading || !items.length">
        <v-layout align-center justify-center row fill-height>
          <div v-if="loading" class="headline">loading...</div>
          <div v-else class="headline">No photos found</div>
        </v-layout>
      </template>

      <template v-if="!loading && items.length">
        <template v-if="grid">
          <gallery-sortable-grid-component v-model="testItems" axis="xy">
            <gallery-sortable-item-component v-for="(photo, index) in testItems" :key="index" :index="index">
              <slot
                :grid="grid"
                :id="id"
                :photo-id="photo.id"
                :photo="photo.file"
                :caption="photo.caption"
              />
            </gallery-sortable-item-component>
          </gallery-sortable-grid-component>
        </template>
        <!-- <v-layout v-if="grid" row wrap style="align-self: start;">
          <v-flex v-for="photo in items" :key="photo.id" xs6 sm6 md4 lg3 xl2 d-flex>
            <slot
              :grid="grid"
              :id="id"
              :photo-id="photo.id"
              :photo="photo.file"
              :caption="photo.caption"
            />
          </v-flex>
        </v-layout> -->

        <v-layout v-else row wrap style="align-self: start;">
          <v-flex v-for="photo in items" :key="photo.id" xs12 sm12 md12 lg12 xl12 d-flex>
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

    <div v-if="!loading && items.length && grid" class="body-1 px-4 pb-4">Reorder pictures via drag and drop</div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import UploadImageComponent from '@/components/UploadImage'
import GallerySortableGridComponent from '@/components/GallerySortableGrid'
import GallerySortableItemComponent from '@/components/GallerySortableItem'

export default {
  components: {
    UploadImageComponent,
    GallerySortableGridComponent,
    GallerySortableItemComponent,
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

    updating: {
      type: Boolean,
      default: false,
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

  computed: {
    testItems: {
      get () {
        return this.items
      },

      set (value) {
        this.$emit('update:items', value)
      },
    }
  },

  methods: {
  },
}
</script>

<style scoped>
.updating-container {
  position: absolute;
  z-index: 1;
  top: 0; left: 0; bottom: 0; right: 0;
  background-color: rgba(255, 255, 255, 0.5);
}

.updating-container > div {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px;
  margin-left: -100px;
  height: 100px;
  margin-top: -50px;
  background-color: #fff;
  line-height: 100px !important;
  text-align: center;
}

</style>
