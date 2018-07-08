<template>
  <div class="drag-layout">
    <h2>选择布局</h2>
    <ul>
      <li @click="one" :class="{active:active_el == 1}">
        <p>
          <font-awesome-icon :icon="['fas','dice-one']"/>
        </p>
      </li>
      <li @click="two" :class="{active:active_el == 2}">
        <p>
          <font-awesome-icon :icon="['fas','dice-two']"/>
        </p>
      </li>
      <li @click="three" :class="{active:active_el == 3}">
        <p>
          <font-awesome-icon :icon="['fas','dice-three']"/>
        </p>
      </li>
      <li @click="four" :class="{active:active_el == 4}">
        <p>
          <font-awesome-icon :icon="['fas','dice-four']"/>
        </p>
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
      active_el: 1
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
    emptyContainer () {
      let eventList = document.querySelectorAll('.feature-drag-item')
      eventList.forEach((item, index) => {
        item.innerHTML = ''
      })
    },
    one () {
      this.active_el = 1
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

      this.emptyContainer()

      // 初始化高度
      val[0].h = this.resize()

      this.$store.dispatch('LayoutInit', val)
    },
    two () {
      this.active_el = 2
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

      this.emptyContainer()

      let h = this.resize()
      // 初始化高度
      val[0].h = h
      val[1].h = h

      this.$store.dispatch('LayoutInit', val)
    },
    three () {
      this.active_el = 3
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

      this.emptyContainer()

      let h = this.resize(topHeight)

      // 初始化高度
      val[1].h = h
      val[2].h = h

      this.$store.dispatch('LayoutInit', val)
    },
    four () {
      this.active_el = 4
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

      this.emptyContainer()

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
    ul {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
    }
    li {
      display: flex;
      justify-content: center;
      width: 50%;
      text-align: center;
      color: #fff;
      cursor: pointer;
      p {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 102px;
        height: 102px;
        color: #00E7C1;
        margin: 10px 0;
        border: 1px solid #fff;
      }
    }
    .active {
      p {
        background-color: #F9F9F9;
        border: 1px solid #00E7C1;
      }
    }
  }
</style>