const image = {
  state: {
    files: [],
    delay: 3000,
    autoplay: false,
    index: null,
    resize: true,
  },
  mutations: {
    // 设置图片URL
    SET_IMAGE_URL (state, value) {
      state.files.push(value)
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
      state.files.splice(value, 1)
    }
  },
  actions: {
    // 图片地址
    SettingImageUrl ({commit}, value) {
      commit('SET_IMAGE_URL', value)
    },
    // 选择当前图片
    SettingImageIndex ({commit}, index) {
      commit('SET_IMAGE_INDEX', index)
    },
    // 图片自动轮播
    SettingImageAutoplay ({commit}, value) {
      commit('SET_IMAGE_AUTOPLAY', value)
    },
    // 图片轮播间隔时长
    SettingImageDelay ({commit}, value) {
      commit('SET_IMAGE_DELAY', value)
    },
    // 图片尺寸自适应
    SettingImageResize ({commit}, value) {
      commit('SET_IMAGE_RESIZE', value)
    },
    // 删除图片
    SettingImageRemove ({commit}, value) {
      commit('SET_IMAGE_REMOVE', value)
    },
  }
}

export default image