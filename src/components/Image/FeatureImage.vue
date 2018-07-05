<template>
  <div class="feature-image">
    <swiper :options="swiperOption" ref="image" :class="{autoSize:image.size}">
      <swiper-slide v-for="item in image.urls" :key="item.name" :data-swiper-autoplay="image.delay">
        <img :src="item.url" :name="item.name">
      </swiper-slide>
    </swiper>
    <feature-setting :parentId="parentId" :settingName="settingName"></feature-setting>
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
    
  },
  watch: {
    'image.autoplay': {
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
    'image.urls': {
      handler: function (val) {
        const that = this
        // 延迟更新
        setTimeout(function () {
          that.swiper.update()
        }, 100);
      },
      deep: true
    },
    'image.index': {
      handler: function (index) {
        console.log('index:', index)
        // 切换到指定背景图片
        this.swiper.slideTo(index)
      },
      deep: true
    }
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