<template>
  <div class="feature-qrcode">
    <fs ref="fullscreenQrcode" @change="fullscreenChange" :background="fsbackground" class="full-screen">
      <div class="full-screen-content">
        <div class="qrcode-container">
          <img :src="qrcode.url" class="qrcode">
        </div>
        <feature-setting :parentId="parentId" :settingName="settingName" :isFullscreen="fullscreen" @toggleFullScreen="toggleFullScreen"></feature-setting>
      </div>
    </fs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { FeatureSetting } from '@/components/Setting'

export default {

  name: 'FeatureQrcode',

  data () {
    return {
      fullscreen: false,
      fsbackground: '#fff',
      settingName: 'SettingQrcode',
    }
  },
  components: {
    FeatureSetting
  },
  props: ['parentId', 'index'],
  computed: {
    ...mapGetters(['qrcode']),
    qrcode () {
      return this.$store.state.qrcode
    }
  },
  methods: {
    toggleFullScreen () {
      this.$refs['fullscreenQrcode'].toggle()
    },
    fullscreenChange (fullscreen) {
      this.fullscreen = fullscreen
    }
  },
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .feature-qrcode {
    .qrcode-container {
      display: flex;
      width: 100%;
      height: 100%;
    }
    .qrcode {
      display: block;
      width: 100%;
      object-fit: contain;
    }
  }
</style>