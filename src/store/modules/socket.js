const socket = {
  state: {
    colors: ['red', 'yellow', 'green', 'purple', 'inactive'],
    messages: [],
    shakes: [],
    newUser: ''
  },
  mutations: {
    // 新消息
    'SOCKET_NEW MESSAGE': (state, messages) => {
      let strlen = function (str) {
        // 标签图片数量
      let imgLen = 0
      let imgArr = str.match(/<img[^>]+src=['"]([^'"]+)['">]+/g)
      if (imgArr) {imgLen = imgArr.length}
      // 删除HTML标签
      let handleStr = str.replace(/<[^>]*>|<\/[^>]*>/gm, '')

        let len = 0
        for (let i = 0; i < handleStr.length; i++) {
          if (handleStr.charCodeAt(i) > 127 || handleStr.charCodeAt(i) === 94) {
            len += 2
          } else {
            ++len
          }
        }
        return len + (imgLen * 3)
      }

      let len = strlen(messages.message.content)

      messages['barrageStyle'] = 'normal'
      messages['type'] = 0
      messages['position'] = 'bottom'
      messages['time'] = len / 2


      state.messages.push(messages)
    },
    // 摇一摇
    'SOCKET_NEW SHAKE': (state, messages) => {
      let msg = messages.message
      let dataArr = state.shakes
      let index = null
      // 数组中是否已存在该条记录
      for (let i = 0; i < dataArr.length; i++) {
        if (dataArr[i].openid === msg.user.openid) {
          index = i
          break
        }
      }

      if (index === null) {
        msg.user['count'] = 0
        // 随机分配颜色
        let random = 0 + Math.floor(Math.random() * (state.colors.length - 0 + 1))
        msg.user['color'] = state.colors[random]
        dataArr.push(msg.user)
        state.shakes = dataArr
        // 新加入用户
        state.newUser = msg.user
      } else if (msg.type === 'shake') {
        // 摇一摇每次加一后重新排序
        ++dataArr[index].count
        // 排序
        state.shakes = dataArr.sort(function (a, b) {
          let val1 = a.count, val2 = b.count
          return val2 - val1
        })
      } 
    },
    // 重置每个用户的摇一摇次数
    RESET_SHAKES_COUNT (state) {
      let shakesArr = state.shakes
      shakesArr.forEach((item, index) => {
        shakesArr[index].count = 0
      })
      state.shakes = shakesArr
    }
  },
  actions: {
    // 重置每个用户的摇一摇次数
    ResetShakesCount ({commit}) {
      commit('RESET_SHAKES_COUNT')
    }
  }
}

export default socket