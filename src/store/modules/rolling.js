const rolling = {
  state: {
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
        r: 0,
        g: 0,
        b: 0,
        a: .3
      },
      rgbaStr: '0,0,0,.3',
    },
    fontSize: 30,
    avatarSize: 80
  },
  mutations: {
    SET_TEXT_FONT_SIZE (state, value) {
      state.fontSize = value
    },
    SET_AVATAR_SIZE (state, value) {
      state.avatarSize = value
    },
    SET_TEXT_BG_COLOR (state, value) {
      state.bgColor = value
    },
    SET_TEXT_COLOR (state, value) {
      state.color = value
    },
  },
  actions: {
    // 设置文字大小
    SettingTextFontSize ({commit}, value) {
      commit('SET_TEXT_FONT_SIZE', value)
    },
    // 设置头像大小
    SettingAvatarSize ({commit}, value) {
      commit('SET_AVATAR_SIZE', value)
    },
    // 设置背景颜色
    SettingTextBgColor ({commit}, value) {
      commit('SET_TEXT_BG_COLOR', value)
    },
    // 设置文本颜色
    SettingTextColor ({commit}, value) {
      commit('SET_TEXT_COLOR', value)
    },
  }
}

export default rolling