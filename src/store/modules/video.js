const video = {
  state: {
    activeName: 'link',
    local: {
      url: null,
      loop: true,
      autoplay: true,
      controls: true,
    },
    link: {
      url: 'http://soundbus-media.oss-cn-shenzhen.aliyuncs.com/sunbar/wx/public/screen_vedio/goldAnimation.mp4',
      loop: true,
      autoplay: true,
      controls: true,
    },
    capture: {
      url: null
    }
  },
  mutations: {
    // 设置视频URL
    SET_VIDEO_URL (state, value) {
      state.local.url = value
    },
    // 当前被选中的Tab
    SET_ACTIVE_TAB (state, value) {
      state.activeName = value
    }
  },
  actions: {
    // 视频地址
    VideoUrl ({commit}, value) {
      commit('SET_VIDEO_URL', value)
    },
    // 当前被选中的Tab
    ActiveTab ({commit}, value) {
      commit('SET_ACTIVE_TAB', value)
    }
  }
}

export default video