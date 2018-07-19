const qrcode = {
  state: {
    url: 'https://cdn.sonicmoving.cn/rabbit/qrcode.jpg',
    history: []
  },
  mutations: {
    SET_QRCODE_URL (state, value) {
      state.url = value
    },
    SET_HISTORY_URL (state, index) {
      state.history.splice(index, 1)
    },
    SET_HISTORY_ADD_URL (state, value) {
      state.history.push(value)
    }
  },
  actions: {
    SettingQrcodeUrl ({commit}, value) {
      commit('SET_QRCODE_URL', value)
    },
    SettingHistoryUrl ({commit}, index) {
      commit('SET_HISTORY_URL', index)
    },
    SettingHistoryAddUrl ({commit}, value) {
      commit('SET_HISTORY_ADD_URL', value)
    }
  }
}

export default qrcode