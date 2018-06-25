<template>
  <div class="setting-clock">
    <ul>
      <li>
        <el-tabs v-model="layout.init[index].setting[0].activeTab" @tab-click="tabClick">
          <el-tab-pane label="当前时间" name="currentTime">
            
          </el-tab-pane>
          <el-tab-pane label="倒计时" name="countdown">
            <el-radio-group v-model="layout.init[index].setting[0][layout.init[index].setting[0].activeTab].radio" @change="changeCountdown">
              <el-radio :label="1">倒计时</el-radio>
              <el-radio :label="2">跨年倒计时</el-radio>
            </el-radio-group>
            <el-input placeholder="秒" v-if="layout.init[index].setting[0][layout.init[index].setting[0].activeTab].radio === 1"></el-input>
          </el-tab-pane>
          <el-tab-pane label="计数器" name="counter">
            <el-input placeholder=""></el-input>
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
      countdown: 1,
      activeName: null
    }
  },
  props: ['index'],
  computed: {
    ...mapGetters(['layout']),
    layout () {
      return this.$store.state.app.layout
    }
  },
  methods: {
    tabClick (event) {
      console.log(event.paneName)
    },
    changeCountdown (value) {
      console.log('countdown', value)
      if (value === 2) {
        this.newYears()
      } else if (value === 1) {
        this.currentDate()
      }
    },
    // 当前时间
    currentDate (show, time) {
      let value = {}
      value.diff = 0
      value.index = this.index
      value.options = {
        clockFace: 'TwentyFourHourClock',
        countdown: false,
      }
      this.$store.dispatch('SettingClockTime', value)
      
    },
    // 新年倒计时
    newYears () {
      console.log('newYear')
      let currentDate = new Date();
      let futureDate = new Date(currentDate.getFullYear() + 1, 0, 1);
      let diff = futureDate.getTime() / 1000 - currentDate.getTime() / 1000;
      let value = {}

      value.diff = diff
      value.index = this.index
      value.options = {
        clockFace: 'DailyCounter',
        countdown: true,
      }
      this.$store.dispatch('SettingClockTime', value)
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .setting-clock {

  }
</style>