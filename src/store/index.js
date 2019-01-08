import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import app from './modules/app'
import global from './modules/global'
import qrcode from './modules/qrcode'
import barrage from './modules/barrage'
import image from './modules/image'
import text from './modules/text'
import clock from './modules/clock'
import video from './modules/video'
import iframe from './modules/iframe'
import socket from './modules/socket'
import interactive from './modules/interactive'
import rolling from './modules/rolling'
import getters from './getters'

Vue.use(Vuex)
// 创建一个 store
const store = new Vuex.Store({
  // 将 store 分割成模块
  modules: {
    app,
    global,
    qrcode,
    barrage,
    image,
    text,
    clock,
    video,
    iframe,
    socket,
    interactive,
    rolling
  },
  getters,
  // 本地持久化 Storage 存储
  plugins: [createPersistedState({
    key: 'dragwall'
  })]
})

export default store