import { array } from 'lodash'

const app = {
  state: {
    sidebar: {
      module: [{ component: 'global' }],
      opened: true
    },
    draging: {
      dragId: null,
      targetId: null
    },
    occupied: ['custom-feature'],
    layout: [
      {
        "x": 0,
        "y": 0,
        "w": 100,
        "h": 0,
        "i": "0",
        "editStart": true,
        "feature": [{
          "component": 'FeatureDefault',
          "id": "a"
        }],
      }
    ]
  },
  mutations: {
    // 设置侧边栏状态
    SET_APP_TOGGLE_SIDEBAR (state) {
      state.sidebar.opened = !state.sidebar.opened
    },
    // 设置布局
    SET_APP_LAYOUT (state, value) {
      state.layout = value
    },
    // 设置侧边栏功能选项
    SET_APP_SIDEBAR_MODULE (state, value) {
      state.sidebar.module = value
      // 如果 sidebar 是关闭的，则打开
      if (!state.sidebar.opened) {
        this.commit('SET_APP_TOGGLE_SIDEBAR')
      }
    },
    // 当前被拖拽的功能模块ID
    SET_APP_DRAG_ID (state, id) {
      state.draging.dragId = id
    },
    // 目标容器ID
    SET_APP_TARGET_ID (state, id) {
      state.draging.targetId = id

      let index = _.findIndex(state.layout, function(index) { 
        return index.feature[0].id === id
      })
      // 某个功能模块移动到了某个容器中
      state.layout[index].feature[0].component = state.draging.dragId
    },
    SET_APP_CLEAR_FEATURE (state, id) {
      let index = _.findIndex(state.layout, function(index) { 
        return index.feature[0].id === id
      })

      // 清空该容器内的功能模块，设置为 default
      state.layout[index].feature[0].component = 'FeatureDefault'
    },
  },
  actions: {
    // 显示与隐藏侧边栏
    SettingAppToggleSideBar ({commit}) {
      commit('SET_APP_TOGGLE_SIDEBAR')
    },
    // 设置布局
    SettingAppLayout ({commit}, value) {
      commit('SET_APP_LAYOUT', value)
    },
    // 侧边栏功能模块
    SettingAppSidebarModule ({commit}, value) {
      commit('SET_APP_SIDEBAR_MODULE', value)
    },
    // 当前拖拽的功能模块ID
    SettingAppDragId ({commit}, id) {
      commit('SET_APP_DRAG_ID', id)
    },
    // 拖拽模块要移入的目标容器ID
    SettingAppTargetId ({commit}, id) {
      commit('SET_APP_TARGET_ID', id)
    },
    // 清空容器中的功能模块
    SettingAppClearFeature ({commit}, id) {
      commit('SET_APP_CLEAR_FEATURE', id)
    },
  }
}

export default app