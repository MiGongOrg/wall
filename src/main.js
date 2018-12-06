import { mapState } from 'vuex'
import Vue from 'vue'
import i18n from './locales'

import utils from './assets/utils.js'
// 注册全局方法，可以这样用：this.$utils.getUrlKey("channel")
Vue.prototype.$utils = utils

import fullscreen from 'vue-fullscreen'

import App from './App'
import router from './router'
import store from './store'

import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'
import regular from '@fortawesome/fontawesome-free-regular'
import brands from '@fortawesome/fontawesome-free-brands'

// socket.io
import VueSocketio from 'vue-socket.io-extended'
import io from 'socket.io-client'

// 动态获取ID并加入房间
const id = utils.getUrlKey('id')
Vue.use(VueSocketio, io(`http://127.0.0.1:4000?roomId=${id}`,{ autoConnect: true }), { store })

import 'normalize.css/normalize.css'

// 按需引入 Element UI 组件
import { Slider, Input, Switch, Upload, Button, Tabs, TabPane, Radio, RadioGroup, ButtonGroup, Tooltip, MessageBox, Message, Select, Option, Notification } from 'element-ui'
import './styles/element-variables.scss'
// 初始化 Size
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }

Vue.use(Slider)
Vue.use(Input)
Vue.use(Switch)
Vue.use(Upload)
Vue.use(Button)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Radio)
Vue.use(Select)
Vue.use(Option)
Vue.use(RadioGroup)
Vue.use(ButtonGroup)
Vue.use(Tooltip)

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message

/* color 选择器 */
import { chrome } from 'vue-color'

/* 阿里 Rem 适配解决方案 */
import 'amfe-flexible'

/* font-awesome */
fontawesome.library.add(solid)
fontawesome.library.add(regular)
fontawesome.library.add(brands)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(fullscreen, {name: 'fs'})

Vue.config.productionTip = false

// 生产环境关闭调试信息
const isDebug_mode = process.env.NODE_ENV !== 'production'
Vue.config.debug = isDebug_mode
Vue.config.devtools = isDebug_mode
Vue.config.productionTip = isDebug_mode

/* eslint-disable no-new */
new Vue({
  i18n,
  router,
  store,
  components: { App },
  template: '<App/>'
}).$mount('#app')
