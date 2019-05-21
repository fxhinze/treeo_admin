<template>
  <gallery-container-component
    :id="id"
    :loading="loading"
    :items="photos"
    :action-upload="uploadGalleryPhotos"
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
    }
  },

  computed: {
    ...mapState('hotspot', {
      photos: state => state.gallery,
    }),
  },

  methods: {
    ...mapActions('hotspot', {
      fetchGallery: 'fetchGallery',
      uploadGalleryPhotos: 'uploadGalleryPhotos',
      updateGalleryPhoto: 'updateGalleryPhoto',
      deleteGalleryPhoto: 'deleteGalleryPhoto',
    }),
  },
}
</script>

<style>

</style>
