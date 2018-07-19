const image = {
  state: {
    urls: [],
    delay: 3000,
    autoplay: false,
    index: null,
    resize: true,
  },
  mutations: {
    // 设置图片URL
    SET_IMAGE_URL (state, value) {
      state.urls.push(value)
    },
    SET_IMAGE_INDEX (state, index) {
      state.index = index
    },
    SET_IMAGE_AUTOPLAY (state, value) {
      state.autoplay = value
    },
    SET_IMAGE_DELAY (state, value) {
      state.delay = value
    },
    SET_IMAGE_RESIZE (state, value) {
      state.resize = value
    },
    SET_IMAGE_REMOVE (state, value) {
      state.urls.splice(value, 1)
    }
  },
  actions: {
    // 图片地址
    SettingImageUrl ({commit}, value) {
      commit('SET_IMAGE_URL', value)
    },
    SettingImageIndex ({commit}, index) {
      commit('SET_IMAGE_INDEX', index)
    },
    SettingImageAutoplay ({commit}, value) {
      commit('SET_IMAGE_AUTOPLAY', value)
    },
    SettingImageDelay ({commit}, value) {
      commit('SET_IMAGE_DELAY', value)
    },
    SettingImageResize ({commit}, value) {
      commit('SET_IMAGE_RESIZE', value)
    },
    SettingImageRemove ({commit}, value) {
      commit('SET_IMAGE_REMOVE', value)
    },
  }
}

export default image