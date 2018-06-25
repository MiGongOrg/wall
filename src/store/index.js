import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import qrcode from './modules/qrcode'
import barrage from './modules/barrage'
import image from './modules/image'
import getters from './getters'

Vue.use(Vuex)
// 创建一个 store
const store = new Vuex.Store({
  // 将 store 分割成模块
  modules: {
    app,
    qrcode,
    barrage,
    image
  },
  getters
})

export default store