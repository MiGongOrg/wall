<template>
  <div class="background-video">
    <video loop autoplay :src="path"></video>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'BackgroundVideo',

  data () {
    return {
      
    }
  },

  computed: {
    ...mapGetters(['setting']),
    path () {
      return this.setting.global.backgroundVideo.url
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .background-video {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 2;
    video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
</style>
