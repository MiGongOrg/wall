<template>
  <div class="feature-image">
    <fs ref="fullscreenImage" @change="fullscreenChange" :background="fsbackground" class="full-screen">
      <div class="full-screen-content">
        <swiper :options="swiperOption" ref="image" :class="{autoSize:image.resize}">
          <swiper-slide v-for="item in image.files" :key="item.name" :data-swiper-autoplay="image.delay">
            <img :src="item.url" :name="item.name">
          </swiper-slide>
        </swiper>
        <feature-setting :parentId="parentId" :settingName="settingName" :isFullscreen="fullscreen" @toggleFullScreen="toggleFullScreen"></feature-setting>
      </div>
    </fs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { FeatureSetting } from '@/components/Setting'

export default {

  name: 'FeatureImage',

  data () {
    return {
      settingName: 'SettingImage',
      fsbackground: '#fff',
      fullscreen: false,
      swiperOption: {
        autoplay: false,
        allowTouchMove: false,
        simulateTouch: false
      }
    }
  },
  components: {
    swiper,
    swiperSlide,
    FeatureSetting
  },
  props: ['parentId', 'index'],
  computed: {
    ...mapGetters(['image']),
    image () {
      return this.$store.state.image
    },
    swiper () {
      return this.$refs.image.swiper
    }
  },
  methods: {
    // 全屏
    toggleFullScreen () {
      this.$refs['fullscreenImage'].toggle()
    },
    fullscreenChange (fullscreen) {
      this.fullscreen = fullscreen
    },
    autoplayStatus (val) {
      let autoplay = this.swiperOption.autoplay = val ? val : this.image.autoplay
      if (autoplay) {
        this.swiper.autoplay.start()
      } else {
        this.swiper.autoplay.stop()
      }
    }
  },
  watch: {
    'image.autoplay': {
      handler: function (val) {
        this.autoplayStatus(val)
      },
      deep: true
    },
    'image.files': {
      handler: function (val) {
        const that = this
        // 先暂停在改变自动播放状态（解决图片新增或删除轮播状态同步问题）
        this.swiper.autoplay.stop()
        this.autoplayStatus()
        // 延迟更新
        setTimeout(function () {
          that.swiper.update()
        }, 100)
      },
      deep: true
    },
    'image.index': {
      handler: function (index) {
        // 切换到指定背景图片
        this.swiper.slideTo(index)
      },
      deep: true
    }
  },
  mounted () {
    this.autoplayStatus()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .feature-image {
    .autoSize {
      height: 100%;
    }
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      overflow: hidden;
    }
  }
</style>