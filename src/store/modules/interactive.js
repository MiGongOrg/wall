const interactive = {
  state: {
    bannerSize: 50
  },
  mutations: {
    SET_BANNER_SIZE (state, value) {
      state.bannerSize = value
      console.log('bannerSize:', state.bannerSize)
    },
  },
  actions: {
    // 设置横幅大小
    SettingBannerSize ({commit}, value) {
      commit('SET_BANNER_SIZE', value)
    },
  }
}

export default interactive