const title = {
  state: {
    text: 'Hello World!',
    color: '#fff',
    rgba: {
      r: 33,
      g: 123,
      b: 55,
      a: .5
    },
    rgbaStr: '33,123,55,.5',
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
      state.rgba = value.rgba
      state.rgbaStr = value.rgbaStr
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
  }
}

export default title