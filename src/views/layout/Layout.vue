<template>
  <div class="app-wrapper">
    <background-image></background-image>
    <background-video></background-video>
    <div class="app-container">
      <div class="main-container">
        <menu-nav></menu-nav>
        <wall></wall>
        <sidebar></sidebar>
        <feature-setting></feature-setting>
      </div>
    </div>
  </div>
</template>

<script>
import { Menu, Sidebar, Wall, BackgroundImage, BackgroundVideo, FeatureSetting } from './components'

export default {
  data () {
    return {
      
    }
  },
  name: 'layout',
  components: {
    menuNav: Menu,
    Sidebar,
    Wall,
    BackgroundImage,
    BackgroundVideo,
    FeatureSetting
  },
  created () {
    var loading = document.getElementById('Loading')
    if (loading) {
      document.body.removeChild(loading)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  @mixin width-height {
    width: 100%;
    height: 100%;
  }
  .app-wrapper {
    position: relative;
    @include width-height;
  }
  .app-container {
    position: absolute;
    z-index: 3;
    @include width-height;
  }
  .main-container {
    display: flex;
    @include width-height;
  }
</style>
