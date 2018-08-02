const global = {
  state: {
    activeName: 'backgroundImage',
    colNum: 100,
    rowHeight: 20,
    draggable: true,
    resizable: true,
    overflow: false,
    margin: [10, 10],
    bgImage: {
      autoplay: false,
      delay: 3000,
      files: [],
      index: null
    },
    bgVideo: {
      files: []
    },
    bgColor: {
      rgbaStr: '0,0,0,.01',
      rgba: {
        r: 0,
        g: 0,
        b: 0,
        a: .01
      }
    },
    bgAnim: {
      activeName: 'AnimSnow',
      options: [{
        value: 'AnimSnow',
        label: '3D 雪花'
      }]
    }
  },
  mutations: {
    SET_GLOBAL_ACTIVE (state, value) {
      state.activeName = value
    },
    SET_GLOBAL_BG_COLOR (state, value) {
      state.bgColor = value
    },
    SET_GLOBAL_BG_IMAGE (state, value) {
      state.bgImage.files.push(value)
    },
    SET_GLOBAL_BG_IMAGE_INDEX (state, index) {
      state.bgImage.index = index
    },
    SET_GLOBAL_BG_IMAGE_REMOVE (state, value) {
      state.bgImage.files.splice(value, 1)
    },
    SET_GLOBAL_BGIMAGE_AUTOPLAY (state, value) {
      state.bgImage.autoplay = value
    },
    SET_GLOBAL_BGIMAGE_DELAY (state, value) {
      state.bgImage.delay = value
    },
    SET_GLOBAL_DRAGGABLE (state, value) {
      state.draggable = value
    },
    SET_GLOBAL_RESIZABLE (state, value) {
      state.resizable = value
    },
    SET_GLOBAL_OVERFLOW (state, value) {
      state.overflow = value
    },
    SET_GLOBAL_BG_VIDEO (state, value) {
      state.bgVideo.files.push(value)
    },
    SET_GLOBAL_BG_VIDEO_REMOVE (state, value) {
      state.bgVideo.files.splice(value, 1)
    },
    SET_GLOBAL_BG_ANIM (state, value) {
      state.bgAnim.activeName = value
    }
  },
  actions: {
    SettingGlobalActive ({commit}, value) {
      commit('SET_GLOBAL_ACTIVE', value)
    },
    // 设置全局容器背景颜色
    SettingGlobalBgColor ({commit}, value) {
      commit('SET_GLOBAL_BG_COLOR', value)
    },
    // 添加背景图片
    SettingGlobalBgImage ({commit}, value) {
      commit('SET_GLOBAL_BG_IMAGE', value)
    },
    // 当前选中的背景图片
    SettingGlobalBgImageIndex ({commit}, value) {
      commit('SET_GLOBAL_BG_IMAGE_INDEX', value)
    },
    // 删除背景图片
    SettingGlobalBgImageRemove ({commit}, value) {
      commit('SET_GLOBAL_BG_IMAGE_REMOVE', value)
    },
    // 设置全局容器背景图片是否可自动播放
    SettingGlobalBgImageAutoplay ({commit}, value) {
      commit('SET_GLOBAL_BGIMAGE_AUTOPLAY', value)
    },
    // 设置全局容器背景图片是否可自动播放间隔时长
    SettingGlobalBGImageDelay ({commit}, value) {
      commit('SET_GLOBAL_BGIMAGE_DELAY', value)
    },
    // 设置全局容器是否可拖拽
    SettingGlobalDraggable ({commit}, value) {
      commit('SET_GLOBAL_DRAGGABLE', value)
    },
    // 设置全局容器是否可缩放尺寸
    SettingGlobalResizable ({commit}, value) {
      commit('SET_GLOBAL_RESIZABLE', value)
    },
    // 设置容器是否可溢出布局
    SettingGlobalOverflow ({commit}, value) {
      commit('SET_GLOBAL_OVERFLOW', value)
    },
    // 设置背景视频
    SettingGlobalBgVideo ({commit}, value) {
      commit('SET_GLOBAL_BG_VIDEO', value)
    },
    // 删除背景视频
    SettingGlobalBgVideoRemove ({commit}, value) {
      commit('SET_GLOBAL_BG_VIDEO_REMOVE', value)
    },
    // 设置背景动画
    SettingGlobalBgAnim ({commit}, value) {
      commit('SET_GLOBAL_BG_ANIM', value)
    }
  }
}

export default global