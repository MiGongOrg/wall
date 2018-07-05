<template>
  <div class="feature-clock">
    <flip-clock
      ref="flipclock"
      :options="clock.options"
    ></flip-clock>

    <feature-setting :parentId="parentId" :settingName="settingName"></feature-setting>
  </div>
</template>

<script>
import { FlipClock } from '@mvpleung/flipclock'
import { FeatureSetting } from '@/components/Setting'
import { mapGetters } from 'vuex'

export default {

  name: 'FeatureClock',

  data () {
    return {
      settingName: 'SettingClock',
    }
  },

  components: {
    FlipClock,
    FeatureSetting
  },
  props: ['parentId', 'index'],
  computed: {
    ...mapGetters(['clock']),
    clock () {
      return this.$store.state.clock
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .feature-clock {
    .flip-clock-wrapper {
      div.inn {
        color: #ccc;
        background-color: #333;
      }
    } 
  }
</style>