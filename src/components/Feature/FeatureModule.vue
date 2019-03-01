<template>
  <div class="feature-module">
    <div class="feature-module-item"
      v-for="item in brick.feature"
      :is="item.component"
      :parentId="item.id"
      :index="index"
    >
    </div>
    <ul class="feature-drag-item" :id="brick.feature[0].id" v-show="brick.feature[0].component === 'FeatureDefault' " :style="{ backgroundColor: `rgba(${global.bgColor.rgbaStr})`}"></ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { FeatureDefault } from '@/components/Default'
import { FeatureText } from '@/components/Text'
import { FeatureQrcode } from '@/components/Qrcode'
import { FeatureImage } from '@/components/Image'
import { FeatureClock } from '@/components/Clock'
import { FeatureBarrage } from '@/components/Barrage'
import { FeatureVideo } from '@/components/Video'
import { FeatureIframe } from '@/components/Iframe'
import { FeatureRolling } from '@/components/Rolling'
import { FeatureInteractive } from '@/components/Interactive'


export default {
  data () {
    return {

    }
  },
  name: 'FeatureModule',
  props: ['brick', 'index'],
  components: {
    FeatureDefault,
    FeatureText,
    FeatureQrcode,
    FeatureClock,
    FeatureBarrage,
    FeatureImage,
    FeatureVideo,
    FeatureIframe,
    FeatureRolling,
    FeatureInteractive
  },
  computed: {
    global () {
      return this.$store.state.global
    }
  },
  methods: {
    
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .feature-module {
    width: 100%;
    height: 100%;
    .feature-drag-item {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      border: 1px dashed #ddd;
    }
  }
  .feature-module-item {
    box-sizing: border-box;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 100%;
    height: 100%;
    border-style: dashed;
    border-color: transparent;
    border-width: 1px;
    &:hover {
      border-color: #ddd;
      .feature-setting {
        top: 0;
      }
    }
  }
  .full-screen {
    width: 100%;
    height: 100%;
  }
  .full-screen-content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    text-align: center;
  }
</style>