const title = {
  state: {
    text: 'Hello World!',
    textColor: {
      rgba: {
        r: 0,
        g: 0,
        b: 0,
        a: 1
      },
      rgbaStr: '0,0,0,1'
    },
    bgColor: {
      rgba: {
        r: 33,
        g: 123,
        b: 55,
        a: .5
      },
      rgbaStr: '33,123,55,.5',
    },
    fontSize: 24
  },
  mutations: {
    SET_TITLE_TEXT (state, value) {
      state.text = value
    },
    SET_TITLE_FONT_SIZE (state, value) {
      state.fontSize = value
    },
    SET_TITLE_BG_COLOR (state, value) {
      state.bgColor = value
    },
    SET_TITLE_TEXT_COLOR (state, value) {
      state.textColor = value
    },
  },
  actions: {
    // 设置标题文字
    SettingTitleText ({commit}, value) {
      commit('SET_TITLE_TEXT', value)
    },
    // 设置标题文字大小
    SettingTitleFontSize ({commit}, value) {
      commit('SET_TITLE_FONT_SIZE', value)
    },
    // 设置标题背景颜色
    SettingTitleBgColor ({commit}, value) {
      commit('SET_TITLE_BG_COLOR', value)
    },
    // 设置标题文本颜色
    SettingTitleTextColor ({commit}, value) {
      commit('SET_TITLE_TEXT_COLOR', value)
    },
  }
}

export default title