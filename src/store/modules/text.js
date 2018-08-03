const title = {
  state: {
    content: 'Hello World!',
    color: {
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
    SET_TEXT_CONTENT (state, value) {
      state.content = value
    },
    SET_TEXT_FONT_SIZE (state, value) {
      state.fontSize = value
    },
    SET_TEXT_BG_COLOR (state, value) {
      state.bgColor = value
    },
    SET_TEXT_COLOR (state, value) {
      state.color = value
    },
  },
  actions: {
    // 设置标题文字
    SettingTextContent ({commit}, value) {
      commit('SET_TEXT_CONTENT', value)
    },
    // 设置标题文字大小
    SettingTextFontSize ({commit}, value) {
      commit('SET_TEXT_FONT_SIZE', value)
    },
    // 设置标题背景颜色
    SettingTextBgColor ({commit}, value) {
      commit('SET_TEXT_BG_COLOR', value)
    },
    // 设置标题文本颜色
    SettingTextColor ({commit}, value) {
      commit('SET_TEXT_COLOR', value)
    },
  }
}

export default title