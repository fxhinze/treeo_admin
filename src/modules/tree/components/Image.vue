<template>
  <v-responsive :aspect-ratio="16/9">
    <image-source-component :image="image" size="large" v-if="image">
      <v-img slot-scope="{ src }" :src="src" :aspect-ratio="16/9" contain>
        <v-layout column class="media">
          <v-flex align-self-end>
            <v-layout column pa-3>
              <v-dialog max-width="448px">
                <v-btn slot="activator" class="ma-2" light icon fab small color="white">
                  <v-icon>fullscreen</v-icon>
                </v-btn>
                <v-img :src="src" :aspect-ratio="1" max-width="448px" max-height="448px" class="grey lighten-2" contain />
              </v-dialog>

              <image-source-component :image="image" size="download">
                <v-btn slot-scope="{ src }" :href="src" class="ma-2" light icon fab small color="white">
                  <v-icon>save_alt</v-icon>
                </v-btn>
              </image-source-component>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-img>
    </image-source-component>
    <template v-else>
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; height: 100%;">
        <div style="color: #fff;" class="headline mb-3">No image found</div>
      </div>
    </template>
  </v-responsive>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import ImageSourceComponent from '@/components/ImageSource'

export default {
  components: {
    ImageSourceComponent,
  },

  props: {
    id: {
      type: String,
      default: null
    },
  },

  computed: {
    ...mapState('tree', {
      item: state => state.item
    }),

    image () {
      return this.item && this.item.image ? this.item.image : null
    },
  },
}
</script>

<style>

</style>
