const barrage = {
  state: {
    loop: true
  },
  mutations: {
    SET_BARRAGE_LOOP (state, value) {
      state.loop = value
    }
  },
  actions: {
    SettingBarrageLoop ({commit}, value) {
      commit('SET_BARRAGE_LOOP', value)
    },
  }
}

export default barrage
