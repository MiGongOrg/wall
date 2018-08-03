<template>
  <div class="feature-rolling">
    <fs ref="fullscreenBarrage" @change="fullscreenChange" :background="fsbackground" class="full-screen">
      <div class="full-screen-content">
        <h1>功能开发中。。。</h1>
        <feature-setting :parentId="parentId" :settingName="settingName" @toggleFullScreen="toggleFullScreen"></feature-setting>
      </div>
    </fs>
  </div>
</template>

<script>
import { FeatureSetting } from '@/components/Setting'
export default {

  name: 'FeatureRolling',

  data () {
    return {
      settingName: 'SettingRolling',
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
      this.$refs['fullscreenBarrage'].toggle()
    },
    fullscreenChange (fullscreen) {
      this.fullscreen = fullscreen
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .feature-rolling {

  }
</style>