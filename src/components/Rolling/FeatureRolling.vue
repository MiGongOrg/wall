<template>
  <div class="feature-rolling">
    <fs ref="fullscreenBarrage" @change="fullscreenChange" :background="fsbackground" class="full-screen">
      <div class="full-screen-content">
        <div class="scrollbox" ref="scrollbox">
          <div class="scrollcontent" ref="scrollcontent">
            <rolling
              :rollingList="socket.messages"
              @scrollToTop="scrollToTop"
            ></rolling>
          </div>
        </div>
        <feature-setting :parentId="parentId" :settingName="settingName" @toggleFullScreen="toggleFullScreen"></feature-setting>
      </div>
    </fs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Rolling from './Rolling'
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
    Rolling,
    FeatureSetting
  },
  props: ['parentId', 'index'],
  computed: {
    ...mapGetters(['socket']),
    socket () {
      return this.$store.state.socket
    }
  },
  methods: {
    // 全屏
    toggleFullScreen () {
      this.$refs['fullscreenBarrage'].toggle()
    },
    fullscreenChange (fullscreen) {
      this.fullscreen = fullscreen
    },
    scrollToTop () {
      let top = 0
      let scrollbox = this.$refs.scrollbox
      let scrollcontent = this.$refs.scrollcontent
      let boxH = this.$refs.scrollbox.offsetHeight
      let contentH = this.$refs.scrollcontent.offsetHeight
      
      if (contentH > boxH) {
        top = (contentH - boxH) * -1
      } else {
        top = 0
      }
      scrollcontent.style.transform = `translate3d(0px, ${top}px, 0)`
    }
  },
  mounted () {
    setTimeout(() => {
      this.scrollToTop()
    }, 500)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .feature-rolling {
    position: relative;
    width: 100%;
    height: 100%;
    .scrollbox {
      position: relative;
      height: 100%;
      width: 100%;
      overflow: hidden;
    }
    .scrollcontent {
      position: absolute;
      width: 100%;
      overflow: auto;
      transition: transform 1s;
    }
  }
</style>