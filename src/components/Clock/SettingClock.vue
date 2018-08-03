<template>
  <div class="setting-clock">
    <h2>{{$t('message.time')}} {{$t('message.setting')}}</h2>
    <h3>{{$t('message.time')}}</h3>
    <ul>
      <li>
        <el-tabs v-model="clock.activeName" @tab-click="tabClick">
          <el-tab-pane name="currentTime">
            <span slot="label">{{$t('message.time')}}</span>
          </el-tab-pane>
          <el-tab-pane name="countdown">
            <span slot="label">{{$t('message.countdown')}}</span>
            <el-radio-group v-model="clock.countdown.radio" @change="changeCountdown">
              <el-radio :label="1" border>{{$t('message.newYear')}} {{$t('message.countdown')}}</el-radio>
              <el-radio :label="2" border>{{$t('message.countdown')}}</el-radio>
            </el-radio-group>

            <p class="countdown" v-if="clock.countdown.radio === 2">
              <el-input placeholder="秒" v-model="clock.countdown.digit"></el-input>
              <el-button-group>
                <el-button type="primary" @click="startCountdown">{{$t('message.start')}}</el-button>
                <el-button type="primary" @click="pauseCountdown">{{$t('message.pause')}}</el-button>
                <el-button type="primary" @click="resetCountdown">{{$t('message.reset')}}</el-button>
              </el-button-group>
            </p>

          </el-tab-pane>
          <el-tab-pane name="counter">
            <span slot="label">{{$t('message.counter')}}</span>
            <div class="counter">
              <el-input placeholder="秒" v-model="clock.counter.digit"></el-input>
              <el-button-group>
                <el-button type="primary" @click="startCounter">{{$t('message.start')}}</el-button>
                <el-button type="primary" @click="pauseCounter">{{$t('message.pause')}}</el-button>
                <el-button type="primary" @click="resetCounter">{{$t('message.reset')}}</el-button>
              </el-button-group>
            </div>
          </el-tab-pane>
        </el-tabs>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {

  name: 'SettingClock',

  data () {
    return {
      isCountdown: true,
      countdownTime: null,
      isCounter: true,
    }
  },
  props: ['index'],
  computed: {
    ...mapGetters(['clock']),
    clock () {
      return this.$store.state.clock
    }
  },
  methods: {
    tabClick (event) {
      let paneName = event.paneName
      if (paneName === 'currentTime') {
        // 当前时间
        this.currentDate()
      } else if (paneName === 'countdown') {
        if (this.clock.countdown.radio === 1) {
          // 新年倒计时
          this.newYears()
        } else {
          this.countdown(false)
        }
      } else if (paneName === 'counter') {
        // 计数器
        this.counter(false)
      }
    },
    // 倒计时切换类型
    changeCountdown (value) {
      if (value === 1) {
        this.newYears()
      } else if (value === 2) {
        this.countdown(false)
      }
    },
    // 当前时间
    currentDate () {
      let options = {
        clockFace: 'TwentyFourHourClock',
        showSeconds: true
      }

      this.$store.dispatch('SettingClockTime', options)
    },
    // 倒计时
    countdown (autoStart) {
      const that = this
      let options = {
        clockFace: 'Counter',
        digit: this.clock.countdown.digit,
        // 时间面板个数
        minimumDigits: this.clock.countdown.digit.toString().length,
        countdown: true,
        autoStart: autoStart,
        callbacks: {
          interval: function () {
            let time = this.factory.getTime().time
            if (time && that.isCountdown) {
              that.clock.countdown.digit = time
            } else if (!time) {
              // 倒计时结束，初始化时间
              that.clock.countdown.digit = that.countdownTime
            }
          },
          stop: function () {
            console.log('倒计时结束')
          }
        }
      }

      this.$store.dispatch('SettingClockTime', options)
    },
    // 开始倒计时
    startCountdown () {
      this.isCountdown = true
      this.countdown(true)
    },
    // 暂停倒计时
    pauseCountdown () {
      this.countdown(false)
    },
    // 重置倒计时
    resetCountdown () {
      console.log('重置倒计时：', this.countdownTime)
      this.clock.countdown.digit = this.countdownTime
      this.isCountdown = false
      this.countdown(false)
    },
    // 新年倒计时
    newYears () {
      let currentDate = new Date()
        , futureDate = new Date(currentDate.getFullYear() + 1, 0, 1)
        , diff = futureDate.getTime() / 1000 - currentDate.getTime() / 1000
        , options = {
        digit: diff,
        countdown: true,
        label: false,
        clockFace: 'DailyCounter'
      }
      this.$store.dispatch('SettingClockTime', options)
    },
    // 计数器
    counter (autoStart) {
      const that = this
      let options = {
        clockFace: 'Counter',
        digit: this.clock.counter.digit,
        // 时间面板个数
        minimumDigits: this.clock.counter.digit.toString().length,
        autoStart: autoStart,
        callbacks: {
          interval: function () {
            let time = this.factory.getTime().time
            if (time && that.isCounter) {
              that.clock.counter.digit = time
            }
          }
        }
      }
      this.$store.dispatch('SettingClockTime', options)
    },
    // 开始计数
    startCounter () {
      this.isCounter = true
      this.counter(true)
    },
    // 暂停计数
    pauseCounter () {
      this.counter(false)
    },
    // 重置计数
    resetCounter () {
      this.clock.counter.digit = 0
      this.isCounter = false
      this.counter(false)
    },

  },
  created () {
    this.countdownTime = this.clock.countdown.digit
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .setting-clock {
    .el-radio, .el-radio.is-bordered + .el-radio.is-bordered {
      margin: 0 10px 10px 0;
    }
    .countdown {
      margin-top: 10px;
    }
    .counter, .countdown {
      display: flex;
      .el-input {
        flex: 1;
      }
      .el-input__inner {
        padding: 0 10px;
        text-align: center;
        border-bottom-right-radius: 0;
        border-top-right-radius: 0;
      }
      .el-button {
        &:first-child {
          border-radius: 0;
        }
      }
    }
  }
</style>