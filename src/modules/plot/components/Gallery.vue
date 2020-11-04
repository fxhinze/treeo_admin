<template>
  <gallery-container-component
    :id="id"
    :loading="loading"
    :updating="updating"
    :items="photos"
    :action-upload="uploadGalleryPhotos"
    @update:items="updateItems"
  >
    <gallery-item-component
      slot-scope="{ grid, id, photoId, photo, caption }"
      :grid="grid"
      :id="id"
      :photo-id="photoId"
      :photo="photo"
      :caption="caption"
      :updateAction="updateGalleryPhoto"
      :deleteAction="deleteGalleryPhoto"
    />
  </gallery-container-component>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import GalleryContainerComponent from '@/components/GalleryContainer'
import GalleryItemComponent from '@/components/GalleryItem'

export default {
  components: {
    GalleryContainerComponent,
    GalleryItemComponent,
  },

  props: {
    id: {
      type: String,
      default: null
    },
  },

  mounted () {
    this.fetchGallery(this.id).then(response => {
      this.loading = false
    })
  },

  data () {
    return {
      loading: true,
      updating: false,
    }
  },

  computed: {
    ...mapState('plot', {
      photos: state => state.gallery,
    }),
  },

  methods: {
    ...mapActions('plot', {
      fetchGallery: 'fetchGallery',
      uploadGalleryPhotos: 'uploadGalleryPhotos',
      updateGalleryPhotos: 'updateGalleryPhotos',
      updateGalleryPhoto: 'updateGalleryPhoto',
      deleteGalleryPhoto: 'deleteGalleryPhoto',
    }),

    async updateItems (items) {
      this.updating = true

      await this.updateGalleryPhotos({
        id: this.id,
        items: items,
      })

      this.updating = false
    },
  },
}
</script>

<style>

</style>
