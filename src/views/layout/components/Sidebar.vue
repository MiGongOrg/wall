<template>
  <div id="sidebar" :class="{hideSidebar:!sidebar.opened}">
    <div class="sidebar-container">
      <div class="menu">
        <div class="toggle-sidebar" @click="toggleSideBar">
          <p class=""></p>
        </div>
        <ul>
          <li @click="dragLayout">
            <p class="icon-image drag-layout-icon"></p>
            <p>布局</p>
          </li>
          <li @click="customFeature">
            <p class="icon-image custom-feature-icon"></p>
            <p>功能</p>
          </li>
          <li @click="globalSetting">
            <p class="icon-image global-setting-icon"></p>
            <p>全局设置</p>
          </li>
          <li class="fullscreen" @click="fullscreen">
            <p class="icon-image fullscreen-lightning-icon"></p>
            <p>预览</p>
          </li>
        </ul>
      </div>
      <sidebar-module></sidebar-module>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import EventBus from '@/assets/EventBus.js'
import { SidebarModule } from '@/components/Sidebar'

export default {
  name: 'Sidebar',

  data () {
    return {

    }
  },

  components: {
    SidebarModule,
  },
  // 在 DOM 加载后马上执行
  computed: {
    ...mapGetters(['sidebar']),
    sidebar () {
      return this.$store.state.app.sidebar
    }
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('ToggleSideBar')
    },
    dragLayout () {
      let val = [{ component: 'drag' }]
      this.$store.dispatch('SidebarModule', val)
    },
    customFeature () {
      let val = [{ component: 'custom' }]
      this.$store.dispatch('SidebarModule', val)
    },
    globalSetting () {
      let val = [{ component: 'global' }]
      this.$store.dispatch('SidebarModule', val)
    },
    fullscreen () {
      EventBus.$emit('toggleFullScreen')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  #sidebar {
    position: relative;
    height: 100%;
    width: 305px;
    transition: width .28s;
    .sidebar-container {
      display: flex;
      width: 305px;
      height: 100%;
    }
    .toggle-sidebar {
      position: relative;
      width: 100%;
      height: 16px;
      background-color: #CDCDCD;
      cursor: ew-resize;
      p {
        position: absolute;
        left: 43px;
        top: 50%;
        margin-top: -4.5px;
        width: 7px;
        height: 9px;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: center;
        background-image: url('images/icon-toggle-arrows.png');
        transition: left .28s;
      }
    }
    .menu {
      position: relative;
      width: 60px;
      height: 100%;
      background-image: linear-gradient(-180deg, #E0E0E0 0%, #DADADA 100%);
      ul {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        padding: 20px 0 10px 0;
        font-size: 12px;
        color: #444;
      }
      li {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        width: 100%;
        margin-bottom: 30px;
        cursor: pointer;
        p {
          width: 100%;
          text-align: center;
        }
      }
      .fullscreen {
        position: absolute;
        left: 0;
        bottom: 0;
        margin-bottom: 10px;
        &:before {
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translate(-50%, -50%);
          content: '';
          width: 30px;
          height: 1px;
          background-color: #979797;
        }
      }
    }
    li {
      p.icon-image {
        width: 26px;
        height: 26px;
        margin-bottom: 10px;
        background-size: 100% 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-color: transparent;
      }
      img {
        width: 100%;
      }
    }
    h2, h3 {
      color: #444444;
      width: 100%;
    }
    h2 {
      text-align: center;
      padding: 10px 0 40px 0;
      font-size: 18px;
    }
    h3 {
      text-align: left;
      font-size: 16px;
      padding: 10px 0;
      margin-bottom: 10px;
    }
    .flex-space-between {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      color: #454545;
      font-size: 14px;
      margin-bottom: 20px;
      p {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
      }
      .sub {
        display: block;
        width: 100%;
        text-align: left;
        font-size: 12px;
        margin-top: 5px;
        color: #c9c9c9;
      }
    }
    .drag-layout-icon {
      background-image: url('./images/icon-drag-layout.png');
    }
    .custom-feature-icon {
      background-image: url('./images/icon-custom-feature.png');
    }
    .global-setting-icon {
      background-image: url('./images/icon-global-setting.png');
    }
    .fullscreen-lightning-icon {
      background-image: url('./images/icon-fullscreen-lightning.png');
    }
  }
  #sidebar.hideSidebar {
    width: 60px;
    .toggle-sidebar {
      p {
        left: 10px;
        transform: scaleX(-1);
      }
    }
  }
</style>
