<template>
  <div class="app-wrapper">
    <background></background>
    <div class="app-container">
      <div class="main-container">
        <wall></wall>
        <sidebar></sidebar>
      </div>
    </div>
  </div>
</template>

<script>
import { Sidebar, Wall } from './components'
import { Background } from '@/components/Background'

export default {
  data () {
    return {
      
    }
  },
  name: 'layout',
  components: {
    Sidebar,
    Wall,
    Background,
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
