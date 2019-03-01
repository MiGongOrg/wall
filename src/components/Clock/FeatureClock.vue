<template>
  <div class="feature-clock">
    <fs ref="fullscreenClock" @change="fullscreenChange" :background="fsbackground" class="full-screen">
      <div class="full-screen-content">
        <flip-clock
          ref="flipclock"
          :options="clock.options"
        ></flip-clock>

        <feature-setting :parentId="parentId" :settingName="settingName" :isFullscreen="fullscreen" @toggleFullScreen="toggleFullScreen"></feature-setting>
      </div>
    </fs>
  </div>
</template>

<script>
import { FlipClock } from '@mvpleung/flipclock'
import { FeatureSetting } from '@/components/Setting'
import { mapGetters } from 'vuex'

export default {

  name: 'FeatureClock',

  data () {
    return {
      settingName: 'SettingClock',
      fsbackground: '#fff',
      fullscreen: false,
    }
  },

  components: {
    FlipClock,
    FeatureSetting
  },
  props: ['parentId', 'index'],
  computed: {
    ...mapGetters(['clock']),
    clock () {
      return this.$store.state.clock
    }
  },
  methods: {
    // 全屏
    toggleFullScreen () {
      this.$refs['fullscreenClock'].toggle()
    },
    fullscreenChange (fullscreen) {
      this.fullscreen = fullscreen
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .feature-clock {
    .flip-clock-wrapper {
      div.inn {
        color: #ccc;
        background-color: #333;
      }
    } 
  }
</style>