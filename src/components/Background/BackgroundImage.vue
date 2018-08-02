<template>
  <div class="background-image">
    <swiper :options="swiperOption" ref="backgroundImage">
      <swiper-slide v-for="item in bgImage.files" :key="item.name" :data-swiper-autoplay="bgImage.delay">
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
    ...mapGetters(['global']),
    bgImage () {
      return this.$store.state.global.bgImage
    },
    swiper () {
      return this.$refs.backgroundImage.swiper
    }
  },
  watch: {
    'bgImage.autoplay': {
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
    'bgImage.files': {
      handler: function (val) {
        const that = this
        // 延迟更新
        setTimeout(function () {
          that.swiper.update()
        }, 100);
      },
      deep: true
    },
    'bgImage.index': {
      handler: function (index) {
        // 切换到指定背景图片
        this.swiper.slideTo(index)
      },
      deep: true
    }
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
