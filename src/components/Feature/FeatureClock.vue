<template>
  <div class="feature-clock">
    <flip-clock
      ref="flipclock"
      v-if="layout.init[index].setting[0].diff > 0"
      :options="layout.init[index].setting[0].options"
      :digit="layout.init[index].setting[0].diff"
    ></flip-clock>
    <flip-clock
      ref="flipclock"
      v-else
      :options="layout.init[index].setting[0].options"
    ></flip-clock>

    <div class="feature-edit">
      <ol>
        <li @click="setting">
          <font-awesome-icon :icon="['fas', 'cogs']"/>
        </li>
        <li @click="close">
          <font-awesome-icon :icon="['fas', 'times']"/>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import { FlipClock } from '@mvpleung/flipclock'
import { mapGetters } from 'vuex'

export default {

  name: 'FeatureClock',

  data () {
    return {
      test: null,
      diff: 0,
      options: {
        // 自动开始，默认是 true
        autoStart: true,
        // 数字倒数，默认是 false 则 UP
        countdown: false,
        language: 'en',
        // 时间样式，默认是 HourlyCounter，可选值：DailyCounter, HourlyCounter, MinuteCounter, Counter 等
        clockFace: 'HourlyCounter',
      }
    }
  },

  components: {
    FlipClock
  },
  props: ['parentId', 'index'],
  computed: {
    ...mapGetters(['layout']),
    layout () {
      return this.$store.state.app.layout
    }
  },
  methods: {
    setting () {
      let value = [{
        name: 'SettingClock',
        index: this.index
      }]

      this.$store.dispatch('SettingNav', value)
    },
    close () {
      document.getElementById(this.parentId).innerHTML = ''
      // 清空该容器内的功能模块，设置为 default
      this.$store.dispatch('ClearFeature', this.parentId)
    },
    newDate () {
      var currentDate = new Date();
      // Set some date in the past. In this case, it's always been since Jan 1
      var pastDate = new Date(currentDate.getFullYear(), 0, 1);
      // Calculate the difference in seconds between the future and current date
      var diff = currentDate.getTime() / 1000 - pastDate.getTime() / 1000;

      this.time = diff
    },
    // 新年倒计时
    newYears () {
      var currentDate = new Date();
      var futureDate = new Date(currentDate.getFullYear() + 1, 0, 1);
      this.diff = futureDate.getTime() / 1000 - currentDate.getTime() / 1000;
      // 是否显示（日、时、分、秒）文字提示
      this.options.label = false
      // 是否显示时间与时间之间的 : 符号
      this.options.dot = true
      this.options.clockFace = 'DailyCounter'
      this.options.countdown = true

    },
    // 当前时间
    currentDate (show, time) {
      this.options.clockFace = 'TwentyFourHourClock'
      // 是否显示秒数
      this.options.showSeconds = show
      // 自定义开始时间
      if (time) {
        // '2014-01-01 05:02:12 pm'，如果设置了自定义时间，则从 05:02:12 开始
        this.options.time = new Date(time)
      }
    },
    // 计数器
    counter (minimum) {
      this.options.clockFace = 'Counter'
      // 时间面板个数
      this.options.minimumDigits = minimum
    },
    // 倒计时
    countdown (time) {
      this.options.clockFace = 'Counter'
      this.diff = time
      // 时间面板个数
      this.options.minimumDigits = time.toString().length
      this.options.countdown = true
    },
    // 面板样式
    clockFace (face) {
      // DailyCounter, HourlyCounter, MinuteCounter, Counter
      this.options.clockFace = face
    }
  },
  mounted () {
    
  },
  created () {
    let value = {}

    var currentDate = new Date();
    var futureDate = new Date(currentDate.getFullYear() + 1, 0, 1);
    var diff = futureDate.getTime() / 1000 - currentDate.getTime() / 1000;
    // console.log(currentTime)
    value.diff = diff
    value.index = this.index
    value.options = {
      countdown: true,
      // minimumDigits: 2,
      // clockFace: 'Counter'
      label: false,
      // showSeconds: 'show',
      clockFace: 'DailyCounter'
    }
    this.$store.dispatch('SettingClockTime', value)

    // const that = this
    // setTimeout(function() {

    //   let value = {}
    //   value.diff = 99
    //   value.index = that.index
    //   value.options = {
    //     countdown: true,
    //     minimumDigits: 2,
    //     clockFace: 'Counter'
    //   }
    //   that.$store.dispatch('SettingClockTime', value)

    //   that.$refs.flipclock.reset({
    //     diff: 99
    //     countdown: true,
    //     minimumDigits: 2,
    //     clockFace: 'Counter'
    //     // showSeconds: 'show',
    //     // clockFace: 'TwentyFourHourClock'
    //   });
    // }, 6000);

    // this.newYears()
    // this.clockFace('DailyCounter')
    // this.countdown(999)
    // this.counter(3)
    // this.currentDate(true)
    // this.test = this.$store.state.app.layout.init[this.index].setting[0].activeTab
    // console.log(this.$store.state.app.layout)
    // console.log(this.test)
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