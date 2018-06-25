<template>
  <div class="background-image">
    <swiper :options="swiperOption" ref="backgroundImage">
      <swiper-slide v-for="item in backgroundImage.urls" :key="item.name" :data-swiper-autoplay="backgroundImage.delay">
        <img :src="item.url" :name="item.name">
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'


export default {
  name: 'BackgroundImage',

  data () {
    return {
      swiperSlides: [],
      swiperOption: {
        effect: 'fade',
        autoplay: false,
        autoHeight: true
      }
    }
  },

  components: {
    swiper,
    swiperSlide
  },
  computed: {
    ...mapGetters(['setting']),
    backgroundImage () {
      return this.setting.global.backgroundImage
    },
    swiper () {
      return this.$refs.backgroundImage.swiper
    }
  },
  watch: {
    'backgroundImage.autoplay': {
      handler: function (val) {
        this.swiperOption.autoplay = val
        if (val) {
          this.swiper.autoplay.start()
        } else {
          this.swiper.autoplay.stop()
        }
      },
      deep: true
    },
    'backgroundImage.urls': {
      handler: function (val) {
        const that = this
        // 延迟更新
        setTimeout(function () {
          that.swiper.update()
        }, 100);
      },
      deep: true
    },
    'backgroundImage.index': {
      handler: function (index) {
        console.log('index:', index)
        // 切换到指定背景图片
        this.swiper.slideTo(index)
      },
      deep: true
    }
  },
  mounted () {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .background-image {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
</style>
