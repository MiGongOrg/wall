const iframe = {
  state: {
    url: 'https://www.baidu.com',
    history: []
  },
  mutations: {
    SET_IFRAME_URL (state, value) {
      state.url = value
    },
    SET_IFRAME_HISTORY_URL (state, index) {
      state.history.splice(index, 1)
    },
    SET_IFRAME_HISTORY_ADD_URL (state, value) {
      state.history.push(value)
    }
  },
  actions: {
    SettingIframeUrl ({commit}, value) {
      commit('SET_IFRAME_URL', value)
    },
    SettingIframeHistoryUrl ({commit}, index) {
      commit('SET_IFRAME_HISTORY_URL', index)
    },
    SettingIframeHistoryAddUrl ({commit}, value) {
      commit('SET_IFRAME_HISTORY_ADD_URL', value)
    }
  }
}

export default iframe