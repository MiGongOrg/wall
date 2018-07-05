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
import BackgroundSnow from './BackgroundSnow'

export default {

  name: 'Background',

  data () {
    return {
      arr: [{
        component: 'BackgroundImage'
      }]
    }
  },
  components: {
    BackgroundImage,
    BackgroundVideo,
    BackgroundSnow
  },
  computed: {
    ...mapGetters(['background']),
    background () {
      return this.$store.state.background
    }
  },
  watch: {
    'background.activeName': {
      handler: function (val) {
        this.arr[0].component = val
      },
      deep: true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .background-module {
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style>