const background = {
  state: {
    activeName: 'backgroundImage',
    backgroundImage: {
      autoplay: false,
      delay: 2000,
      urls: [],
      index: null
    },
    backgroundVideo: {
      url: null
    },
    backgroundColor: {
      rgbaStr: '0,0,0,.01',
      rgba: {
        r: 0,
        g: 0,
        b: 0,
        a: .01
      }
    }
  },
  mutations: {
    // 设置背景图片URL
    SET_IMAGE_BG_URL (state, value) {
      state.backgroundImage.urls = value
    },
    // 设置背景视频URL
    SET_VIDEO_BG_URL (state, value) {
      state.backgroundVideo.url = value
    },
    SET_IMAGE_BG_INDEX (state, index) {
      state.backgroundImage.index = index
    },
  },
  actions: {
    // 背景图片地址
    ImageBgUrl ({commit}, value) {
      commit('SET_IMAGE_BG_URL', value)
    },
    // 背景视频地址
    VideoBgUrl ({commit}, value) {
      commit('SET_VIDEO_BG_URL', value)
    },
    // 切换背景图片
    ImageBgIndex ({commit}, index) {
      commit('SET_IMAGE_BG_INDEX', index)
    },
  }
}

export default background