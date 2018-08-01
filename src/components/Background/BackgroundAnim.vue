<template>
  <div class="background-anim">
    <div class=""
      v-for="item in arr"
      :is="item.component"
    ></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AnimSnow from './Animation/AnimSnow'

export default {

  name: 'BackgroundAnim',

  data () {
    return {
      arr: [{
        component: 'AnimSnow'
      }]
    }
  },
  components: {
    AnimSnow,
  },
  computed: {
    ...mapGetters(['global']),
    global () {
      return this.$store.state.global
    }
  },
  watch: {
    'global.bgAnim.activeName': {
      handler: function (val) {
        console.log('handler:', val)
        this.arr[0].component = val
      },
      deep: true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .background-anim {

  }
</style>