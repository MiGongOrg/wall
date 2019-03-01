<template>
  <div class="feature-text">
    <fs ref="fullscreenText" @change="fullscreenChange" :background="fsbackground" class="full-screen">
      <div class="full-screen-content" :style="{ backgroundColor: `rgba(${text.bgColor.rgbaStr})`}">
        <span class="text" :style="{ fontSize: `${text.fontSize}px`, color: `rgba(${text.color.rgbaStr})` }">{{text.content}}</span>
        <feature-setting :parentId="parentId" :settingName="settingName" :isFullscreen="fullscreen" @toggleFullScreen="toggleFullScreen"></feature-setting>
      </div>
    </fs>
  </div>    
</template>

<script>
import { mapGetters } from 'vuex'
import { FeatureSetting } from '@/components/Setting'

export default {

  name: 'FeatureText',

  data () {
    return {
      settingName: 'SettingText',
      fsbackground: '#fff',
      fullscreen: false,
    }
  },
  components: {
    FeatureSetting
  },
  props: ['parentId', 'index'],
  methods: {
    // 全屏
    toggleFullScreen () {
      this.$refs['fullscreenText'].toggle()
    },
    fullscreenChange (fullscreen) {
      this.fullscreen = fullscreen
    },
  },
  computed: {
    ...mapGetters(['text']),
    text () {
      return this.$store.state.text
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .feature-text {
    .text {
      width: 100%;
      text-align: center;
    }
  }
</style>