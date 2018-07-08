<template>
  <div class="feature-title">
    <fs ref="fullscreenTitle" @change="fullscreenChange" :background="fsbackground" class="full-screen">
      <div class="full-screen-content" :style="{ backgroundColor: `rgba(${title.rgbaStr})`}">
        <span class="title" :style="{ fontSize: `${title.fontSize}px` }">{{title.text}}</span>
        <feature-setting :parentId="parentId" :settingName="settingName" @toggleFullScreen="toggleFullScreen"></feature-setting>
      </div>
    </fs>
  </div>    
</template>

<script>
import { mapGetters } from 'vuex'
import { FeatureSetting } from '@/components/Setting'

export default {

  name: 'FeatureTitle',

  data () {
    return {
      settingName: 'SettingTitle',
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
      this.$refs['fullscreenTitle'].toggle()
    },
    fullscreenChange (fullscreen) {
      this.fullscreen = fullscreen
    },
  },
  computed: {
    ...mapGetters(['title']),
    title () {
      return this.$store.state.title
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .feature-title {
    .title {
      width: 100%;
      text-align: center;
    }
  }
</style>