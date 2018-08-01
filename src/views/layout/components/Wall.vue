<template>
  <div class="wall" :style="{ overflow: global.overflow ? 'auto' : 'hidden' }">
    <fs ref="fullscreenWall" @change="fullscreenChange" :background="fsbackground" class="full-screen">
      <grid-layout
        :layout="layout.init"
        :col-num="layout.colNum"
        :row-height="layout.rowHeight"
        :is-draggable="global.draggable"
        :is-resizable="global.resizable"
        :is-mirrored="false"
        :autoSize="true"
        :vertical-compact="true"
        :margin="layout.margin"
        :use-css-transforms="true"
      >
        <grid-item v-for="item in layout.init" :key="item.id"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          :class="{editActive:item.editStart}"
          @resize="resizeEvent"
        >
          <feature-module :brick="item" :index="item.i"></feature-module>
        </grid-item>
      </grid-layout>
    </fs>
  </div>
</template>

<script>
import { array } from 'lodash'
import EventBus from '@/assets/EventBus.js'
import { GridLayout, GridItem } from 'vue-grid-layout'
import { FeatureModule } from '@/components/Feature'

export default {

  data () {
    return {
      fsbackground: '#fff',
      editActive: true
    }
  },
  name: 'Wall',
  components: {
    GridLayout,
    GridItem,
    FeatureModule,
  },
  methods: {
    resizeEvent (i, newH, newW, newHPx, newWPx) {
      console.log("RESIZE i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);
    },
    toggleFullScreen () {
      this.$refs['fullscreenWall'].toggle()
    },
    fullscreenChange (fullscreen) {
      this.fullscreen = fullscreen
    }
  },
  computed: {
    layout () {
      return this.$store.state.app.layout
    },
    global () {
      return this.$store.state.global
    }
  },
  created () {
    const that = this
    // 可视窗口高度
    let wh = window.innerHeight
    // 初始化容器高度
    this.layout.init[0].h = Math.floor(wh / (this.layout.rowHeight + this.layout.margin[0]))

    // 全屏 Wall
    EventBus.$on('toggleFullScreen', (payLoad) => {
      that.toggleFullScreen()
    })
  },
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .wall {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }
  .editActive {
    z-index: 1;
  }
</style>