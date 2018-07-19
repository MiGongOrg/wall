const qrcode = {
  state: {
    url: 'https://cdn.sonicmoving.cn/rabbit/qrcode.jpg',
    history: []
  },
  mutations: {
    SET_QRCODE_URL (state, value) {
      state.url = value
    },
    SET_QRCODE_HISTORY_URL (state, index) {
      state.history.splice(index, 1)
    },
    SET_QRCODE_HISTORY_ADD_URL (state, value) {
      state.history.push(value)
    }
  },
  actions: {
    SettingQrcodeUrl ({commit}, value) {
      commit('SET_QRCODE_URL', value)
    },
    SettingQrcodeHistoryUrl ({commit}, index) {
      commit('SET_QRCODE_HISTORY_URL', index)
    },
    SettingQrcodeHistoryAddUrl ({commit}, value) {
      commit('SET_QRCODE_HISTORY_ADD_URL', value)
    }
  }
}

export default qrcode