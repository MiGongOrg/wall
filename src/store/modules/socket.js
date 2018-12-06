const socket = {
  state: {
    connected: false,
    messages: []
  },
  mutations: {
    // 新消息
    'SOCKET_NEW MESSAGE': (state, messages) => {
      let strlen = function (str) {
        let len = 0
        for (let i = 0; i < str.length; i++) {
          if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
            len += 2
          } else {
            ++len
          }
        }
        return len
      }

      let len = strlen(messages.message.content)

      messages['barrageStyle'] = 'normal'
      messages['type'] = 0
      messages['position'] = 'bottom'
      messages['time'] = len / 2


      state.messages.push(messages)
    },
  },
  actions: {
    // 新消息
    socket_newMessage ({ commit, dispatch }, message) {
      console.log('socket_newMessage', message)
    }
  }
}

export default socket