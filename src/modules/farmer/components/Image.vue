<template>
  <v-responsive :aspect-ratio="16/9">
    <image-source-component :image="image" size="large" v-if="image">
      <v-img slot-scope="{ src }" :src="src" :aspect-ratio="16/9" contain>
        <v-layout column class="media">
          <v-flex align-self-end pa-3>
            <upload-image-component
              :url="src"
              :payload="{ farmer_id: id }"
              :action-upload="uploadPhoto"
              :action-delete="deletePhoto"
              image-field="photo"
              title="UPLOAD IMAGE"
              image-contain
            />
          </v-flex>
        </v-layout>
      </v-img>
    </image-source-component>
    <template v-else>
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; height: 100%;">
        <div style="color: #fff;" class="headline mb-3">No image found</div>
        <div>
          <upload-image-component
            :payload="{ farmer_id: id }"
            :action-upload="uploadPhoto"
            :action-delete="deletePhoto"
            image-field="photo"
            title="UPLOAD IMAGE"
            image-contain
          >
            <v-btn color="success">Upload</v-btn>
          </upload-image-component>
        </div>
      </div>
    </template>
  </v-responsive>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import ImageSourceComponent from '@/components/ImageSource'
import UploadImageComponent from '@/components/UploadImage'

export default {
  components: {
    ImageSourceComponent,
    UploadImageComponent,
  },

  props: {
    id: {
      type: String,
      default: null
    },
  },

  computed: {
    ...mapState('farmer', {
      item: state => state.item
    }),

    image () {
      return this.item && this.item.photo ? this.item.photo : null
    },
  },

  methods: {
    ...mapActions('farmer', {
      uploadPhoto: 'uploadPhoto',
      deletePhoto: 'deletePhoto',
    }),
  },
}
</script>

<style>

</style>
