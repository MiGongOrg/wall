<template>
  <div class="background-module">
    <div class="background-module-item"
      v-for="item in arr"
      :is="item.component"
    ></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BackgroundImage from './BackgroundImage'
import BackgroundVideo from './BackgroundVideo'
import BackgroundAnim from './BackgroundAnim'

export default {

  name: 'Background',

  data () {
    return {
      arr: [{
        component: null
      }]
    }
  },
  components: {
    BackgroundImage,
    BackgroundVideo,
    BackgroundAnim
  },
  computed: {
    ...mapGetters(['global']),
    global () {
      return this.$store.state.global
    }
  },
  watch: {
    'global.activeName': {
      handler: function (val) {
        this.arr[0].component = val
      },
      deep: true
    }
  },
  beforeMount () {
    this.arr[0].component = this.global.activeName
  },
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .background-module {
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style>