<template>
  <div id="menu" ref="menu" :style="{left: `${left}px`, top: `${top}px`}">
    <div class="menuBtn">
      <ul class="box" :class="{open:open}">
        <li @click="dragLayout">
          <font-awesome-icon :icon="['fas','th']"/>
        </li>
        <li @click="customFeature">
          <font-awesome-icon :icon="['fas','puzzle-piece']"/>
        </li>
        <li @click="globalSetting">
          <font-awesome-icon :icon="['fas','cog']"/>
        </li>
        <li @click="globalSetting">
          <font-awesome-icon :icon="['fas','cog']"/>
        </li>
        <li @click="globalSetting">
          <font-awesome-icon :icon="['fas','cog']"/>
        </li>
      </ul>
      <div ref="toggleMenu" class="toggleMenu" @click="toggleMenu" @mousedown="moveMenu">
        <font-awesome-icon v-if="open" :icon="['fas','plus']"/>
        <font-awesome-icon v-else :icon="['fas','bars']"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  name: 'Menu',

  data () {
    return {
      disX: 0,
      disY: 0,
      left: 30,
      top: 30,
      open: false
    }
  },
  methods: {
    toggleMenu () {
      this.open ? this.open = false : this.open = true
    },
    moveMenu (event) {
      const that = this
      const menu = this.$refs.menu
      const toggleMenu = this.$refs.toggleMenu
      event.preventDefault()
      this.disX = event.clientX - menu.offsetLeft  // 获取水平距离
      this.disY = event.clientY - menu.offsetTop   // 获取垂直距离
      toggleMenu.style.cursor = "grabbing"         // 修改鼠标指针Style事件
      toggleMenu.style.cursor = "-webkit-grabbing" // 兼容，修改鼠标指针Style事件

      document.onmousemove = function (e) {
        that.left = e.clientX - that.disX
        that.top = e.clientY - that.disY

        let clientWidth = document.documentElement.clientWidth
        let offsetWidth = menu.offsetWidth

        let clientHeight = document.documentElement.clientHeight
        let offsetHeight = menu.offsetHeight

        // 不让 div 移出左侧可视窗口
        if (that.left < 0) {
          that.left = 0
        } else if (that.left > clientWidth - offsetWidth) {
          that.left = clientWidth - offsetWidth
        }

        // 不让 div 移出顶部可视窗口
        if (that.top < 0) {
          that.top = 0
        } else if (that.top > clientHeight - offsetHeight) {
          that.top = clientHeight - offsetHeight
        }

      }

      document.onmouseup = function () {
        document.onmousemove = null
        document.onmouseup = null
        toggleMenu.style.cursor = "grab"          // 修改鼠标指针Style事件
        toggleMenu.style.cursor = "-webkit-grab"  // 兼容，修改鼠标指针Style事件
      }

    },
    dragLayout () {
      console.log('可拖拽布局')
      let val = [{ component: 'drag' }]
      this.$store.dispatch('SidebarModule', val)
    },
    customFeature () {
      console.log('自定义功能')
      let val = [{ component: 'custom' }]
      this.$store.dispatch('SidebarModule', val)
    },
    globalSetting () {
      console.log('全局设置')
      let val = [{ component: 'global' }]
      this.$store.dispatch('SidebarModule', val)
    }
  },
  created () {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  @mixin size($w, $h) {
    width: $w;
    height: $h;
  }
  @mixin bdrs($bdrs) {
    border-radius: $bdrs;
  }
  #menu {
    position: absolute;
    top: 0;
    left: 0;
    @include size(50px, 50px);
    z-index: 1001;
  }
  .menuBtn {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .toggleMenu {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 30px;
    background-color: tomato;
    @include bdrs(50%);
    cursor: pointer;
  }
  .box {
    @include size(50px, 50px);
    @include bdrs(50%);
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0%;
    left: 0%;
    opacity: 0;
    background-color: tomato;
    transition-duration: .3s;
    li {
      @include size(40px, 40px);
      @include bdrs(50%);
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      color: #fff;
      background-color: tomato;
      font-size: 18px; /* 22px */
      position: absolute;
      left: 10px;
      top: calc(20px - 20px/2);
      box-shadow: 0 0 .5px #babbbc;
      transition-duration: .3s;
      &:hover {
        box-shadow: 0 0 0 5px #babbbc;
        transition-delay: initial !important
      }
    }
    &.open {
      opacity: 1;
      li {
        left: 10px;
        $item: 5;
        @for $i from 0 through ($item - 1) {

          $deg: 180deg / ($item - 1);
          &:nth-of-type(#{$i + 1}) {
            transform: rotate($deg * $i - 90 ) translateX(80px) rotate(-$deg * $i + 90 );
            transition-delay: .1s * $i
          }
        }
      }
    }
  }
</style>