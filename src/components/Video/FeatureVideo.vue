<template>
  <div class="feature-video">
    <fs ref="fullscreenVideo" @change="fullscreenChange" :background="fsbackground" class="full-screen">
      <div class="full-screen-content">
        <video :src="video[video.activeName].url" :controls="video[video.activeName].controls" :autoplay="video[video.activeName].autoplay" :loop="video[video.activeName].loop"></video>
        <feature-setting :parentId="parentId" :settingName="settingName" :isFullscreen="fullscreen" @toggleFullScreen="toggleFullScreen"></feature-setting>
      </div>
    </fs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { FeatureSetting } from '@/components/Setting'

export default {

  name: 'FeatureVideo',

  data() {
    return {
      settingName: 'SettingVideo',
      fsbackground: '#fff',
      fullscreen: false,
    }
  },
  components: {
    FeatureSetting
  },
  props: ['parentId', 'index'],
  computed: {
    ...mapGetters(['video']),
    video () {
      return this.$store.state.video
    }
  },
  methods: {
    // 全屏
    toggleFullScreen () {
      this.$refs['fullscreenVideo'].toggle()
    },
    fullscreenChange (fullscreen) {
      this.fullscreen = fullscreen
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .feature-video {
    video {
      width: 100%;
    }
  }
</style>
