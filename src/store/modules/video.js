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
    SET_VIDEO_LINK (state, value) {
      state.link = value
    },
    SET_VIDEO_LINK_URL (state, value) {
      state.link.url = value
    },
    SET_VIDEO_LOCAL (state, value) {
      state.local = value
    },
    // 设置本地视频URL
    SET_VIDEO_LOCAL_URL (state, value) {
      state.local.url = value
    },
    // 当前被选中的Tab
    SET_VIDEO_ACTIVE_TAB (state, value) {
      state.activeName = value
    }
  },
  actions: {
    SettingVideoLink ({commit}, value) {
      commit('SET_VIDEO_LINK', value)
    },
    // 视频外链地址
    SettingVideoLinkUrl ({commit}, value) {
      commit('SET_VIDEO_LINK_URL', value)
    },
    SettingVideoLocal ({commit}, value) {
      commit('SET_VIDEO_LOCAL', value)
    },
    // 本地视频地址
    SettingVideoLocalUrl ({commit}, value) {
      commit('SET_VIDEO_LOCAL_URL', value)
    },
    // 当前被选中的Tab
    SettingVideoActiveTab ({commit}, value) {
      commit('SET_VIDEO_ACTIVE_TAB', value)
    }
  }
}

export default video