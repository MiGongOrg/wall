const image = {
  state: {
    urls: [],
    delay: 3000,
    autoplay: false,
    index: null,
    size: true,
  },
  mutations: {
    // 设置图片URL
    SET_IMAGE_URL (state, value) {
      state.urls = value
    },
    SET_IMAGE_INDEX (state, index) {
      state.index = index
    },
  },
  actions: {
    // 图片地址
    ImageUrl ({commit}, value) {
      commit('SET_IMAGE_URL', value)
    },
    ImageIndex ({commit}, index) {
      commit('SET_IMAGE_INDEX', index)
    },
  }
}

export default image