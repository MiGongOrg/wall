<template>
  <div class="sidebar-module">
    <div
      class="sidebar-item"
      v-for="item in sidebar.module"
      :is="item.component"
    >
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { DragLayout, CustomFeature, GlobalSetting } from '@/components/Menu'
import { SettingTitle } from '@/components/Title'
import { SettingQrcode } from '@/components/Qrcode'
import { SettingImage } from '@/components/Image'
import { SettingClock } from '@/components/Clock'
import { SettingBarrage } from '@/components/Barrage'
import { SettingVideo } from '@/components/Video'
import { SettingIframe } from '@/components/Iframe'

export default {

  name: 'SidebarModule',

  data () {
    return {

    }
  },
  components: {
    Drag: DragLayout,
    Custom: CustomFeature,
    Global: GlobalSetting,
    SettingTitle,
    SettingQrcode,
    SettingClock,
    SettingBarrage,
    SettingImage,
    SettingVideo,
    SettingIframe
  },
  // 在 DOM 加载后马上执行
  computed: {
    ...mapGetters(['sidebar']),
    sidebar () {
      return this.$store.state.app.sidebar
    }
  },
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .sidebar-module {
    .sidebar-item {
      box-sizing: border-box;
      height: 100%;
      width: 245px;
      background-color: #fff;
      padding: 10px;
      ul {
        margin-bottom: 10px;
      }
    }
  }
</style>