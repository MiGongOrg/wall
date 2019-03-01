<template>
  <div class="feature-interactive">
    <fs ref="fullscreenBarrage" @change="fullscreenChange" :background="fsbackground" class="full-screen">
      <div class="full-screen-content">
        <interactive></interactive>
        <feature-setting :parentId="parentId" :settingName="settingName" :isFullscreen="fullscreen" @toggleFullScreen="toggleFullScreen"></feature-setting>
      </div>
    </fs>
  </div>
</template>

<script>
import { FeatureSetting } from '@/components/Setting'
import Interactive from './Interactive'

export default {

  name: 'FeatureStick',

  data () {
    return {
      settingName: 'SettingInteractive',
      fsbackground: '#fff',
      fullscreen: false
    }
  },
  components: {
    Interactive,
    FeatureSetting
  },
  props: ['parentId', 'index'],
  methods: {
    // 全屏
    toggleFullScreen () {
      this.$refs['fullscreenBarrage'].toggle()
    },
    fullscreenChange (fullscreen) {
      this.fullscreen = fullscreen
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .feature-interactive {

  }
</style>