const clock = {
  state: {
    digit: 0,
    options: {
      // 自动开始，默认是 true
      autoStart: true,
      // 数字倒数，默认是 false 则 UP
      countdown: false,
      language: 'en',
      // 时间样式，默认是 HourlyCounter，可选值：DailyCounter, HourlyCounter, MinuteCounter, Counter 等
      clockFace: 'TwentyFourHourClock',
      showSeconds: true,
      digit: 0
    },
    activeName: 'currentTime',
    // 倒计时设置
    countdown: {
      radio: 1,
      digit: 60
    },
    // 当前时间设置
    currentTime: {

    },
    // 计数器设置
    counter: {
      digit: 0
    }
  },
  mutations: {
    SET_CLOCK_TIME (state, options) {
      state.options = options
    }
  },
  actions: {
    SettingClockTime ({commit}, options) {
      commit('SET_CLOCK_TIME', options)
    }
  }
}

export default clock