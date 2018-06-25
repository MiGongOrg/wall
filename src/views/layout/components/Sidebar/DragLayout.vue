<template>
  <div class="drag-layout">
    <ul>
      <li @click="one">
        <font-awesome-icon :icon="['fas','dice-one']"/>
      </li>
      <li @click="two">
        <font-awesome-icon :icon="['fas','dice-two']"/>
      </li>
      <li @click="three">
        <font-awesome-icon :icon="['fas','dice-three']"/>
      </li>
      <li @click="four">
        <font-awesome-icon :icon="['fas','dice-four']"/>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {

  name: 'DragLayout',

  data () {
    return {

    }
  },
  computed: {
    ...mapGetters(['layout']),
    layout () {
      return this.$store.state.app.layout
    }
  },
  methods: {
    // 重新计算尺寸
    resize (topHeight) {
      let rowHeight = this.layout.rowHeight
        , margin = this.layout.margin[0]
        , wh = window.innerHeight
        , th = topHeight ? (rowHeight + margin) * topHeight : 0
        , h = wh - th

      return Math.floor(h / (rowHeight + margin))
    },
    one () {
      let val = [
        {
          "x": 0,
          "y": 0,
          "w": 100,
          "h": 0,
          "i": "0",
          "editStart": true,
          "feature": [{
            "component": 'FeatureDefault',
            "id": "a"
          }],
          "setting": [{}],
        }
      ]

      // 初始化高度
      val[0].h = this.resize()

      this.$store.dispatch('LayoutInit', val)
    },
    two () {
      let val = [
        {
          "x": 0,
          "y": 0,
          "w": 50,
          "h": 0,
          "i": "0",
          "editStart": true,
          "feature": [{
            "component": 'FeatureDefault',
            "id": "a"
          }],
          "setting": [{}],
        },
        {
          "x": 50,
          "y": 0,
          "w": 50,
          "h": 0,
          "i": "1",
          "editStart": true,
          "feature": [{
            "component": 'FeatureDefault',
            "id": "b"
          }],
          "setting": [{}],
        }
      ]

      let h = this.resize()
      // 初始化高度
      val[0].h = h
      val[1].h = h

      this.$store.dispatch('LayoutInit', val)
    },
    three () {
      let topHeight = 4

      let val = [
        {
          "x": 0,
          "y": 0,
          "w": 100,
          "h": topHeight,
          "i": "0",
          "editStart": true,
          "feature": [{
            "component": 'FeatureDefault',
            "id": "a"
          }],
          "setting": [{}],
        },
        {
          "x": 0,
          "y": 0,
          "w": 50,
          "h": 0,
          "i": "1",
          "editStart": true,
          "feature": [{
            "component": 'FeatureDefault',
            "id": "b"
          }],
          "setting": [{}],
        },
        {
          "x": 50,
          "y": 0,
          "w": 50,
          "h": 0,
          "i": "2",
          "editStart": true,
          "feature": [{
            "component": 'FeatureDefault',
            "id": "c"
          }],
          "setting": [{}],
        }
      ]

      let h = this.resize(topHeight)

      // 初始化高度
      val[1].h = h
      val[2].h = h

      this.$store.dispatch('LayoutInit', val)
    },
    four () {
      let topHeight = 4

      let val = [
        {
          "x": 0,
          "y": 0,
          "w": 100,
          "h": topHeight,
          "i": "0",
          "editStart": true,
          "feature": [{
            "component": 'FeatureDefault',
            "id": "a"
          }],
          "setting": [{}],
        },
        {
          "x": 0,
          "y": 0,
          "w": 80,
          "h": 0,
          "i": "1",
          "editStart": true,
          "feature": [{
            "component": 'FeatureDefault',
            "id": "b"
          }],
          "setting": [{}],
        },
        {
          "x": 80,
          "y": 0,
          "w": 20,
          "h": 0,
          "i": "2",
          "editStart": true,
          "feature": [{
            "component": 'FeatureDefault',
            "id": "c"
          }],
          "setting": [{}],
        },
        {
          "x": 80,
          "y": 0,
          "w": 20,
          "h": 0,
          "i": "3",
          "editStart": true,
          "feature": [{
            "component": 'FeatureDefault',
            "id": "d"
          }],
          "setting": [{}],
        }
      ]

      let h = this.resize(topHeight)

      // 初始化高度
      val[1].h = h
      val[2].h = h / 2
      val[3].h = h / 2

      this.$store.dispatch('LayoutInit', val)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .drag-layout {
    li {
      width: .52083333rem; /* 100px */
      height: .52083333rem; /* 100px */
      line-height: .52083333rem; /* 100px */
      text-align: center;
      color: #fff;
      font-size: .10416667rem; /* 20px */
      cursor: pointer;
      background-color: tomato;
    }
  }
</style>