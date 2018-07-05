<template>
  <div class="feature-module">
    <div class="feature-module-item"
      v-for="item in brick.feature"
      :is="item.component"
      :parentId="item.id"
      :index="index"
    >
    </div>
    <ul class="feature-drag-item" :id="brick.feature[0].id" v-if="brick.feature[0].component === 'FeatureDefault' " :style="{ backgroundColor: `rgba(${global.backgroundColor.rgbaStr})`}"></ul>
  </div>
</template>

<script>
import { FeatureTitle } from '@/components/Title'
import { FeatureQrcode } from '@/components/Qrcode'
import { FeatureImage } from '@/components/Image'
import { FeatureClock } from '@/components/Clock'
import { FeatureBarrage } from '@/components/Barrage'
import { FeatureDefault } from '@/components/Default'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {

    }
  },
  name: 'FeatureModule',
  props: ['brick', 'index'],
  components: {
    FeatureTitle,
    FeatureDefault,
    FeatureQrcode,
    FeatureClock,
    FeatureBarrage,
    FeatureImage
  },
  computed: {
    global () {
      return this.$store.state.app.setting.global
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
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 100%;
    height: 100%;
    &:hover {
      .feature-setting {
        top: 0;
      }
    }
  }
  .feature-edit {
    position: absolute;
    top: 0;
    right: 0;
    color: #333;
    z-index: 1;
    font-size: .125rem; /* 24px */
    padding: 0 .02604167rem; /* 5px */
    ol {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    li {
      cursor: pointer;
      padding: .05208333rem /* 10px */
    }
  }
</style>