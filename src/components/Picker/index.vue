<template>
  <div class="picker">
    <div class="color-picker" :style="{ backgroundColor: `rgba(${color.rgbaStr})` }" @click="showToggle"></div>
      <chrome-picker :value="color.rgba" @input="updateColor" v-if="isShow"></chrome-picker>
  </div>
</template>

<script>
import { Chrome } from 'vue-color'

export default {

  name: 'Picker',

  data () {
    return {
      isShow: false,
    }
  },
  props: {
    color: {
      type: Object,
      propsync: true
    }
  },
  components: {
    ChromePicker: Chrome
  },
  methods: {
    showToggle () {
      this.isShow = !this.isShow
    },
    /* 更新颜色 */
    updateColor (value) {

      let rgbaObj = value.rgba
        , rgbaArr = Object.keys(rgbaObj).map(function(k){return rgbaObj[k]})

      this.color.rgba = rgbaObj
      this.color.rgbaStr = rgbaArr.toString()

    }
  },
  created () {
    console.log('Init Color Picker')
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .picker {
    position: relative;
    .color-picker {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      cursor: pointer;
    }
    // 修改选取颜色插件样式
    .vc-chrome {
      position: absolute;
      left: -195px;
      bottom: -250px;
      z-index: 99999;
      .vc-chrome-saturation-wrap {
        z-index: 1;
      }
      &:after {
        content: '';
        position: absolute;
        right: 10px;
        top: -5px;
        transform: translateX(-50%) rotate(45deg);
        width: 10px;
        height: 10px;
        background-color: #fff;
        box-shadow: 0 0 2px rgba(0, 0, 0, .3);
      }
    }
  }
</style>