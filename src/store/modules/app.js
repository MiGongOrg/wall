import Cookies from 'js-cookie'
import { array } from 'lodash'

const app = {
  state: {
    sidebar: {
      module: [{ component: 'global' }],
      opened: !+Cookies.get('sidebarStatus')
    },
    background: {
      video: null,
      images: []
    },
    draging: {
      dragId: null,
      targetId: null
    },
    occupied: ['custom-feature'],
    layout: {
      margin: [10, 10],
      rowHeight: 20,
      draggable: true,
      resizable: true,
      colNum: 100,
      init: [
        {
          'x': 0, 'y': 0, 'w': 100, 'h': 0, 'i': '0',
          'editStart': true,
          'feature': [{
            'component': 'FeatureTitle',
            'id': "a"
          }],
          'setting': [{}],
        }
      ]
    },
    setting: {
      nav: [],
      global: {
        draggable: true,
        resizable: true,
        margin: [5, 10],
        backgroundImage: {
          autoplay: false,
          delay: 3000,
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
      feature: {
        FeatureTitle: {
          text: 'Hello Wall',
          color: '#fff',
          rgba: {
            r: 33,
            g: 123,
            b: 55,
            a: .5
          },
          rgbaStr: '33,123,55,.5',
          fontSize: 24
        },
        FeatureClock: {
          diff: 0,
          options: {
            // 自动开始，默认是 true
            autoStart: true,
            // 数字倒数，默认是 false 则 UP
            countdown: false,
            language: 'en',
            // 时间样式，默认是 HourlyCounter，可选值：DailyCounter, HourlyCounter, MinuteCounter, Counter 等
            clockFace: 'TwentyFourHourClock',
            showSeconds: true
          },
          activeTab: 'currentTime',
          countdown: {
            radio: 2
          },
          currentTime: {

          },
          counter: {

          }
        }
      }
    }
  },
  mutations: {
    // 设置侧边栏状态
    TOGGLE_SIDEBAR (state) {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    // 设置布局
    SET_LAYOUT_INIT (state, value) {
      state.layout.init = value
    },
    // 设置侧边栏功能选项
    SET_SIDEBAR_MODULE (state, value) {
      state.sidebar.module = value
      // 如果 sidebar 是关闭的，则打开
      if (!state.sidebar.opened) {
        this.commit('TOGGLE_SIDEBAR')
      }

    },
    
    // SET_IMAGE_BG_DELAY (state, value) {
    //   state.setting.global.backgroundImage.delay = value
    // },
    // 当前被拖拽的功能模块ID
    SET_DRAG_ID (state, id) {
      state.draging.dragId = id
    },
    // 目标容器ID
    SET_TARGET_ID (state, id) {
      state.draging.targetId = id

      let index = _.findIndex(state.layout.init, function(index) { 
        return index.feature[0].id === id
      })
      // 某个功能模块移动到了某个容器中
      state.layout.init[index].feature[0].component = state.draging.dragId
      // 该功能模块的初始设置选项
      let setting = state.setting.feature[state.draging.dragId]
      state.layout.init[index].setting[0] = setting

    },
    SET_FEATURE_COMPONENT (state, id) {
      let index = _.findIndex(state.layout.init, function(index) { 
        return index.feature[0].id === id
      })

      // 清空该容器内的功能模块，设置为 default
      state.layout.init[index].feature[0].component = 'FeatureDefault'
    },
    // 已被使用中的容器
    SET_OCCUPIED (state, id) {
      // 存在则删除，否则新增（因为被占用的容器已隐藏，这一步是多余的）
      if (id) {
        console.log(id)
      } else {
        state.occupied.push(id)
      }
    },
    SET_SETTING_NAV (state, value) {
      state.setting.nav = value
    },
    
    SET_CONTAINER_BG_COLOR (state, value) {
      state.setting.global.backgroundColor.rgba = value.rgba
      state.setting.global.backgroundColor.rgbaStr = value.rgbaStr
    }
  },
  actions: {
    // 显示与隐藏侧边栏
    ToggleSideBar ({commit}) {
      commit('TOGGLE_SIDEBAR')
    },
    // 初始化布局
    LayoutInit ({commit}, value) {
      commit('SET_LAYOUT_INIT', value)
    },
    // 侧边栏功能模块
    SidebarModule ({commit}, value) {
      commit('SET_SIDEBAR_MODULE', value)
    },
    // ImageBgDelay ({commit}, value) {
    //   commit('SET_IMAGE_BG_DELAY', value)
    // },
    // 当前拖拽的功能模块ID
    DragId ({commit}, id) {
      commit('SET_DRAG_ID', id)
    },
    // 拖拽模块要移入的目标容器ID
    TargetId ({commit}, id) {
      commit('SET_TARGET_ID', id)
    },
    // 清空容器中的功能模块
    ClearFeature ({commit}, id) {
      commit('SET_FEATURE_COMPONENT', id)
    },
    // 已被使用中的容器
    Occupied ({commit}, id) {
      commit('SET_OCCUPIED', id)
    },
    SettingNav ({commit}, value) {
      commit('SET_SETTING_NAV', value)
    },
    // 设置容器背景颜色
    SettingContainerBgColor ({commit}, value) {
      commit('SET_CONTAINER_BG_COLOR', value)
    }
  }
}

export default app