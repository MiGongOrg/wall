<template>
  <div class="custom-feature">
    <h2>{{$t('message.custom')}}</h2>
    <ul id="custom-feature">
      <li id="FeatureTitle">
        <div class="feature-button-container">
          <p class="icon-image feature-title-icon">
            <img src="./images/icon-feature-title.png">
          </p>
          <p>{{$t('message.text')}}</p>
        </div>
      </li>
      <li id="FeatureQrcode">
        <div class="feature-button-container">
          <p class="icon-image feature-qrcode-icon">
            <img src="./images/icon-feature-qrcode.png">
          </p>
          <p>{{$t('message.qrcode')}}</p>
        </div>
      </li>
      <li id="FeatureImage">
        <div class="feature-button-container">
          <p class="icon-image feature-image-icon">
            <img src="./images/icon-feature-image.png">
          </p>
          <p>{{$t('message.image')}}</p>
        </div>
      </li>
      <li id="FeatureClock">
        <div class="feature-button-container">
          <p class="icon-image feature-clock-icon">
            <img src="./images/icon-feature-clock.png">
          </p>
          <p>{{$t('message.clock')}}</p>
        </div>
      </li>
      <li id="FeatureBarrage">
        <div class="feature-button-container">
          <p class="icon-image feature-barrage-icon">
            <img src="./images/icon-feature-barrage.png">
          </p>
          <p>{{$t('message.bullet')}}</p>
        </div>
      </li>
      <li id="FeatureMessage">
        <div class="feature-button-container">
          <p class="icon-image feature-message-icon">
            <img src="./images/icon-feature-message.png">
          </p>
          <p>{{$t('message.rolling')}}</p>
        </div>
      </li>
      <li id="FeatureVideo">
        <div class="feature-button-container">
          <p class="icon-image feature-video-icon">
            <img src="./images/icon-feature-video.png">
          </p>
          <p>{{$t('message.video')}}</p>
        </div>
      </li>
      <li id="FeatureIframe">
        <div class="feature-button-container">
          <p class="icon-image feature-iframe-icon">
            <img src="./images/icon-feature-iframe.png">
          </p>
          <p>{{$t('message.iframe')}}</p>
        </div>
      </li>
    </ul>
    <p class="prompt">拖拽功能图标到左侧容器内</p>
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

        _this.$store.dispatch('SettingAppDragId', el.id)

        // _this.drag = el.id
        console.log(`被拖拽的模块ID:${el.id}`)
        // el.classList.add('is-moving')
        // 给当前拖拽的元素添加一个 class
        console.log('开始拖拽，添加 is-moving class')
      })

      // 将一个元素移动端另一个容器中触发
      .on('drop', function(el, target, source, sibling) {
        // el.classList.add('is-inner')
        console.log(`移入目标容器ID:${target.id}`)
        _this.$store.dispatch('SettingAppTargetId', target.id)

      })

      // 拖拽元素，但未成功移动到其它容器中，触发
      .on('cancel', function(el) {
        console.log('拖拽元素，但未成功移动到其它容器中')
      })

      // 拖拽结束
      .on('dragend', function(el) {

        console.log('拖拽结束')
        // el.classList.remove('is-moving')
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
    ul {
      display: flex;
      flex-wrap: wrap;
    }
    li {
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      width: 33.33%;
      padding: 0 3px;
      font-size: 12px;
      margin-bottom: 5px;
      cursor: move;
      p {
        width: 100%;
        text-align: center;
      }
    }
    .prompt {
      font-size: 12px;
      color: #C9C9C9;
      width: 100%;
      text-align: center;
      margin-top: 10px;
    }
  }
  .is-moving {
    .feature-button-container {
      border-color: #00E7C1;
    }
  }
  .is-inner {
    .feature-button-container {
      border-color: #00E7C1;
    }
  }
  .is-down {
    .feature-button-container {
      border-color: #00E7C1;
    }
  }
  .gu-mirror {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 70px;
    height: 70px;
    padding: 0 3px;
    font-size: 12px;
    margin-bottom: 5px;
    cursor: move;
    p {
      width: 100%;
      text-align: center;
    }
  }
  .gu-transit {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .feature-button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 70px;
    height: 70px;
    background-color: #F9F9F9;
    border: 1px dashed #DDDDDD;
  }
</style>
