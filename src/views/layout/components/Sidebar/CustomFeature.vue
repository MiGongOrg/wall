<template>
  <div class="custom-feature">
    <ul id="custom-feature">
      <li id="FeatureTitle">
        <font-awesome-icon :icon="['fas','font']"/>
      </li>
      <li id="FeatureQrcode">
        <font-awesome-icon :icon="['fas','qrcode']"/>
      </li>
      <li id="FeatureImage">
        <font-awesome-icon :icon="['fas','image']"/>
      </li>
      <li id="FeatureClock">
        <font-awesome-icon :icon="['fas','clock']"/>
      </li>
      <li id="FeatureBarrage">
        <font-awesome-icon :icon="['fas','list']"/>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { array } from 'lodash'
import 'dragula/dist/dragula.min.css'
import dragula from 'dragula'

export default {
  name: 'CustomFeature',

  data () {
    return {
      drag: null,
      target: null,
      moduleContainer: ['custom-feature']
    }
  },

  components: {},
  // 在 DOM 加载后马上执
  computed: {
    ...mapGetters(['layout']),
    occupied () {
      return this.$store.state.app.occupied
    }
  },
  methods: {
    /* 初始化可拖拽容器 */
    dragulaInit () {
      const _this = this
      dragula([
        document.getElementById('custom-feature'),
        document.getElementById('a'),
        document.getElementById('b'),
        document.getElementById('c'),
        document.getElementById('d')
      ], {
        copy: function (el, source) {
          return source === document.getElementById('custom-feature')
        },
        accepts: function (el, target) {
          // 禁止向同一个容器中添加多个功能模块（这一步的判断和Vuex 更新数据是多余的）
          let isThere = _.every(_this.occupied, function(item) {
            return target !== document.getElementById(item)
          })
          return isThere
        },
        // 当一个元素被放到一个容器上时，它将被放置在鼠标释放点附近。
        direction: 'vertical',
        copy: true,
        copySortSource: false,
        revertOnSpill: true
      })

      // 开始拖拽
      .on('drag', function(el, source) {

        _this.$store.dispatch('DragId', el.id)

        // _this.drag = el.id
        console.log(`被拖拽的模块ID:${el.id}`)
        // 给当前拖拽的元素添加一个 class
        // el.classList.add('is-moving');
        // console.log('开始拖拽，添加 is-moving class')
      })

      // 将一个元素移动端另一个容器中触发
      .on('drop', function(el, target, source, sibling) {

        console.log(`移入目标容器ID:${target.id}`)
        _this.$store.dispatch('TargetId', target.id)

        // 更新已使用容器，已存在，将不会再允许添加模块
        // _this.$store.dispatch('Occupied', target.id)

      })

      // 拖拽元素，但未成功移动到其它容器中，触发
      .on('cancel', function() {
        console.log('拖拽元素，但未成功移动到其它容器中')
      })

      // 拖拽结束
      .on('dragend', function(el) {

        console.log('拖拽结束')
        // el.classList.remove('is-moving');
      })

      .on('remove', function(el) {
        console.log('remove')
      })
    }
  },
  mounted () {
    // 初始化拖拽
    this.dragulaInit()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .custom-feature {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
    li {
      width: .52083333rem; /* 100px */
      height: .52083333rem; /* 100px */
      line-height: .52083333rem; /* 100px */
      text-align: center;
      color: #fff;
      font-size: .10416667rem; /* 20px */
      cursor: move;
      background-color: tomato;
    }
  }
</style>
