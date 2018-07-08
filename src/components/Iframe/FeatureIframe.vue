<template>
  <div class="feature-iframe">
    <fs ref="fullscreenIframe" @change="fullscreenChange" :background="fsbackground" class="full-screen">
      <div class="full-screen-content">
        <iframe :src="iframe.url" frameborder="0"></iframe>
        <feature-setting :parentId="parentId" :settingName="settingName" @toggleFullScreen="toggleFullScreen"></feature-setting>
      </div>
    </fs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { FeatureSetting } from '@/components/Setting'
export default {

  name: 'FeatureIframe',

  data () {
    return {
      settingName: 'SettingIframe',
      fsbackground: '#fff',
      fullscreen: false,
    }
  },
  components: {
    FeatureSetting
  },
  props: ['parentId', 'index'],
  computed: {
    ...mapGetters(['iframe']),
    iframe () {
      return this.$store.state.iframe
    }
  },
  methods: {
    // 全屏
    toggleFullScreen () {
      this.$refs['fullscreenIframe'].toggle()
    },
    fullscreenChange (fullscreen) {
      this.fullscreen = fullscreen
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .feature-iframe {
    iframe {
      height: 100%;
      width: 100%;
    }
  }
</style>