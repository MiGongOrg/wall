<template>
  <div class="feature-barrage">
    <fs ref="fullscreenBarrage" @change="fullscreenChange" :background="fsbackground" class="full-screen">
      <div class="full-screen-content">
        <barrage
          :isShow="barrageIsShow"
          :barrageList="messages"
          :loop="barrage.loop"
        >
        </barrage>
        <feature-setting :parentId="parentId" :settingName="settingName" :isFullscreen="fullscreen" @toggleFullScreen="toggleFullScreen"></feature-setting>
      </div>
    </fs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Barrage from './Barrage'
import { FeatureSetting } from '@/components/Setting'

export default {

  name: 'FeatureBarrage',

  data () {
    return {
      settingName: 'SettingBarrage',
      fsbackground: '#fff',
      fullscreen: false,
      msg: 'Hello vue-baberrage',
      barrageIsShow: true,
      currentId : 0,
      barrageLoop: false
    }
  },
  components: {
    Barrage,
    FeatureSetting
  },
  props: ['parentId', 'index'],
  computed: {
    ...mapGetters(['barrage', 'socket']),
    barrage () {
      console.log(this.$store.state.barrage)
      return this.$store.state.barrage
    },
    messages () {
      console.log('messages=>>>', this.$store.state.socket.messages)
      return this.$store.state.socket.messages
    }
  },
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
  .feature-barrage {

  }
</style>