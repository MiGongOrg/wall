<template>
  <div class="wall">
    <grid-layout
      :layout="layout.init"
      :col-num="colNum"
      :row-height="rowHeight"
      :is-draggable="global.draggable"
      :is-resizable="global.resizable"
      :is-mirrored="false"
      :autoSize="true"
      :vertical-compact="true"
      :margin="margin"
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
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { array } from 'lodash'
import { GridLayout, GridItem } from 'vue-grid-layout'
import FeatureModule from './FeatureModule'

export default {

  data () {
    return {
      editActive: true,
      margin: [10, 10],
      rowHeight: 20,
      colNum: 100,
      topHeight: 4,
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
    // 获取布局 ID 公用函数
    getLayoutId (id) {
      console.log('getLayoutId', id)
      let index = _.findIndex(this.layout, function(index) { 
        console.log(index)
        return index.feature[0].id === id
      })
      return index
    }
  },
  computed: {
    layout () {
      return this.$store.state.app.layout
    },
    global () {
      return this.$store.state.app.setting.global
    }
  },
  created () {
    // newH = Math.ceil((clientHeight + marginY) / (rowHeight + marginY))
    var layoutLeft = this.layout.init[1]
        // 可视窗口高度
      , wh = window.innerHeight
        // 顶部初始模块已占用高度
      , th = (this.rowHeight + this.margin[0]) * this.topHeight
        // 可视化窗口剩余高度
      , h = wh - th
        // 初始化模块高度
      , leftHeight = Math.floor(h / (this.rowHeight + this.margin[0]))

    this.layout.init[0].h = this.topHeight
    this.layout.init[1].h = leftHeight
    this.layout.init[2].h = leftHeight / 2
    this.layout.init[3].h = leftHeight / 2

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